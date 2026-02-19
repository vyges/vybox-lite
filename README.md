# VyBox Lite Codespaces Template

Welcome to **VyBox Lite** — a browser-accessible development environment for silicon IP and chiplet projects, powered by [Vyges](https://vyges.com).

This template sets up:

- Pre-configured [Vyges IP Template](https://github.com/vyges/vyges-ip-template)
- **VyContext** VSCode extension for AI-assisted development
- Tooling to get started with hardware IP metadata, verification, and packaging

## 🚀 Quick Start

Click here to launch in GitHub Codespaces:

<a href="https://codespaces.new/vyges/vybox-lite?quickstart=1" target="_blank">
  <img src="https://img.shields.io/badge/Launch_in_Codespaces-2--Core-blue?style=for-the-badge&logo=github" alt="Launch in Codespaces - 2-Core"/>
</a>
<a href="https://codespaces.new/vyges/vybox-lite?quickstart=1&machine=STANDARD" target="_blank">
  <img src="https://img.shields.io/badge/Launch_in_Codespaces-4--Core-green?style=for-the-badge&logo=github" alt="Launch in Codespaces - 4-Core"/>
</a>

Once your Codespace is running, you can:

- **Clone an existing repository:**
  ```bash
  git clone <repo_url>
  ```

- **Create a new Silicon IP repository:**
  - Use the <a href="https://github.com/vyges/vyges-ip-template/generate" target="_blank"><img src="https://img.shields.io/badge/Vyges_IP_Template-Orange?style=for-the-badge&logo=github&color=orange" alt="Vyges IP Template"/></a> to create a new repository
  - Clone it into your Codespace
  - Start developing with pre-configured tools and context

Choose your preferred machine size:

## ⚠️ Important Licensing Notice

**Only development content is licensed under Apache-2.0.** 
Environment setup and AI context files are proprietary Vyges components.

**What's Apache-2.0 Licensed:**
- Custom scripts and tools you create
- Documentation you write
- Environment customizations you develop

**What's NOT Apache-2.0 Licensed:**
- DevContainer configuration and Docker setup
- Pre-installed EDA tools and development tools
- VyContext extension and AI context (provided by the extension)
- Environment structure and build processes

**Usage Terms:**
- You can use the environment for development
- You can create and modify content within the environment
- You cannot redistribute the environment configuration
- VyContext extension and AI context are for use only within this Codespaces environment

See [LICENSE_SCOPE.md](LICENSE_SCOPE.md) and [NOTICE](NOTICE) for complete details.

| Option | vCPUs | RAM | Free Tier? | Recommended For |
|--------|-------|-----|------------|-----------------|
| **Free Tier** | 2 | 4 GB | ✅ 60 hours/month (public repos) | Trying VyBox Lite or light workloads |
| **Fast Lane** | 4 | 8 GB | ⚠ Counts double against free hours | Heavier builds, faster performance |

> ℹ Free tier applies per GitHub account for **public repositories** only. After the included free hours, you’ll be billed pay-as-you-go.  
> 📄 See [GitHub Codespaces Pricing](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces) for the latest rates.

## 🛠 What's Inside

- **Pre-configured Dev Container**  
  - VS Code extensions for HDL/SystemVerilog  
  - Preloaded metadata schema
  - Shell tools for RTL builds and linting  
  - Git and GitHub CLI ready to go

- **Vyges Context**  
  - **VyContext** VSCode extension for AI-assisted coding  
  - Works with GitHub Copilot (subscription may be required)
  - Ready-to-run simulation/testbench setup  
  - Examples using `vyges-ip-template` conventions

##  Try AI Immediately

This environment comes pre-configured with:
- `vyges-cli` (when available)
- `llm` CLI access to GitHub Models (e.g., GPT-4.1)
- **Vyges AI Context** with seamless authentication using GitHub credentials
- **VyContext** VSCode extension for intelligent context loading and Vyges conventions

### 🎯 VyContext login

VyContext is already authenticated with your GitHub credentials. In Codespaces, automatic login uses your GitHub identity; manual sign-in (e.g. **Vyges: Login** with Google OAuth) opens a browser tab, but the OAuth callback may not deliver the token back to the IDE, so we recommend relying on the built-in GitHub-based login here.

**Features by Tier**:
- **Free**: Basic RTL context, testbench patterns, limited synthesis
- **Basic**: Full RTL/testbench context, DFT/JTAG patterns, pin/pad consistency
- **Pro**: Advanced synthesis, formal verification, analog/mixed-signal context
- **Max**: Security context, catalog integration, custom context generation

**Manual options**: Command Palette → **Vyges: Login** · [profile.services.vyges.com](https://profile.services.vyges.com) · `seamless-auth status`

Try it:

```bash
# Ask AI with Vyges context (automatically loaded after authentication)
llm "Generate a Verilog module for an AXI4-Lite slave interface"

# Or use Copilot with Vyges context (via VSCode extension)
# Just start typing in any .sv file and Copilot will have Vyges context
```

## 💡 Why Codespaces?

- **Zero install**: Runs in your browser
- **Fast start**: Prebuilt with all dependencies  
- **Portable**: Works on macOS, Windows, Linux, Chromebook


| Feature | Benefit to Vyges Users |
|---------|------------------------|
| LLM CLI via `GITHUB_TOKEN` | Access GitHub Models instantly without needing separate API keys; ensure `GITHUB_TOKEN` is set in Codespaces. |
| VyContext extension | Context-aware AI suggestions — useful for both Copilot and CLI agents |
| No additional credentials | Smooth onboarding — no external API keys needed |
| Parallel access | CLI-based LLM + Copilot inline assistance for rich UX |


## 🖌️ Theme & Branding
- Default theme is **Vyges IDE Dark**.  
- Accent profiles 🔵 **Vyges Blue** and 💖 **Vyges Pink** are included.  
- Switch anytime via `Ctrl/Cmd + Shift + P → Preferences: Switch Settings Profile`.  
- Repo-specific `.vscode/settings.json` may override colors (for example, forcing *Default Dark+*). To get Vyges branding, remove that line or switch profiles manually.

## 💡 Notes
- Works with or without GitHub Copilot
- Custom Vyges branding in Codespaces environment
- Fully browser-based, no local installs

---

## 🔗 Useful Links
- [Vyges Website](https://vyges.com)
- [Vyges IP Template](https://github.com/vyges/vyges-ip-template)
- [GitHub Codespaces Pricing](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces)
- [GitHub Codespaces Quickstart](https://docs.github.com/en/codespaces/quickstart)

---
© 2025 Vyges. All rights reserved.
