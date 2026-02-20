#!/usr/bin/env node

/**
 * Configure GitHub Copilot Chat to use GitHub Models (same as terminal `llm`).
 * Runs at Codespace start; uses GITHUB_TOKEN so entry-level users get the same
 * model in Copilot Chat and inline chat without manual setup.
 */

const fs = require('fs').promises;
const path = require('path');
const os = require('os');

const GITHUB_MODELS_BASE = 'https://models.github.ai/inference';
const DEFAULT_MODEL_ID = 'openai/gpt-4.1';

// Paths where VS Code / Codespaces may store User settings (remote or local)
const SETTINGS_PATHS = [
  path.join(os.homedir(), '.vscode-server', 'data', 'User', 'settings.json'),
  path.join(os.homedir(), '.vscode-server-data', 'data', 'User', 'settings.json'),
  path.join(os.homedir(), '.config', 'Code', 'User', 'settings.json'),
];

const COPILOT_SETTINGS = {
  'github.copilot.chat.customOAIModels': [
    {
      baseUrl: GITHUB_MODELS_BASE,
      apiKey: process.env.GITHUB_TOKEN || '',
      models: [{ id: DEFAULT_MODEL_ID, name: 'GPT-4.1 (GitHub Models)' }],
    },
  ],
  'inlineChat.defaultModel': DEFAULT_MODEL_ID,
};

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
  }
}

async function loadSettings(settingsPath) {
  try {
    const raw = await fs.readFile(settingsPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === 'ENOENT') return {};
    throw e;
  }
}

async function tryConfigure() {
  const token = process.env.GITHUB_TOKEN;
  if (!token || token.length < 10) {
    console.log('  [Copilot GitHub Models] GITHUB_TOKEN not set; skipping Copilot config.');
    return;
  }

  for (const settingsPath of SETTINGS_PATHS) {
    try {
      const dir = path.dirname(settingsPath);
      await ensureDir(dir);
      const settings = await loadSettings(settingsPath);
      let changed = false;
      for (const [key, value] of Object.entries(COPILOT_SETTINGS)) {
        if (key === 'github.copilot.chat.customOAIModels' && Array.isArray(value) && value[0]) {
          value[0].apiKey = token;
        }
        if (JSON.stringify(settings[key]) !== JSON.stringify(value)) {
          settings[key] = value;
          changed = true;
        }
      }
      if (changed) {
        await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
        console.log('  [Copilot GitHub Models] Updated:', settingsPath);
      }
      return;
    } catch (e) {
      if (e.code !== 'ENOENT') {
        console.warn('  [Copilot GitHub Models] Skip', settingsPath, e.message);
      }
    }
  }
  console.log('  [Copilot GitHub Models] No settings file written (paths not ready). Run again after opening the Chat view once.');
}

tryConfigure().catch((e) => {
  console.warn('  [Copilot GitHub Models]', e.message);
});
