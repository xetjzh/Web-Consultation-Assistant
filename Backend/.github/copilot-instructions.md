<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Web-Consultation-Assistant项目 - Copilot 指引

## 项目概述
这是一个Web-Consultation-Assistant全栈项目，包含前端HTML表单和后端Node.js API服务。

## 技术栈
- **后端**: Node.js + Express.js + MySQL
- **前端**: HTML + CSS + JavaScript
- **数据库**: MySQL 8.0+
- **部署**: 支持云端服务器部署

## 代码规范

### 后端开发
- 使用 async/await 处理异步操作
- 采用 RESTful API 设计原则
- 使用参数化查询防止SQL注入
- 所有接口返回统一的JSON格式：
  ```javascript
  {
    "success": boolean,
    "message": string,
    "data": object,
    "error": string
  }
  ```

### 数据库操作
- 使用 `mysql2/promise` 进行数据库操作
- 所有查询使用参数化语句
- JSON类型字段用于存储复杂数据结构
- 遵循数据库表结构和命名规范

### API设计
- 患者管理：`/api/patient`
- 问诊记录：`/api/patient/:id/current-illness`
- 系统回顾：`/api/patient/:id/system-review`
- 体格检查：`/api/patient/:id/physical-exam`

### 错误处理
- 使用 try-catch 包装异步操作
- 返回有意义的错误消息
- 记录错误日志到控制台

### 前端集成
- 使用 `medical-api.js` 进行前后端交互
- 表单数据自动收集和验证
- 统一的消息提示系统

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
