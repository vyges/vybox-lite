#!/usr/bin/env node

/**
 * Seamless Authentication for VyBox Lite Codespaces
 * Uses GitHub token from Codespaces to automatically authenticate with Vyges
 */

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
    vygesApiUrl: 'https://auth.services.vyges.com',
    vygesRealm: 'vyges',
    vygesClientId: 'profile-service',
    userDataPath: '/home/vscode/.vyges-user.json',
    tokenPath: '/home/vscode/.vyges-token'
};

/**
 * Main seamless authentication function
 */
async function seamlessAuthentication() {
    try {
        console.log('🔐 Starting seamless Vyges authentication...');
        
        // Check if already authenticated
        const existingToken = await loadExistingToken();
        if (existingToken && await validateToken(existingToken)) {
            console.log('✅ Already authenticated with Vyges');
            await showUserStatus(existingToken);
            return existingToken;
        }

        // Get GitHub token from Codespaces environment
        const githubToken = process.env.GITHUB_TOKEN;
        if (!githubToken) {
            throw new Error('GITHUB_TOKEN not found in Codespaces environment');
        }

        console.log('🔑 Using GitHub token for seamless authentication...');

        // Step 1: Get GitHub user info
        const githubUser = await getGitHubUserInfo(githubToken);
        console.log(`👤 GitHub user: ${githubUser.login} (${githubUser.email})`);

        // Step 2: Authenticate with Vyges using GitHub credentials
        const authResult = await authenticateWithVyges(githubUser, githubToken);
        
        if (authResult.success) {
            await saveToken(authResult.token);
            await saveUserData(authResult.user);
            
            console.log('🎉 Seamlessly authenticated with Vyges!');
            showWelcomeMessage(authResult.user);
            
            return authResult.token;
        } else {
            throw new Error('Authentication failed');
        }

    } catch (error) {
        console.error('❌ Seamless authentication failed:', error.message);
        console.log('💡 You can still use Vyges with limited functionality or authenticate manually');
        return null;
    }
}

/**
 * Get GitHub user information
 */
async function getGitHubUserInfo(token) {
    try {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'VyBox-Lite-Seamless-Auth'
            },
            timeout: 10000
        });

        return {
            id: response.data.id,
            login: response.data.login,
            email: response.data.email,
            name: response.data.name,
            avatar_url: response.data.avatar_url,
            public_repos: response.data.public_repos,
            followers: response.data.followers,
            plan: response.data.plan?.name || 'free'
        };
    } catch (error) {
        throw new Error(`GitHub API error: ${error.message}`);
    }
}

/**
 * Authenticate with Vyges using GitHub credentials
 */
async function authenticateWithVyges(githubUser, githubToken) {
    try {
        // Try to authenticate using GitHub credentials
        const response = await axios.post(`${CONFIG.vygesApiUrl}/realms/${CONFIG.vygesRealm}/protocol/openid-connect/token`, 
            new URLSearchParams({
                'grant_type': 'urn:ietf:params:oauth:grant-type:github-token',
                'client_id': CONFIG.vygesClientId,
                'github_token': githubToken,
                'scope': 'openid profile email subscription_plan'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                timeout: 15000
            }
        );

        if (response.data.access_token) {
            // Get user info from Vyges
            const userInfo = await getUserInfoFromVyges(response.data.access_token);
            
            return {
                success: true,
                token: response.data.access_token,
                user: {
                    ...userInfo,
                    github_user: githubUser,
                    is_seamless_auth: true
                }
            };
        } else {
            throw new Error('No access token received');
        }

    } catch (error) {
        if (error.response?.status === 401) {
            // User not found - try to register automatically
            console.log('👤 User not found, attempting automatic registration...');
            return await registerUserWithVyges(githubUser, githubToken);
        } else {
            throw new Error(`Vyges authentication error: ${error.message}`);
        }
    }
}

/**
 * Register new user with Vyges using GitHub credentials
 */
async function registerUserWithVyges(githubUser, githubToken) {
    try {
        // Register user with Vyges
        const registerResponse = await axios.post(`${CONFIG.vygesApiUrl}/realms/${CONFIG.vygesRealm}/protocol/openid-connect/registrations`, {
            github_user: githubUser,
            github_token: githubToken,
            auto_register: true,
            client_id: CONFIG.vygesClientId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            timeout: 15000
        });

        if (registerResponse.data.access_token) {
            const userInfo = await getUserInfoFromVyges(registerResponse.data.access_token);
            
            return {
                success: true,
                token: registerResponse.data.access_token,
                user: {
                    ...userInfo,
                    github_user: githubUser,
                    is_new_user: true,
                    is_seamless_auth: true
                }
            };
        } else {
            throw new Error('Registration failed');
        }

    } catch (error) {
        // If registration fails, create a local account with free tier
        console.log('📝 Registration failed, creating local account...');
        return await createLocalAccount(githubUser);
    }
}

/**
 * Create local account when registration fails
 */
async function createLocalAccount(githubUser) {
    const now = new Date().toISOString();
    const subscriptionTier = determineDefaultTier(githubUser);
    
    const localUser = {
        id: `local_${githubUser.id}`,
        github_id: githubUser.id,
        github_username: githubUser.login,
        email: githubUser.email,
        name: githubUser.name,
        subscription_tier: subscriptionTier,
        created_via: 'codespaces_seamless',
        created_at: now,
        is_local_account: true,
        features: getTierFeatures(subscriptionTier),
        limits: getTierLimits(subscriptionTier)
    };

    // Generate a local JWT token
    const localToken = generateLocalJWT(localUser);

    return {
        success: true,
        token: localToken,
        user: {
            ...localUser,
            github_user: githubUser,
            is_new_user: true,
            is_seamless_auth: true,
            is_local_account: true
        }
    };
}

/**
 * Get user info from Vyges using access token
 */
async function getUserInfoFromVyges(accessToken) {
    try {
        const response = await axios.get(`${CONFIG.vygesApiUrl}/realms/${CONFIG.vygesRealm}/protocol/openid-connect/userinfo`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            },
            timeout: 10000
        });

        return {
            id: response.data.sub,
            email: response.data.email,
            name: response.data.name,
            subscription_tier: response.data.subscription_plan || 'free',
            features: getTierFeatures(response.data.subscription_plan || 'free'),
            limits: getTierLimits(response.data.subscription_plan || 'free')
        };
    } catch (error) {
        throw new Error(`Failed to get user info: ${error.message}`);
    }
}

/**
 * Validate existing token
 */
async function validateToken(token) {
    try {
        const response = await axios.get(`${CONFIG.vygesApiUrl}/realms/${CONFIG.vygesRealm}/protocol/openid-connect/userinfo`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            timeout: 5000
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

/**
 * Show user status
 */
async function showUserStatus(token) {
    try {
        const userInfo = await getUserInfoFromVyges(token);
        console.log(`👤 Authenticated as: ${userInfo.email || userInfo.name}`);
        console.log(`📊 Subscription tier: ${userInfo.subscription_tier}`);
        console.log(`🎯 Available features: ${userInfo.features.length} features`);
        return userInfo;
    } catch (error) {
        console.log('⚠️  Could not fetch user status');
        return null;
    }
}

/**
 * Show welcome message for new users
 */
function showWelcomeMessage(user) {
    console.log('\n' + '='.repeat(50));
    console.log('🎉 Welcome to Vyges!');
    console.log('='.repeat(50));
    console.log(`👤 Account: ${user.github_user?.login || user.github_username}`);
    console.log(`📧 Email: ${user.email || 'Not provided'}`);
    console.log(`🎯 Tier: ${user.subscription_tier.toUpperCase()}`);
    console.log(`✨ Features: ${user.features.length} available`);
    
    if (user.is_new_user) {
        console.log('\n🆕 Your account was automatically created using your GitHub identity.');
        console.log('🚀 You can now use Vyges AI context for hardware IP development!');
        
        if (user.is_local_account) {
            console.log('\n💡 Local account created - upgrade to full Vyges account for cloud sync:');
            console.log('   Visit: https://profile.services.vyges.com');
        } else if (user.subscription_tier === 'free') {
            console.log('\n💡 Upgrade your subscription to unlock more features:');
            console.log('   Visit: https://profile.services.vyges.com');
        }
    }
    
    console.log('\n🔧 Available commands:');
    console.log('   • Ask AI: "Generate a Verilog module for UART controller"');
    console.log('   • Check status: seamless-auth status');
    console.log('   • Get help: seamless-auth help');
    console.log('='.repeat(50) + '\n');
}

/**
 * Utility functions
 */
function determineDefaultTier(githubUser) {
    if (githubUser.plan === 'pro' || githubUser.plan === 'enterprise') {
        return 'basic'; // Upgrade GitHub Pro users to Basic tier
    }
    if (githubUser.public_repos > 50 || githubUser.followers > 100) {
        return 'basic';
    }
    return 'free';
}

function getTierFeatures(tier) {
    const features = {
        free: ['basic_rtl_context', 'basic_testbench_context', 'limited_synthesis_context'],
        basic: ['full_rtl_context', 'full_testbench_context', 'synthesis_context', 'dft_jtag_context'],
        pro: ['all_basic_features', 'advanced_synthesis_context', 'formal_verification_context'],
        max: ['all_pro_features', 'security_context', 'catalog_integration', 'custom_context_generation']
    };
    return features[tier] || features.free;
}

function getTierLimits(tier) {
    const limits = {
        free: { max_projects: 3, max_context_size: '1MB', max_daily_requests: 100 },
        basic: { max_projects: 10, max_context_size: '5MB', max_daily_requests: 1000 },
        pro: { max_projects: 50, max_context_size: '20MB', max_daily_requests: 5000 },
        max: { max_projects: -1, max_context_size: '100MB', max_daily_requests: -1 }
    };
    return limits[tier] || limits.free;
}

function generateLocalJWT(user) {
    // Simple local JWT for local accounts
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({
        sub: user.id,
        email: user.email,
        subscription_plan: user.subscription_tier,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    })).toString('base64url');
    
    return `${header}.${payload}.local`;
}

async function loadExistingToken() {
    try {
        const token = await fs.readFile(CONFIG.tokenPath, 'utf8');
        return token.trim();
    } catch (error) {
        return null;
    }
}

async function saveToken(token) {
    try {
        await fs.writeFile(CONFIG.tokenPath, token, { mode: 0o600 });
    } catch (error) {
        console.error('Failed to save token:', error.message);
    }
}

async function saveUserData(userData) {
    try {
        await fs.writeFile(CONFIG.userDataPath, JSON.stringify(userData, null, 2));
    } catch (error) {
        console.error('Failed to save user data:', error.message);
    }
}

// CLI interface
async function main() {
    const command = process.argv[2];
    
    switch (command) {
        case 'authenticate':
        case 'auth':
            await seamlessAuthentication();
            break;
            
        case 'status':
            const token = await loadExistingToken();
            if (token) {
                await showUserStatus(token);
            } else {
                console.log('❌ Not authenticated. Run: seamless-auth authenticate');
            }
            break;
            
        case 'help':
            showHelp();
            break;
            
        default:
            // Default behavior: authenticate
            await seamlessAuthentication();
            break;
    }
}

function showHelp() {
    console.log('Vyges Seamless Authentication for Codespaces');
    console.log('');
    console.log('Usage: seamless-auth [command]');
    console.log('');
    console.log('Commands:');
    console.log('  authenticate, auth  Authenticate seamlessly using GitHub token');
    console.log('  status              Show current authentication status');
    console.log('  help                Show this help message');
    console.log('');
    console.log('Environment Variables:');
    console.log('  GITHUB_TOKEN        GitHub personal access token (auto-provided in Codespaces)');
    console.log('');
    console.log('Examples:');
    console.log('  seamless-auth                    # Authenticate (default)');
    console.log('  seamless-auth status             # Check status');
    console.log('');
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    seamlessAuthentication,
    showUserStatus,
    loadExistingToken
};
