# Using the Same LLM (GitHub Models) in Copilot Chat

**In Codespaces:** VyBox Lite auto-configures GitHub Copilot Chat and inline chat to use the **same** model as the terminal (GitHub Models / GPT-4.1) when the container starts. No extra setup: open Copilot Chat and the model picker will include **GPT-4.1 (GitHub Models)**; inline chat defaults to it. If you don’t see it, run `node scripts/configure-copilot-github-models.js` once after opening the Chat view.

---

In VyBox Lite, the **terminal** uses the `llm` CLI with the **llm-github-models** plugin, so commands like:

```bash
llm "Generate a Verilog module for an AXI4-Lite slave interface"
```

use **GitHub Models** (e.g. `github/gpt-4.1`) with your Codespaces `GITHUB_TOKEN`—no extra API keys.

This page describes how you can use the **same** backend (GitHub Models) from the **Copilot Chat** window in VS Code.

---

## Terminal vs Copilot Chat

| Entry point       | Backend / auth              | Same models? |
|------------------|-----------------------------|--------------|
| **Terminal**     | `llm` + `llm-github-models` + `GITHUB_TOKEN` → GitHub Models API | ✅ |
| **Copilot Chat** | GitHub Copilot (subscription); model picker may include GitHub-hosted models | Depends on plan and model list |

Copilot Chat and the `llm` CLI are different products. To use the **same** models (GitHub Models) in chat, use one of the options below.

---

## Option 1: Pick a matching model in Copilot Chat (simplest)

If you have a Copilot plan (Free, Pro, etc.):

1. Open **Copilot Chat** (icon in the title bar or sidebar).
2. At the bottom of the chat input, open the **model dropdown** (e.g. “Current model”).
3. Choose a model that matches what you use in the terminal (e.g. **GPT-4.1** or the same model name you get from `llm models list`).

When the same model name is available in both places, you are effectively using the same or equivalent model in the chat window. Model availability depends on your [Copilot plan](https://docs.github.com/en/copilot/using-github-copilot/ai-models/supported-ai-models-in-copilot).

---

## Option 2: Add GitHub Models as a custom model (VS Code Insiders)

GitHub Models exposes an **OpenAI-compatible** API. In **VS Code Insiders**, you can add it as a custom model so Copilot Chat uses the same backend as the terminal.

1. **Base URL:** `https://models.github.ai/inference`  
   (The client will call `/chat/completions` on this base.)
2. **API key:** Your `GITHUB_TOKEN` (in Codespaces this is set automatically) or a [PAT with `models` scope](https://docs.github.com/en/github-models/quickstart).

**Steps:**

1. Use [VS Code Insiders](https://code.visualstudio.com/insiders/) (required for custom OpenAI-compatible models as of current docs).
2. Open **Copilot Chat** → click the **model dropdown** at the bottom → **Manage Models** (or run **Chat: Manage Language Models** from the Command Palette).
3. **Add Models** → choose the option for **OpenAI-compatible** or **custom** endpoint.
4. Set:
   - **Endpoint / base URL:** `https://models.github.ai/inference`
   - **API key:** `$env:GITHUB_TOKEN` (PowerShell) or the value of `GITHUB_TOKEN` from your environment (in Codespaces, use the token from the environment or Secrets).
5. Select the model ID (e.g. `openai/gpt-4.1` as in the [GitHub Models catalog](https://github.com/marketplace/models)).

After that, you can select this provider/model in the Copilot Chat model picker to use the same GitHub Models backend as the terminal.

**Note:** The exact UI and setting name may be under `github.copilot.chat.customOAIModels` or “Add model from provider” in the Language Models editor. If the UI changes, the key idea is: **OpenAI-compatible base URL** + **GITHUB_TOKEN** (or PAT with `models` scope).

---

## Option 3: Use the terminal from chat (workaround)

To use the **exact** same process as the terminal from within the chat flow:

1. In Copilot Chat, ask it to run a command, for example:
   - *“Run in the terminal: `llm 'Your question here'`”*
2. Or open the integrated terminal and run:
   ```bash
   source ~/vyges-venv/bin/activate   # if not already active
   llm "Your question here"
   ```
3. Copy the reply back into the chat if you want to continue the conversation there.

This uses the same `llm` + GitHub Models stack as your normal terminal usage.

---

## Summary

| Goal                         | Approach |
|-----------------------------|----------|
| Same model, chat UI         | Option 1: Pick matching model in Copilot Chat dropdown. |
| Same API (GitHub Models) in chat | Option 2: Add custom OpenAI-compatible model in VS Code Insiders with `https://models.github.ai/inference` + GITHUB_TOKEN. |
| Same CLI/backend, no setup  | Option 3: Run `llm "..."` in the terminal or ask Copilot to run it. |

**Auto-config (Codespaces):** The devcontainer runs `scripts/configure-copilot-github-models.js` on start. It writes `github.copilot.chat.customOAIModels` and `inlineChat.defaultModel` into your VS Code User settings using `GITHUB_TOKEN`, so terminal and Copilot stay in sync by default.

For more on the terminal setup, see the [README](../README.md) (“Try AI Immediately”) and [scripts/welcome.sh](../scripts/welcome.sh).
