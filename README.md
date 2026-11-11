# 于佳林 · 产品设计作品集（2026）

纯静态站点，无构建。入口 `index.html`。

## 本地查看
双击 `index.html`，或在目录里执行 `python -m http.server 8899` 后访问 http://127.0.0.1:8899/

## 部署到 GitHub Pages
1. 在 GitHub 新建仓库，名称 **portfolio**，选 **Public**，**不要**勾选 Add README / .gitignore / license
2. 本目录执行：
   ```
   git remote add origin https://github.com/你的用户名/portfolio.git
   git push -u origin main
   ```
3. 仓库 Settings → Pages → Source 选 **Deploy from a branch** → Branch 选 **main** / **/(root)** → Save
4. 等 1–2 分钟，访问 https://你的用户名.github.io/portfolio/

## 目录
- `index.html` 主站
- `print.html` 打印版（生成 PDF 用）
- `assets/css/style.css`
- `assets/js/data.js` 作品内容（改这里就改内容）
- `assets/js/app.js` 交互
- `assets/img/` 61 张 WebP
- `assets/video/` 两段视频
- `assets/docs/portfolio.pdf` 15 页作品集
- `交付说明.md` 完整交付文档
