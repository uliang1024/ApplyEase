const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const PORT = 3000;

// 設定 Nunjucks 模板引擎
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');

// setting static files
app.use(express.static('public'))

// 路由設定
app.get('/', (req, res) => {
  res.render('index', { title: 'My Website' }); // 將 index.njk 渲染成 HTML，並回傳給客戶端
});

// 啟動 server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
