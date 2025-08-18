FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

LABEL maintainer="Vyges <support@vyges.com>" \
      description="VyBox Lite: Codespaces development environment" \
      version="0.1.0" \
      vendor="Vyges" \
      edition="Lite - Codespaces" \
      vybox_build_date="2025-08-17"

# Set environment variables early for better caching
ENV DEBIAN_FRONTEND=noninteractive \
    UPDATE_ALTERNATIVES_SKIP_MAN_PAGES=1 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

# Layer 1: System dependencies (rarely changes)
RUN apt-get update && apt-get install -y \
    sudo git curl wget ca-certificates build-essential tree unzip locales \
    make gcc g++ pkg-config python3 python3-pip python3-venv pandoc time \
    verilator iverilog gtkwave yosys \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Layer 2: System configuration (rarely changes)
RUN locale-gen en_US.UTF-8

# Layer 3: Directory structure
RUN mkdir -p /home/vscode/.local/bin /opt/vyges \
 && chown -R vscode:vscode /home/vscode /opt/vyges

# Layer 4: Download Vyges files (as root)
RUN curl -sSL https://raw.githubusercontent.com/vyges/vyges-metadata-spec/main/schema/v1/vyges-metadata.schema.json \
       -o /opt/vyges/vyges-metadata.schema.json \
 && curl -sSL https://raw.githubusercontent.com/vyges/vyges-ip-template/refs/heads/main/.vyges-ai-context.json \
       -o /home/vscode/.vyges-ai-context.json \
 && chown vscode:vscode /home/vscode/.vyges-ai-context.json

# Layer 5: Branding MOTD (as root)
RUN echo '---------------------------------' > /etc/motd \
 && echo '   🟠 Welcome to VyBox Lite!    ' >> /etc/motd \
 && echo '  Powered by Vyges Codespaces  ' >> /etc/motd \
 && echo '---------------------------------' >> /etc/motd

# Switch to vscode user for final setup
USER vscode
WORKDIR /home/vscode

# Layer 6: Git configuration (as vscode user)
RUN git config --global init.defaultBranch main \
 && git config --global user.name "VyBox Developer" \
 && git config --global user.email "vscode@vybox.local"

# Layer 7: Python & LLM environment (as vscode user)
RUN python3 -m venv /home/vscode/vyges-venv \
 && . /home/vscode/vyges-venv/bin/activate \
 && pip3 install --no-cache-dir \
      cocotb pytest pytest-cov black flake8 mypy llm \
 && /home/vscode/vyges-venv/bin/llm install llm-github-models \
 && /home/vscode/vyges-venv/bin/llm models default github/gpt-4.1 \
 && echo 'source ~/vyges-venv/bin/activate' >> /home/vscode/.bashrc \
 && echo 'export PATH="$HOME/vyges-venv/bin:$PATH"' >> /home/vscode/.bashrc

# Default shell
CMD ["/bin/bash"]
