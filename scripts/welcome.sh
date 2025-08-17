#!/usr/bin/env bash

echo "Codespace: $CODESPACE_NAME"
echo "⚠️  Reminder: Running this Codespace may incur charges."
echo "2-core: $0.18/hr | 4-core: $0.36/hr | 8-core: $0.72/hr"
echo "Check latest: https://github.com/pricing"
echo "This is now running on machine type: $CODESPACES_MACHINE_TYPE"


cat /etc/motd
#echo "📦 Vyges CLI version: $(vyges --version)"
echo "🛠  Yosys version: $(yosys -V)"
echo "🛠  Verilator version: $(verilator --version)"
echo "🛠  Icarus Verilog version: $(iverilog --version)"
echo "🛠  GTKWave version: $(gtkwave --version)"
echo "🛠  Python version: $(python --version)"
echo "🛠  Cocotb version: $(cocotb-config --version)"
llm models listif command -v llm &> /dev/null; then
    echo "🧠 Installed LLM models:"
    llm models list --short
fi
