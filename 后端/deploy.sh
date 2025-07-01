#!/bin/bash

# 医疗问诊助手后端部署脚本
# 适用于阿里云ECS、腾讯云CVM等Linux服务器

echo "🚀 开始部署医疗问诊助手后端系统..."

# 检查Node.js环境
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装Node.js 16+"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查MySQL环境
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL 未安装，请确保MySQL服务可用"
fi

# 安装依赖
echo "📦 安装项目依赖..."
npm install --production

# 检查环境变量文件
if [ ! -f .env ]; then
    echo "📝 创建环境配置文件..."
    cp .env.example .env || {
        echo "DB_HOST=localhost" > .env
        echo "DB_USER=root" >> .env
        echo "DB_PASSWORD=your_password" >> .env
        echo "DB_NAME=medical_consultation" >> .env
        echo "DB_PORT=3306" >> .env
        echo "PORT=3001" >> .env
        echo "NODE_ENV=production" >> .env
    }
    echo "⚠️  请编辑 .env 文件配置正确的数据库信息"
fi

# 初始化数据库（如果存在SQL文件）
if [ -f database/init.sql ]; then
    echo "🗄️  发现数据库初始化脚本"
    read -p "是否要初始化数据库？(y/N): " init_db
    if [[ $init_db =~ ^[Yy]$ ]]; then
        read -p "请输入MySQL root密码: " -s mysql_password
        echo
        mysql -u root -p$mysql_password < database/init.sql
        echo "✅ 数据库初始化完成"
    fi
fi

# 安装PM2（生产环境进程管理）
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装PM2进程管理器..."
    npm install -g pm2
fi

# 创建PM2配置文件
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'medical-consultation-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
EOF

# 创建日志目录
mkdir -p logs

# 启动服务
echo "🚀 启动医疗问诊助手服务..."
pm2 start ecosystem.config.js

# 设置开机自启
pm2 startup
pm2 save

echo "✅ 部署完成！"
echo "📋 服务状态: pm2 status"
echo "📝 查看日志: pm2 logs medical-consultation-api"
echo "🔄 重启服务: pm2 restart medical-consultation-api"
echo "🛑 停止服务: pm2 stop medical-consultation-api"
echo ""
echo "🌐 服务地址: http://your-server-ip:3001"
echo "🔗 健康检查: http://your-server-ip:3001/api/health"
echo ""
echo "⚠️  请确保："
echo "   1. 防火墙开放3001端口"
echo "   2. 云服务器安全组允许3001端口访问"
echo "   3. 配置正确的数据库连接信息"
