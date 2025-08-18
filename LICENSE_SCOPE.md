# License Scope and Usage Guidelines

## Overview

The `vybox-lite` repository uses the Apache License, Version 2.0 for licensing. This repository provides a GitHub Codespaces development environment for Vyges IP development.

**Important:** All non-Apache-2.0 components are provided under a limited-use, non-commercial license solely for use within this repository's GitHub Codespaces environment.

## What the Apache-2.0 License Covers

The Apache-2.0 license applies to **development environment content** that you create using this Codespace:

### ✅ Licensed Content
- **Development Scripts**: Custom scripts and automation tools you create
- **Configuration Files**: Environment configurations you customize
- **Documentation**: Development guides and documentation you write
- **Integration Examples**: Example integration code and usage demonstrations
- **Custom Tools**: Tools and utilities you develop within this environment

### Example Licensed Files
```
scripts/
├── your_custom_script.sh      # ✅ Licensed (your custom script)
└── your_automation.py         # ✅ Licensed (your automation)

docs/
├── your_dev_guide.md          # ✅ Licensed (your documentation)
└── your_workflow.md           # ✅ Licensed (your documentation)

custom/
├── your_tool.py               # ✅ Licensed (your custom tool)
└── your_config.json           # ✅ Licensed (your configuration)
```

## What the Apache-2.0 License Does NOT Cover

The development environment structure, build processes, and tooling are provided as-is:

### ❌ Not Licensed Under Apache-2.0
- **Environment Structure**: DevContainer configuration and directory organization
- **Build Processes**: Dockerfile, build scripts, container setup
- **Tool Integration**: Pre-installed EDA tools and development tools
- **Environment Metadata**: DevContainer JSON files and configuration
- **Vyges Tools**: The Vyges CLI and related development tools
- **Documentation Templates**: Template documentation structure and examples
- **AI Context and Processing Engine**:
  - `.vyges-ai-context.json` - AI development context and prompts
  - `.copilot-chat-context.md` - GitHub Copilot integration context
  - AI-generated code patterns and development workflows
  - AI prompt engineering and context management systems
  - AI-assisted development methodologies and best practices

### Example Non-Licensed Files
```
.devcontainer/                 # ❌ Environment configuration
Dockerfile                     # ❌ Container build process
scripts/welcome.sh             # ❌ Environment setup script
vyges-metadata.schema.json     # ❌ Vyges metadata schema
README.md                      # ❌ Environment documentation
.vyges-ai-context.json        # ❌ AI context and prompts
.copilot-chat-context.md      # ❌ GitHub Copilot integration
```

## Development Environment Components and Licensing

### Development Environment Structure

The `vybox-lite` includes development environment components that are **not licensed under Apache-2.0**:

#### Environment Configuration
- **`.devcontainer/`**: DevContainer configuration for GitHub Codespaces
- **`Dockerfile`**: Container build and setup process
- **`scripts/welcome.sh`**: Environment initialization and welcome script

#### Pre-installed Tools
- **EDA Tools**: Yosys, Verilator, Icarus Verilog, GTKWave
- **Development Tools**: Python, Cocotb, LLM CLI
- **Build Tools**: Make, GCC, build-essential

### Environment Component Usage

**✅ What You Can Do:**
- Use the development environment for your IP development
- Customize the environment for your specific needs
- Create and modify scripts and tools within the environment
- Use the pre-installed EDA tools for your projects
- Leverage the AI context and development workflows

**❌ What You Cannot Do:**
- Redistribute the environment configuration under Apache-2.0
- Modify and distribute the container setup process
- Extract and reuse the environment configuration commercially
- Include environment files in derivative works without permission

### Environment Component Attribution

When using the development environment:
- The environment is provided as-is for enhanced development experience
- Pre-installed tools are available for your use
- Environment configuration remains proprietary Vyges components
- Your development content remains your own and can be licensed as you choose

## Proprietary Components and Usage Rights

### AI Context and Processing Engine

The following components are **proprietary Vyges components** provided under a **limited-use, non-commercial license**:

#### AI Context Files
- **`.vyges-ai-context.json`**: AI development context and prompts
- **`.copilot-chat-context.md`**: GitHub Copilot integration context

#### Usage Rights for Proprietary Components

**✅ What You CAN Do:**
- Use these files within this Codespaces environment
- Leverage the AI context for your development work
- Reference AI-generated patterns and conventions
- Use the AI context with compatible AI tools (Cursor, Copilot, etc.)

**❌ What You CANNOT Do:**
- Redistribute these files under Apache-2.0 or any other license
- Modify and distribute the AI context files
- Extract and reuse AI prompts and context patterns commercially
- Include these files in derivative works or forked repositories
- Use these files outside of this Codespaces environment

**📋 Licensing Terms:**
- **License Type**: Limited-use, non-commercial
- **Scope**: Use only within this repository's GitHub Codespaces environment
- **Redistribution**: Not permitted
- **Commercial Use**: Not permitted
- **Modification**: Not permitted for redistribution

### Environment Configuration Files

The following environment components are also **proprietary Vyges components**:

- **`.devcontainer/`**: DevContainer configuration
- **`Dockerfile`**: Container build process
- **`scripts/welcome.sh`**: Environment initialization

**Usage Rights:**
- Use within this Codespaces environment
- Cannot redistribute or modify for distribution
- Cannot include in derivative works

## Practical Implications

### For Developers
- You can freely license your development content under Apache-2.0
- You can modify and distribute your scripts, tools, and documentation
- You can use your development work in commercial products
- You can create derivative works of your development content

### For Environment Users
- The environment provides a framework for IP development
- You can use the environment structure to organize your work
- The build processes and tooling are provided as-is
- You're not required to license the environment structure itself

### For Commercial Use
- Your development content can be used commercially under Apache-2.0
- You can sell products incorporating your development work
- You can license your development tools to others
- You must include the Apache-2.0 license text and attribution

## Attribution Requirements

When using Apache-2.0 licensed content, you must:

1. **Include the License**: Copy the Apache-2.0 license text
2. **State Changes**: Note any modifications you made
3. **Preserve Notices**: Keep copyright and license notices
4. **Include NOTICE**: Include the NOTICE file if present

## Example Attribution

```bash
#!/usr/bin/env bash
# Copyright (c) 2025 Your Name
# Licensed under the Apache License, Version 2.0
# See LICENSE file for details

# Your custom development script
```

## Questions and Clarifications

If you have questions about licensing scope:

1. **Development Content**: Generally covered by Apache-2.0
2. **Environment Structure**: Generally not covered by Apache-2.0
3. **Build Processes**: Generally not covered by Apache-2.0
4. **Tool Integration**: Generally not covered by Apache-2.0

When in doubt, focus on whether the content is your **development work** (licensed) versus the **environment framework** (not licensed).

## Forking and Repository Usage

### Can I Fork This Repository?

**✅ Yes, you can fork this repository**, but with important restrictions:

**What You CAN Do:**
- Fork the repository for your own use
- Use the Codespaces environment for development
- Create and modify content within the environment
- Use the AI context and tools for your projects

**What You CANNOT Do:**
- Redistribute the proprietary components (AI context, environment config)
- Use proprietary components outside of this Codespaces environment
- Include proprietary components in derivative works
- Commercialize or redistribute the environment setup

### Repository Usage Guidelines

**For Personal/Educational Use:**
- ✅ Fork and use the environment
- ✅ Leverage AI context for learning
- ✅ Create your own development content
- ✅ Use pre-installed tools and workflows

**For Commercial/Redistribution:**
- ❌ Cannot redistribute proprietary components
- ❌ Cannot commercialize the environment setup
- ❌ Cannot include AI context in commercial products
- ❌ Cannot modify and redistribute environment configuration

**For Open Source Projects:**
- ✅ Can use the environment for development
- ✅ Can create open source content within the environment
- ❌ Cannot include proprietary components in your open source project
- ❌ Cannot redistribute the environment configuration

## Legal Disclaimer

This document provides guidance but is not legal advice. For specific legal questions about licensing, consult with a qualified attorney familiar with open source licensing and development environments.

---

**Note**: This environment is designed to help you create properly licensed development content. The Apache-2.0 license is widely used in the open source community and provides good protection while allowing commercial use.