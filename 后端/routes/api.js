const express = require('express');
const PatientModel = require('../models/Patient');
const router = express.Router();

// 健康检查
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: '服务器运行正常',
        timestamp: new Date().toISOString()
    });
});

// 创建新患者
router.post('/patient', async (req, res) => {
    try {
        const patientId = await PatientModel.createPatient(req.body);
        res.json({
            success: true,
            message: '患者信息保存成功',
            patientId: patientId
        });
    } catch (error) {
        console.error('创建患者错误:', error);
        res.status(500).json({
            success: false,
            message: '保存失败',
            error: error.message
        });
    }
});

// 获取患者信息
router.get('/patient/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const patientInfo = await PatientModel.getPatientFullInfo(patientId);
        
        if (!patientInfo) {
            return res.status(404).json({
                success: false,
                message: '患者未找到'
            });
        }

        res.json({
            success: true,
            data: patientInfo
        });
    } catch (error) {
        console.error('获取患者信息错误:', error);
        res.status(500).json({
            success: false,
            message: '获取失败',
            error: error.message
        });
    }
});

// 获取所有患者列表
router.get('/patients', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        const patients = await PatientModel.getAllPatients(limit, offset);
        
        res.json({
            success: true,
            data: patients,
            pagination: {
                page: page,
                limit: limit,
                total: patients.length
            }
        });
    } catch (error) {
        console.error('获取患者列表错误:', error);
        res.status(500).json({
            success: false,
            message: '获取失败',
            error: error.message
        });
    }
});

// 搜索患者
router.get('/patients/search', async (req, res) => {
    try {
        const keyword = req.query.q;
        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: '请提供搜索关键词'
            });
        }

        const patients = await PatientModel.searchPatients(keyword);
        
        res.json({
            success: true,
            data: patients
        });
    } catch (error) {
        console.error('搜索患者错误:', error);
        res.status(500).json({
            success: false,
            message: '搜索失败',
            error: error.message
        });
    }
});

// 更新患者信息
router.put('/patient/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const success = await PatientModel.updatePatient(patientId, req.body);
        
        if (!success) {
            return res.status(404).json({
                success: false,
                message: '患者未找到或更新失败'
            });
        }

        res.json({
            success: true,
            message: '患者信息更新成功'
        });
    } catch (error) {
        console.error('更新患者信息错误:', error);
        res.status(500).json({
            success: false,
            message: '更新失败',
            error: error.message
        });
    }
});

// 保存现病史
router.post('/patient/:id/current-illness', async (req, res) => {
    try {
        const patientId = req.params.id;
        const data = { ...req.body, patientId };
        
        const id = await PatientModel.saveCurrentIllness(data);
        
        res.json({
            success: true,
            message: '现病史保存成功',
            id: id
        });
    } catch (error) {
        console.error('保存现病史错误:', error);
        res.status(500).json({
            success: false,
            message: '保存失败',
            error: error.message
        });
    }
});

// 保存系统回顾
router.post('/patient/:id/system-review', async (req, res) => {
    try {
        const patientId = req.params.id;
        const { systemReview } = req.body;
        
        const id = await PatientModel.saveSystemReview(patientId, systemReview);
        
        res.json({
            success: true,
            message: '系统回顾保存成功',
            id: id
        });
    } catch (error) {
        console.error('保存系统回顾错误:', error);
        res.status(500).json({
            success: false,
            message: '保存失败',
            error: error.message
        });
    }
});

// 保存体格检查
router.post('/patient/:id/physical-exam', async (req, res) => {
    try {
        const patientId = req.params.id;
        const data = { ...req.body, patientId };
        
        const id = await PatientModel.savePhysicalExam(data);
        
        res.json({
            success: true,
            message: '体格检查保存成功',
            id: id
        });
    } catch (error) {
        console.error('保存体格检查错误:', error);
        res.status(500).json({
            success: false,
            message: '保存失败',
            error: error.message
        });
    }
});

// 删除患者
router.delete('/patient/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const success = await PatientModel.deletePatient(patientId);
        
        if (!success) {
            return res.status(404).json({
                success: false,
                message: '患者未找到'
            });
        }

        res.json({
            success: true,
            message: '患者删除成功'
        });
    } catch (error) {
        console.error('删除患者错误:', error);
        res.status(500).json({
            success: false,
            message: '删除失败',
            error: error.message
        });
    }
});

module.exports = router;
