# 安全审计指南

- run_audit.sh: 自动对 apps/* 运行 npm audit（高危级别）
- 建议集成 Snyk 或 Dependabot：在 CI 中加入依赖自动扫描与修复 PR
- 配置 secret scanning、依赖审计阈值并阻止主分支存在高危漏洞
