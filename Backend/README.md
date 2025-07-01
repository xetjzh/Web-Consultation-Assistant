# 🏥 Web Consultation Assistant

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0-brightgreen)](https://nodejs.org/)
[![MySQL Version](https://img.shields.io/badge/mysql-%3E%3D8.0-blue)](https://mysql.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

一个完整的医疗问诊助手全栈系统，实现了前端表单与后端数据库的无缝集成，支持统一导航和双重数据保存。

## ✨ 核心特性

- 🏥 **患者管理** - 完整的患者基本信息管理
- 📋 **问诊记录** - 现病史、系统回顾、体格检查记录
- 🔍 **数据查询** - 患者信息搜索和检索
- 🌐 **RESTful API** - 标准化的API接口设计
- 💾 **双重存储** - 本地localStorage + 云端MySQL数据库
- 🧭 **统一导航** - 所有页面配备响应式导航栏
- ☁️ **云端部署** - 支持容器化云服务器部署
- 🔐 **安全防护** - SQL注入防护、参数验证、错误处理

## 🚀 快速开始

### 📋 环境要求

- Node.js 16.0+
- MySQL 8.0+
- npm 6.0+ 或 yarn 1.0+

### ⚡ 一键启动

```bash
# 1. 克隆项目
git clone https://github.com/your-username/web-consultation-assistant.git
cd web-consultation-assistant/Backend

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，配置数据库连接信息

# 4. 初始化数据库
mysql -u root -p < database/init.sql

# 5. 启动服务器
npm run dev
```

### 📱 访问应用

| 页面 | 地址 | 功能描述 |
|------|------|----------|
| **主页导航** | <http://localhost:3001> | 系统总览和快速导航 |
| **问诊表单** | <http://localhost:3001/web> | 专业问诊记录系统 |
| **API演示** | <http://localhost:3001/demo> | 完整的API测试界面 |
| **系统测试** | <http://localhost:3001/test> | 功能验证页面 |

## 🛠 技术架构

### 后端技术栈
- **运行环境**: Node.js 20+
- **Web框架**: Express.js
- **数据库**: MySQL 8.0+
- **连接池**: mysql2/promise
- **中间件**: CORS, Body-parser, dotenv
- **开发工具**: nodemon

### 前端技术栈
- **标准技术**: HTML5 + CSS3 + JavaScript ES6
- **设计风格**: 响应式医疗主题UI
- **数据交互**: 原生 Fetch API
- **本地存储**: localStorage
- **导航系统**: 统一响应式导航栏

## � API 文档

### 基础信息
- **Base URL**: `http://localhost:3001/api`
- **Content-Type**: `application/json`
- **响应格式**: JSON

### 核心接口

#### 🔍 健康检查
```http
GET /api/health
```
**响应示例**:
```json
{
  "status": "OK",
  "message": "服务器运行正常",
  "timestamp": "2025-07-01T15:28:34.926Z"
}
```

#### 👤 患者管理

**创建患者**
```http
POST /api/patients
Content-Type: application/json

{
  "name": "张三",
  "age": 35,
  "gender": "男",
  "phone": "13800138001",
  "chiefComplaint": "头痛3天"
}
```

**获取患者列表**
```http
GET /api/patients?page=1&limit=20
```

**搜索患者**
```http
GET /api/patients/search?q=张三
```

#### 📋 医疗记录

**保存现病史**
```http
POST /api/patients/:id/current-illness
```

**保存系统回顾**
```http
POST /api/patients/:id/system-review
```

## 🗃 数据库结构

```sql
-- 主要数据表
patients              -- 患者基本信息
current_illness      -- 现病史
past_history         -- 既往史
system_review        -- 系统回顾
physical_examination -- 体格检查
diagnosis           -- 诊断
treatment_plan      -- 治疗方案
```

## 🔧 环境配置

### 环境变量 (.env)
```env
# 数据库配置
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=medical_consultation
DB_PORT=3306

# 服务器配置
PORT=3001
NODE_ENV=development
```

### MySQL 数据库设置
```bash
# 1. 创建数据库
mysql -u root -p -e "CREATE DATABASE medical_consultation;"

# 2. 导入表结构
mysql -u root -p medical_consultation < database/init.sql
```

## 🚀 部署指南

### Docker 部署 (推荐)
```bash
# 构建并运行
docker build -t web-consultation-assistant .
docker run -d -p 3001:3001 --name medical-api web-consultation-assistant
```

### PM2 部署
```bash
# 安装PM2并启动
npm install -g pm2
pm2 start server.js --name "medical-api"
pm2 startup && pm2 save
```

## 📂 项目结构

```
Backend/
├── server.js              # 主服务器入口
├── package.json           # 项目配置
├── .env                   # 环境变量
├── database/init.sql      # 数据库初始化
├── routes/api.js          # API路由
├── models/Patient.js      # 数据模型
├── utils/database.js      # 数据库工具
└── public/                # 静态文件
    ├── home.html         # 主页
    ├── web.html          # 问诊表单
    ├── index.html        # API演示
    └── test.html         # 功能测试
```

## 🔐 安全特性

- ✅ **SQL注入防护** - 参数化查询
- ✅ **CORS配置** - 跨域安全控制
- ✅ **输入验证** - 数据格式校验
- ✅ **错误处理** - 避免信息泄露

## 🚨 故障排除

### 常见问题

**数据库连接失败**
```bash
# 检查MySQL服务
sudo systemctl status mysql
# 测试连接
mysql -u root -p -e "SELECT 1;"
```

**端口被占用**
```bash
# 查找进程
netstat -tulpn | grep :3001
# 终止进程
kill -9 <PID>
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 💬 支持与联系

- � Bug报告: [GitHub Issues](https://github.com/your-username/web-consultation-assistant/issues)
- � 功能建议: [GitHub Discussions](https://github.com/your-username/web-consultation-assistant/discussions)

---

**⚠️ 免责声明**: 本系统仅供学习和演示使用，实际医疗应用需要符合相关法规和医疗标准。
