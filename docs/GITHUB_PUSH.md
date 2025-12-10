# 把仓库推到 GitHub & 设置部署 Secrets

1. 在本地初始化 Git 并提交：
```
git init
git add .
git commit -m "Initial commit - Jiuhua Zen Tea"
```
2. 在 GitHub 新建仓库（private 或 public），复制仓库 URL，推送：
```
git remote add origin git@github.com:yourname/jiuhua-zen-tea.git
git branch -M main
git push -u origin main
```
3. 在仓库 Settings -> Secrets 中添加：
- RAILWAY_API_KEY：Railway API Key（用于 GitHub Action 部署）
- ZEABUR_API_KEY：Zeabur API Key（若使用 Zeabur）
- DATABASE_URL、JWT_ACCESS_SECRET、JWT_REFRESH_SECRET、STRIPE_SECRET_KEY、STRIPE_WEBHOOK_SECRET 等

注意：我无法代表您直接推送或设置 secrets，因为需要您的 GitHub 权限。
