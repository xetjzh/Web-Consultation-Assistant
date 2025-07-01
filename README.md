# 🏥 Web Consultation Assistant - 网页问诊助手

> **📁 注意：服务器端代码位于 `Backend` 文件夹中**

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0-brightgreen)](https://nodejs.org/)
[![MySQL Version](https://img.shields.io/badge/mysql-%3E%3D8.0-blue)](https://mysql.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

一个完整的医疗问诊助手全栈系统，实现了前端表单与后端数据库的无缝集成，支持统一导航和双重数据保存。

## 📋 项目概述

Web Consultation Assistant 是一个现代化的医疗问诊系统，旨在为医疗机构提供数字化的患者信息管理和问诊记录功能。系统采用前后端分离架构，结合了用户友好的Web界面和强大的后端数据库支持。

## ✨ 核心特性

- 🏥 **患者管理** - 完整的患者基本信息管理系统
- 📋 **问诊记录** - 现病史、系统回顾、体格检查记录
- 🔍 **数据查询** - 高效的患者信息搜索和检索功能
- 🌐 **RESTful API** - 标准化的API接口设计
- 💾 **双重存储** - 本地localStorage + 云端MySQL数据库
- 🧭 **统一导航** - 所有页面配备响应式导航栏
- ☁️ **云端部署** - 支持容器化云服务器部署
- 🔐 **安全防护** - SQL注入防护、参数验证、错误处理
- 📱 **响应式设计** - 完美适配移动端和桌面端

## 🏗️ 项目结构

```
Web-Consultation-Assistant/
├── Backend/                    # 🚀 服务器端代码
│   ├── server.js              # Express服务器主文件
│   ├── package.json           # 项目依赖和脚本
│   ├── database/              # 数据库相关
│   │   └── init.sql          # 数据库初始化脚本
│   ├── models/                # 数据模型
│   │   └── Patient.js        # 患者数据模型
│   ├── routes/                # API路由
│   │   └── api.js            # RESTful API接口
│   ├── utils/                 # 工具函数
│   │   └── database.js       # 数据库连接配置
│   └── public/                # 前端静态文件
│       ├── web.html          # 主要问诊表单页面
│       ├── index.html        # 系统主页
│       ├── test.html         # 功能测试页面
│       └── home.html         # 导航主页
├── index.html                 # 项目入口文件
└── README.md                  # 项目说明文档（本文件）
```

## 🚀 快速开始

### 📋 环境要求

- Node.js 16.0+
- MySQL 8.0+
- npm 6.0+ 或 yarn 1.0+

### ⚡ 安装和运行

1. **克隆项目**
```bash
git clone <repository-url>
cd Web-Consultation-Assistant
```

2. **进入服务器目录**
```bash
cd Backend
```

3. **安装依赖**
```bash
npm install
```

4. **配置数据库**
```bash
# 创建数据库
mysql -u root -p < database/init.sql
```

5. **启动服务器**
```bash
npm run dev
```

6. **访问应用**
- 主页：http://localhost:3001/
- 问诊表单：http://localhost:3001/web
- API演示：http://localhost:3001/demo
- 功能测试：http://localhost:3001/test

## 📱 功能模块

### 🏥 患者信息管理
- 基本信息录入（姓名、年龄、联系方式等）
- 病史记录（现病史、既往史、过敏史）
- 系统回顾（各系统症状检查）
- 体格检查记录

### 💾 数据存储
- **本地存储**：使用localStorage实现离线功能
- **云端数据库**：MySQL数据库持久化存储
- **智能同步**：自动检测网络状态，选择合适的存储方式

### 🔍 数据操作
- 患者信息查询和搜索
- 记录更新和修改
- 患者列表查看
- 数据导出功能

## 🛠️ 技术栈

### 前端
- HTML5 + CSS3
- JavaScript (ES6+)
- 响应式设计
- localStorage API

### 后端
- Node.js
- Express.js
- MySQL2 (数据库驱动)
- CORS (跨域支持)
- Body-parser (请求解析)

### 部署
- Docker 容器化
- PM2 进程管理
- Nginx 反向代理支持

## 📊 API 接口

系统提供完整的RESTful API接口：

- `POST /api/patients` - 创建患者记录
- `GET /api/patients` - 获取患者列表
- `GET /api/patients/:id` - 获取特定患者信息
- `PUT /api/patients/:id` - 更新患者信息
- `DELETE /api/patients/:id` - 删除患者记录
- `GET /api/patients/search` - 搜索患者

详细API文档请参考 `Backend/README.md`

## 🔧 配置说明

### 数据库配置
在 `Backend/utils/database.js` 中配置MySQL连接信息：

```javascript
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'your-password',
  database: 'medical_consultation'
};
```

### 环境变量
支持通过环境变量配置：
- `DB_HOST` - 数据库主机
- `DB_USER` - 数据库用户
- `DB_PASSWORD` - 数据库密码
- `DB_NAME` - 数据库名称
- `PORT` - 服务器端口

## 🚀 部署指南

### Docker 部署
```bash
cd Backend
docker-compose up -d
```

### 传统部署
```bash
cd Backend
npm install --production
npm start
```

## 📝 开发说明

如需进行开发工作，请：

1. 切换到 `Backend` 目录
2. 查看 `Backend/README.md` 获取详细开发文档
3. 使用 `npm run dev` 启动开发模式

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

- 项目Issues：[GitHub Issues](../../issues)
- 邮箱：your-email@example.com

---

⭐ 如果这个项目对您有帮助，请考虑给它一个星标！
