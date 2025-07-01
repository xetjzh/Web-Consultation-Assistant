// 医疗问诊助手前端API集成

class MedicalConsultationAPI {
    constructor(baseURL = 'http://localhost:3001/api') {
        this.baseURL = baseURL;
    }

    // 通用请求方法
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || '请求失败');
            }
            
            return data;
        } catch (error) {
            console.error('API请求错误:', error);
            throw error;
        }
    }

    // 保存患者基本信息
    async savePatientBasicInfo(patientData) {
        return await this.request('/patient', {
            method: 'POST',
            body: JSON.stringify(patientData)
        });
    }

    // 保存现病史
    async saveCurrentIllness(patientId, illnessData) {
        return await this.request(`/patient/${patientId}/current-illness`, {
            method: 'POST',
            body: JSON.stringify(illnessData)
        });
    }

    // 保存系统回顾
    async saveSystemReview(patientId, systemReview) {
        return await this.request(`/patient/${patientId}/system-review`, {
            method: 'POST',
            body: JSON.stringify({ systemReview })
        });
    }

    // 保存体格检查
    async savePhysicalExam(patientId, examData) {
        return await this.request(`/patient/${patientId}/physical-exam`, {
            method: 'POST',
            body: JSON.stringify(examData)
        });
    }

    // 获取患者信息
    async getPatient(patientId) {
        return await this.request(`/patient/${patientId}`);
    }

    // 获取患者列表
    async getPatients(page = 1, limit = 20) {
        return await this.request(`/patients?page=${page}&limit=${limit}`);
    }

    // 搜索患者
    async searchPatients(keyword) {
        return await this.request(`/patients/search?q=${encodeURIComponent(keyword)}`);
    }

    // 更新患者信息
    async updatePatient(patientId, patientData) {
        return await this.request(`/patient/${patientId}`, {
            method: 'PUT',
            body: JSON.stringify(patientData)
        });
    }

    // 删除患者
    async deletePatient(patientId) {
        return await this.request(`/patient/${patientId}`, {
            method: 'DELETE'
        });
    }

    // 健康检查
    async healthCheck() {
        return await this.request('/health');
    }
}

// 全局API实例
const medicalAPI = new MedicalConsultationAPI();

// 表单数据收集和提交功能
class FormHandler {
    constructor() {
        this.currentPatientId = null;
    }

    // 收集患者基本信息
    collectBasicInfo() {
        return {
            name: document.getElementById('patient-name')?.value || '',
            age: parseInt(document.getElementById('patient-age')?.value) || 0,
            gender: document.getElementById('patient-gender')?.value || '',
            idCard: document.getElementById('id-card')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            address: document.getElementById('address')?.value || '',
            admissionDate: document.getElementById('admission-date')?.value || '',
            medicalRecordNumber: document.getElementById('medical-record-number')?.value || '',
            chiefComplaint: document.getElementById('chief-complaint')?.value || ''
        };
    }

    // 收集现病史
    collectCurrentIllness() {
        return {
            symptomDetails: document.getElementById('symptom-details')?.value || '',
            duration: document.getElementById('duration')?.value || '',
            severity: document.getElementById('severity')?.value || '',
            triggers: document.getElementById('triggers')?.value || '',
            relievingFactors: document.getElementById('relieving-factors')?.value || '',
            associatedSymptoms: document.getElementById('associated-symptoms')?.value || ''
        };
    }

    // 收集系统回顾
    collectSystemReview() {
        const systemReview = {
            general: {},
            respiratory: {},
            circulatory: {},
            digestive: {},
            urogenital: {},
            nervous: {}
        };

        // 收集各系统症状
        const systems = ['general', 'respiratory', 'circulatory', 'digestive', 'urogenital', 'nervous'];
        
        systems.forEach(system => {
            const elements = document.querySelectorAll(`[data-system="${system}"]`);
            elements.forEach(element => {
                const symptom = element.getAttribute('data-symptom');
                const value = element.value;
                const detail = document.getElementById(`${symptom}-detail`)?.value || '';
                
                systemReview[system][symptom] = {
                    present: value === '有',
                    detail: detail
                };
            });
        });

        return systemReview;
    }

    // 收集体格检查
    collectPhysicalExam() {
        return {
            vitalSigns: {
                temperature: document.getElementById('temperature')?.value || '',
                pulse: document.getElementById('pulse')?.value || '',
                respiration: document.getElementById('respiration')?.value || '',
                bloodPressure: document.getElementById('blood-pressure')?.value || '',
                weight: document.getElementById('weight')?.value || '',
                height: document.getElementById('height')?.value || ''
            },
            generalAppearance: document.getElementById('general-appearance')?.value || '',
            headNeck: this.collectExamSection('head-neck'),
            chest: this.collectExamSection('chest'),
            abdomen: this.collectExamSection('abdomen'),
            extremities: this.collectExamSection('extremities')
        };
    }

    // 收集检查部位详情
    collectExamSection(section) {
        const sectionData = {};
        const elements = document.querySelectorAll(`[data-section="${section}"]`);
        
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            sectionData[key] = element.value;
        });
        
        return sectionData;
    }

    // 保存完整问诊记录
    async saveCompleteRecord() {
        try {
            // 显示加载状态
            this.showLoading(true);

            // 1. 保存患者基本信息
            const basicInfo = this.collectBasicInfo();
            const patientResponse = await medicalAPI.savePatientBasicInfo(basicInfo);
            this.currentPatientId = patientResponse.patientId;

            // 2. 保存现病史
            const illnessData = this.collectCurrentIllness();
            if (Object.values(illnessData).some(val => val)) {
                await medicalAPI.saveCurrentIllness(this.currentPatientId, illnessData);
            }

            // 3. 保存系统回顾
            const systemReview = this.collectSystemReview();
            await medicalAPI.saveSystemReview(this.currentPatientId, systemReview);

            // 4. 保存体格检查
            const examData = this.collectPhysicalExam();
            if (Object.values(examData.vitalSigns).some(val => val) || examData.generalAppearance) {
                await medicalAPI.savePhysicalExam(this.currentPatientId, examData);
            }

            // 显示成功消息
            this.showMessage('问诊记录保存成功！', 'success');
            
            // 可选：重置表单
            if (confirm('是否清空表单以录入新患者？')) {
                this.resetForm();
            }

        } catch (error) {
            console.error('保存问诊记录错误:', error);
            this.showMessage('保存失败：' + error.message, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    // 显示加载状态
    showLoading(show) {
        const saveBtn = document.getElementById('save-complete-record');
        if (saveBtn) {
            saveBtn.disabled = show;
            saveBtn.textContent = show ? '保存中...' : '保存完整记录';
        }
    }

    // 显示消息
    showMessage(message, type = 'info') {
        // 创建消息元素
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        // 添加样式
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // 根据类型设置背景色
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196F3'
        };
        messageDiv.style.backgroundColor = colors[type] || colors.info;

        // 添加到页面
        document.body.appendChild(messageDiv);
        
        // 显示动画
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 10);

        // 自动消失
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }

    // 重置表单
    resetForm() {
        const form = document.getElementById('consultation-form');
        if (form) {
            form.reset();
        }
        this.currentPatientId = null;
    }
}

// 初始化表单处理器
const formHandler = new FormHandler();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加保存按钮（如果不存在）
    if (!document.getElementById('save-complete-record')) {
        const saveBtn = document.createElement('button');
        saveBtn.id = 'save-complete-record';
        saveBtn.textContent = '保存完整记录';
        saveBtn.className = 'btn btn-primary';
        saveBtn.onclick = () => formHandler.saveCompleteRecord();
        
        // 添加到页面底部
        document.body.appendChild(saveBtn);
    }

    // 测试后端连接
    medicalAPI.healthCheck()
        .then(response => {
            console.log('✅ 后端连接正常:', response);
        })
        .catch(error => {
            console.error('❌ 后端连接失败:', error);
            formHandler.showMessage('后端服务连接失败，请检查服务器状态', 'error');
        });
});

// 导出供全局使用
window.medicalAPI = medicalAPI;
window.formHandler = formHandler;
