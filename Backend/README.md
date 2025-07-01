# web-consultation-assistant - 完整集成系统

一个完整的web-consultation-assistant全栈系统，实现了前端表单与后端数据库的无缝集成，支持统一导航和双重数据保存。

## ✨ 系统特性

- 🏥 **患者管理**: 完整的患者基本信息管理
- 📋 **问诊记录**: 现病史、系统回顾、体格检查记录
- 🔍 **数据查询**: 患者信息搜索和检索
- 🌐 **RESTful API**: 标准化的API接口设计
- 💾 **双重存储**: 本地localStorage + 云端MySQL数据库
- 🧭 **统一导航**: 所有页面配备响应式导航栏
- ☁️ **云端部署**: 支持容器化云服务器部署

## 🚀 访问入口

| 页面 | 地址 | 功能描述 |
|------|------|----------|
| **主页导航** | <http://localhost:3001/> | 系统总览和快速导航 |
| **完整问诊表单** | <http://localhost:3001/web> | 专业问诊记录系统 |
| **API演示页面** | <http://localhost:3001/demo> | 完整的API测试界面 |
| **集成测试** | <http://localhost:3001/test> | 系统功能验证 |

## 🛠 技术栈

- **后端框架**: Node.js + Express.js
- **数据库**: MySQL 8.0+
- **前端技术**: HTML5 + CSS3 + JavaScript ES6
- **数据连接**: mysql2/promise 连接池
- **中间件**: CORS, Body-parser
- **环境管理**: dotenv
- **开发工具**: nodemon

## ⚡ 快速开始

### 环境要求

- Node.js 16.0+
- MySQL 8.0+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd web-consultation-assistant/Backend
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   复制 `.env` 文件并修改数据库配置：
   ```bash
   cp .env.example .env
   ```
   
   编辑 `.env` 文件：
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=medical_consultation
   DB_PORT=3306
   PORT=3000
   ```

4. **初始化数据库**
   
   在MySQL中运行初始化脚本：
   ```bash
   mysql -u root -p < database/init.sql
   ```

5. **启动服务器**
   ```bash
   # 开发模式
   npm run dev
   
   # 生产模式
   npm start
   ```

6. **验证服务**
   
   访问 http://localhost:3001 查看主页导航
   
   - 主页导航: http://localhost:3001
   - 完整问诊表单: http://localhost:3001/web  
   - API演示页面: http://localhost:3001/demo
   - 健康检查: http://localhost:3001/api/health

## 页面说明

### 🏠 主页导航 (/)
主页提供了系统的整体概览和快速导航功能：
- 显示系统运行状态
- 提供两个主要功能入口
- API接口信息展示

### 📋 完整问诊表单 (/web)
专业的医疗问诊记录系统：
- 完整的患者信息采集
- 病史记录和系统回顾
- 多种导出格式（Word、Excel、PDF等）
- 本地存储和云端同步
- 打印友好界面

### 🧪 API演示页面 (/demo)  
用于测试和演示后端API功能：
- 简化的数据输入界面
- 实时API连接状态
- 数据库操作测试
- 错误调试信息

## API文档

### 基础信息

- **Base URL**: `http://localhost:3001/api`
- **Content-Type**: `application/json`

### 接口列表

#### 健康检查
```
GET /health
```

#### 患者管理

**创建患者**
```
POST /patient
Content-Type: application/json

{
  "name": "张三",
  "age": 35,
  "gender": "男",
  "phone": "13800138001",
  "chiefComplaint": "头痛3天"
}
```

**获取患者信息**
```
GET /patient/:id
```

**获取患者列表**
```
GET /patients?page=1&limit=20
```

**搜索患者**
```
GET /patients/search?q=关键词
```

**更新患者**
```
PUT /patient/:id
```

**删除患者**
```
DELETE /patient/:id
```

#### 医疗记录

**保存现病史**
```
POST /patient/:id/current-illness
```

**保存系统回顾**
```
POST /patient/:id/system-review
```

**保存体格检查**
```
POST /patient/:id/physical-exam
```

## 数据库结构

### 主要数据表

- `patients` - 患者基本信息
- `current_illness` - 现病史
- `past_history` - 既往史
- `personal_history` - 个人史
- `family_history` - 家族史
- `marriage_birth_history` - 婚姻生育史
- `system_review` - 系统回顾
- `physical_examination` - 体格检查
- `auxiliary_examination` - 辅助检查
- `diagnosis` - 诊断
- `treatment_plan` - 治疗方案

## 前端集成

### 引入API文件

在HTML中引入前端API集成文件：

```html
<script src="/js/medical-api.js"></script>
```

### 使用示例

```javascript
// 保存完整问诊记录
formHandler.saveCompleteRecord();

// 获取患者信息
const patient = await medicalAPI.getPatient(patientId);

// 搜索患者
const results = await medicalAPI.searchPatients('张三');
```

## 部署

### 本地部署

1. 确保MySQL服务运行
2. 配置正确的数据库连接信息
3. 运行 `npm start` 启动服务

### 云端部署

#### 阿里云ECS部署

1. **购买ECS实例**并安装Node.js和MySQL

2. **上传代码**
   ```bash
   scp -r . user@your-server:/path/to/app
   ```

3. **安装依赖**
   ```bash
   npm install --production
   ```

4. **配置环境变量**
   ```bash
   export DB_HOST=your-rds-host
   export DB_PASSWORD=your-db-password
   ```

5. **使用PM2管理进程**
   ```bash
   npm install -g pm2
   pm2 start server.js --name medical-api
   pm2 startup
   pm2 save
   ```

#### Docker部署

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t web-consultation-assistant-api .
docker run -d -p 3000:3000 --name web-api web-consultation-assistant-api
```

## 开发指南

### 项目结构

```
├── server.js           # 主服务器文件
├── package.json        # 项目配置
├── .env               # 环境变量
├── database/
│   └── init.sql       # 数据库初始化脚本
├── models/
│   └── Patient.js     # 患者数据模型
├── routes/
│   └── api.js         # API路由
├── utils/
│   └── database.js    # 数据库工具类
└── public/
    └── js/
        └── medical-api.js  # 前端API集成
```

### 添加新功能

1. 在 `models/` 中创建数据模型
2. 在 `routes/` 中添加路由处理
3. 更新数据库结构（如需要）
4. 编写测试用例

### 代码规范

- 使用 ES6+ 语法
- 采用 async/await 处理异步操作
- 遵循 RESTful API 设计原则
- 添加适当的错误处理和日志

## 安全性

### 数据保护

- 使用参数化查询防止SQL注入
- 实施CORS策略
- 敏感信息环境变量化
- 建议添加JWT认证（生产环境）

### 建议增强

```javascript
// JWT认证中间件
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.sendStatus(401);
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
```

## 监控和日志

### 推荐工具

- **日志**: Winston
- **监控**: PM2 + Keymetrics
- **性能**: New Relic
- **错误追踪**: Sentry

## 备份和恢复

### 数据库备份

```bash
# 备份
mysqldump -u root -p medical_consultation > backup.sql

# 恢复
mysql -u root -p medical_consultation < backup.sql
```

### 自动备份脚本

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u root -p$DB_PASSWORD medical_consultation > /backup/medical_${DATE}.sql
```

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查MySQL服务状态
   - 验证连接配置
   - 确认网络连接

2. **API请求超时**
   - 检查服务器负载
   - 优化数据库查询
   - 调整连接池配置

3. **内存泄漏**
   - 使用 `clinic` 工具分析
   - 检查数据库连接释放
   - 监控事件监听器

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 贡献

欢迎提交Pull Request和Issue！

## 支持

如有问题，请通过以下方式联系：

- 📧 Email: support@web-consultation-assistant.com
- 📞 Phone: +86-xxx-xxxx-xxxx
- 💬 WeChat: medical-support

---

**注意**: 本系统仅供学习和演示使用，实际医疗应用需要符合相关法规和标准。
