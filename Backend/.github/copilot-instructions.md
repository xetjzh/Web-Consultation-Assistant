<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Web Consultation Assistant - Copilot 开发指引

## 📋 项目概述
Web Consultation Assistant（网页问诊助手）是一个完整的医疗问诊全栈系统，现已优化为GitHub公开项目。项目包含专业的医疗表单前端和强大的Node.js后端API服务。

## 🛠️ 技术栈
- **后端**: Node.js + Express.js + MySQL2
- **前端**: HTML5 + CSS3 + JavaScript ES6
- **数据库**: MySQL 8.0+
- **部署**: Docker + PM2 + 云端服务器
- **API设计**: RESTful + JSON响应

## 📁 项目结构指引
```
Backend/
├── server.js              # Express服务器主文件
├── package.json           # 项目依赖和脚本
├── .env.example           # 环境配置模板
├── database/init.sql      # 数据库初始化脚本
├── models/Patient.js      # 患者数据模型
├── routes/api.js          # RESTful API路由
├── utils/database.js      # 数据库连接工具
└── public/                # 前端静态文件
    ├── web.html          # 主要问诊表单
    ├── index.html        # 系统主页
    ├── test.html         # 功能测试页面
    ├── home.html         # 导航主页
    ├── css/              # 样式文件
    └── js/               # JavaScript文件
```

## 🔧 代码规范和最佳实践

### 后端开发规范
- 使用 `async/await` 处理所有异步操作
- 采用 RESTful API 设计原则
- 使用参数化查询防止SQL注入
- 统一的JSON响应格式：
  ```javascript
  {
    "success": boolean,
    "message": string,
    "data": object || null,
    "error": string || null
  }
  ```

### 数据库操作规范
- 使用 `mysql2/promise` 进行数据库连接
- 所有SQL查询必须使用参数化语句
- JSON类型字段存储复杂医疗数据结构
- 遵循现有数据库表结构（patients表）

### API接口设计
- 患者管理：`/api/patients` (GET, POST)
- 单个患者：`/api/patients/:id` (GET, PUT, DELETE)
- 患者搜索：`/api/patients/search?q=keyword`
- 健康检查：`/api/health`

### 错误处理标准
- 所有异步操作使用 try-catch 包装
- 返回用户友好的错误消息
- 控制台记录详细错误信息
- HTTP状态码使用标准规范

### 前端集成规范
- 使用 `medical-api.js` 处理API调用
- 实现双重存储（localStorage + 云端数据库）
- 统一的用户反馈消息系统
- 响应式设计适配移动端

## 🚀 部署和环境
- 开发环境：`npm run dev` (nodemon)
- 生产环境：`npm start` (直接启动)
- Docker支持：`docker-compose up -d`
- 环境配置：复制 `.env.example` 为 `.env`

## 🔐 安全注意事项
- 敏感配置信息存储在 `.env` 文件中
- 数据库密码不得硬编码
- 用户输入必须进行验证和清理
- 实施基本的CORS策略

## 文件结构
```
├── server.js           # 主服务器文件
├── models/            # 数据模型
├── routes/            # API路由
├── utils/             # 工具类
├── database/          # 数据库脚本
└── public/            # 静态文件
```

## 开发注意事项
- 所有数据库配置通过环境变量管理
- API接口需要适当的错误处理
- 前端表单需要数据验证
- 支持云端部署和本地开发
