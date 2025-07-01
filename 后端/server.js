const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const db = require('./utils/database');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // 静态文件服务

// 路由配置
app.use('/api', apiRoutes);

// 专门为问诊表单页面提供路由
app.get('/web', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'web.html'));
});

// 演示页面路由
app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 测试页面路由
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

// 默认首页重定向到导航页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: '服务器内部错误'
    });
});

// 404处理
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: '接口不存在'
    });
});

// 启动服务器
app.listen(PORT, async () => {
    console.log(`🚀 服务器运行在端口 ${PORT}`);
    console.log(`📝 API文档: http://localhost:${PORT}/api/health`);
    await db.testConnection();
});

module.exports = app;
