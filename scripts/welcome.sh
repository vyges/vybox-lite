#!/usr/bin/env bash

# Start virtual display for GUI applications
if ! pgrep -x "Xvfb" > /dev/null; then
    echo "🖥️  Starting virtual display..."
    Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
    sleep 2
fi

echo "Codespace: $CODESPACE_NAME"
echo "⚠️  Reminder: Running this Codespace may incur charges."
echo "2-core: $0.18/hr | 4-core: $0.36/hr | 8-core: $0.72/hr"
echo "Check latest: https://github.com/pricing"
echo "This is now running on machine type: $CODESPACES_MACHINE_TYPE"

cat /etc/motd
#echo "📦 Vyges CLI version: $(vyges --version)"
echo "🛠  Yosys version: $(yosys -V)"
echo "🛠  Verilator version: $(verilator --version)"
echo "🛠  Icarus Verilog version: $(iverilog -v)"
echo "🛠  GTKWave version: $(gtkwave -V 2>/dev/null || echo "GUI mode - use 'gtkwave --help' for options')"
echo "🛠  Python version: $(python --version)"
echo "🛠  Cocotb version: $(cocotb-config --version)"

if command -v llm &> /dev/null; then
    echo "🧠 Installed LLM models:"
    llm models list --options
fi
