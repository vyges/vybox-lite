# VyBox Lite Codespaces Template

Welcome to **VyBox Lite** — a browser-accessible development environment for silicon IP and chiplet projects, powered by [Vyges](https://vyges.com).

This template sets up:

- Pre-configured [Vyges IP Template](https://github.com/vyges/vyges-ip-template)
- Built-in `.vyges-ai-context.json` for AI-assisted development
- Tooling to get started with hardware IP metadata, verification, and packaging

## 🚀 Quick Start

Click here to launch in GitHub Codespaces:

[![Launch in Codespaces - 2-Core Free Tier](https://github.com/codespaces/badge.svg)](https://codespaces.new/vyges/vybox-lite?quickstart=1)
[![Launch in Codespaces - 4-Core Fast Lane](https://github.com/codespaces/badge.svg)](https://codespaces.new/vyges/vybox-lite?quickstart=1&machine=STANDARD)

Choose your preferred machine size:

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
  - `.vyges-ai-context.json` for AI-assisted coding  
  - Works with GitHub Copilot (subscription may be required)
  - Ready-to-run simulation/testbench setup  
  - Examples using `vyges-ip-template` conventions

##  Try AI Immediately

This environment comes pre-configured with:
- `vyges-cli` (when available)
- `llm` CLI access to GitHub Models (e.g., GPT-4.1)
- `.vyges-ai-context.json` to guide AI for silicon IP domain

Try it:

```bash
llm "Generate a Verilog module for an AXI4-Lite slave interface"
```

## 💡 Why Codespaces?

- **Zero install**: Runs in your browser
- **Fast start**: Prebuilt with all dependencies  
- **Portable**: Works on macOS, Windows, Linux, Chromebook


| Feature | Benefit to Vyges Users |
|---------|------------------------|
| LLM CLI via `GITHUB_TOKEN` | Access GitHub Models instantly without needing separate API keys; ensure `GITHUB_TOKEN` is set in Codespaces. |
| `vyges-ai-context.json` | Context-aware AI suggestions — useful for both Copilot and CLI agents |
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
