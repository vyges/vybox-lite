#!/usr/bin/env bash

# Start virtual display for GUI applications
if ! pgrep -x "Xvfb" > /dev/null; then
    echo "🖥️  Starting virtual display..."
    Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
    sleep 2
fi

echo "=========================================="
echo "🚀 VyBox Lite Codespace Environment"
echo "=========================================="

echo ""
echo "📋 Codespace Information:"
echo "   Name: $CODESPACE_NAME"
echo "   Repository: $GITHUB_REPOSITORY"
echo "   User: $GITHUB_USER"
echo "   Container Version: $ContainerVersion"

echo ""
echo "⚠️  Cost Reminder:"
echo "   2-core: \$0.18/hr | 4-core: \$0.36/hr | 8-core: \$0.72/hr"
echo "   Check latest: https://github.com/pricing"

echo ""
echo "🎯 Welcome Message:"
cat /etc/motd

echo ""
echo "🛠️  Available Tools:"
echo "   Yosys: $(yosys -V)"
echo "   Verilator: $(verilator --version)"
echo "   Icarus Verilog: $(iverilog -V 2>/dev/null | head -1)"
echo "   GTKWave: $(gtkwave -V 2>/dev/null | head -1 || echo "GUI mode - use 'gtkwave --help' for options")"
echo "   Python: $(python --version)"
echo "   Cocotb: $(cocotb-config --version)"

echo ""
echo "🧠 LLM Models Available:"
if command -v llm &> /dev/null; then
    echo "   Default: $(llm models default 2>/dev/null || echo "Not set")"
    echo "   Models: Available (use 'llm models list' to see all models)"
    echo "   Use: llm -m <model_name> to chat with a specific model"
    
    echo ""
    echo "🔑 API Key Status:"
    echo "   If you have API keys for any of the providers below, you can set them:"
    echo "   • OPENAI_API_KEY - for OpenAI models (GPT-4, GPT-3.5, etc.)"
    echo "   • GITHUB_MODELS_KEY - for GitHub models (free in Codespaces!)"
    echo "   • COHERE_API_KEY - for Cohere models"
    echo "   • AI21_API_KEY - for AI21 models"
    echo "   • DEEPSEEK_API_KEY - for DeepSeek models"
    echo "   • MISTRAL_API_KEY - for Mistral models"
    echo "   • PHI_API_KEY - for Phi models"
    echo "   • GROK_API_KEY - for Grok models"
    echo ""
    echo "💡 Quick Setup:"
    echo "   export OPENAI_API_KEY='your-key'  # Add to ~/.bashrc for persistence"
    echo "   export GITHUB_MODELS_KEY=\$GITHUB_TOKEN  # Use built-in token in Codespaces"
    echo ""
    echo "   # Test a model after setting keys"
    echo "   llm -m github/gpt-4.1 'Hello, how can you help me with RTL design?'"
fi

echo ""
echo "🔐 Vyges Authentication:"
echo "   Installing dependencies and starting seamless authentication..."
cd /workspaces/vybox-lite/scripts && npm install && chmod +x seamless-auth.js && node seamless-auth.js authenticate

echo ""
echo "🎯 Vyges AI Context Setup:"
echo "   • Extension: vyges.VyContext (pre-installed and configured)"
echo "   • Authentication: Seamless using GitHub token from Codespaces"
echo "   • Fallback: Manual authentication via Command Palette or web browser"

echo ""
echo "💡 Authentication Methods:"
echo "   • Automatic: Uses GitHub token (seamless)"
echo "   • Manual: Command Palette → 'Vyges: Login'"
echo "   • Web: Visit https://profile.services.vyges.com"

echo ""
echo "🚀 Try Vyges AI:"
echo "   • Ask the AI: 'Generate a Verilog module for UART controller'"
echo "   • The AI has access to Vyges hardware IP context based on your subscription tier!"
echo "   • Check status: seamless-auth status"

echo ""
echo "📁 Environment Setup:"
echo "   Working Directory: $(pwd)"
echo "   Home Directory: $HOME"
echo "   Python Virtual Env: $VIRTUAL_ENV"
echo "   Vyges Files: /opt/vyges/"
echo "   Display: $DISPLAY"

echo ""
echo "🔧 Quick Start Commands:"
echo "   # Activate Python environment (already active)"
echo "   source ~/vyges-venv/bin/activate"
echo ""
echo "   # Check tool versions"
echo "   yosys -V && verilator --version && iverilog -V"
echo ""
echo "   # Use LLM models (same model as Copilot Chat when auto-configured)"
echo "   llm -m github/gpt-4.1 'Hello, how can you help me with RTL design?'"
echo ""
echo "   # Copilot Chat: same model (GPT-4.1) is set by default in Codespaces"
echo "   # Open the Chat view and select 'GPT-4.1 (GitHub Models)' in the model dropdown if needed"
echo ""

echo ""
echo "🌐 Environment Variables:"
echo "   PATH includes: $VIRTUAL_ENV/bin, ~/.local/bin"
echo "   DISPLAY: $DISPLAY (for GUI tools)"
echo "   LANG: $LANG"
echo "   VIRTUAL_ENV: $VIRTUAL_ENV"

echo ""
echo "=========================================="
echo "🎉 Your VyBox Lite is ready for development!"
echo "=========================================="
