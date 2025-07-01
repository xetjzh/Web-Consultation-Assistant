const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
    constructor() {
        this.config = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'medical_consultation',
            port: process.env.DB_PORT || 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            charset: 'utf8mb4'
        };
        
        this.pool = mysql.createPool(this.config);
    }

    async query(sql, params = []) {
        try {
            const [results] = await this.pool.execute(sql, params);
            return results;
        } catch (error) {
            console.error('数据库查询错误:', error);
            throw error;
        }
    }

    async getConnection() {
        return await this.pool.getConnection();
    }

    async beginTransaction() {
        const connection = await this.getConnection();
        await connection.beginTransaction();
        return connection;
    }

    async commit(connection) {
        await connection.commit();
        connection.release();
    }

    async rollback(connection) {
        await connection.rollback();
        connection.release();
    }

    async testConnection() {
        try {
            const connection = await this.pool.getConnection();
            console.log('✅ 数据库连接成功');
            connection.release();
            return true;
        } catch (error) {
            console.error('❌ 数据库连接失败:', error.message);
            return false;
        }
    }

    async close() {
        await this.pool.end();
    }
}

module.exports = new Database();
