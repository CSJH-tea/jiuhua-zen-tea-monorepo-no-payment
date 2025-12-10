# 测试指南

## 单元 / 集成测试（Jest） - apps/backend-ts
1. 进入 backend-ts：`cd apps/backend-ts`
2. 安装依赖：`npm install`
3. 运行测试：`npm test`

注意：当前示例测试是轻量集成测试，需要数据库可用或会返回 500；为做完整测试建议使用测试数据库或 mock Prisma。

## 端到端测试（Playwright） - apps/frontend
1. 进入 frontend：`cd apps/frontend`
2. 安装依赖：`npm install`
3. 启动前端（并确保后端可用）：`npm run dev`
4. 运行 E2E：`npx playwright test`

在 CI 中我们已加入 workflow 运行 Jest 与 Playwright（`.github/workflows/tests.yml`）。
