const db = require('../utils/database');

class PatientModel {
    // 创建新患者
    async createPatient(patientData) {
        const {
            name, age, gender, idCard, phone, address,
            admissionDate, medicalRecordNumber, chiefComplaint
        } = patientData;

        const query = `
            INSERT INTO patients (
                name, age, gender, id_card, phone, address,
                admission_date, medical_record_number, chief_complaint
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await db.query(query, [
            name, age, gender, idCard, phone, address,
            admissionDate, medicalRecordNumber, chiefComplaint
        ]);

        return result.insertId;
    }

    // 获取患者基本信息
    async getPatientById(id) {
        const query = 'SELECT * FROM patients WHERE id = ?';
        const results = await db.query(query, [id]);
        return results[0] || null;
    }

    // 获取所有患者
    async getAllPatients(limit = 50, offset = 0) {
        const query = `
            SELECT id, name, age, gender, phone, medical_record_number, 
                   chief_complaint, created_at 
            FROM patients 
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?
        `;
        return await db.query(query, [limit, offset]);
    }

    // 搜索患者
    async searchPatients(keyword) {
        const query = `
            SELECT id, name, age, gender, phone, medical_record_number, 
                   chief_complaint, created_at 
            FROM patients 
            WHERE name LIKE ? OR phone LIKE ? OR medical_record_number LIKE ?
            ORDER BY created_at DESC
        `;
        const searchTerm = `%${keyword}%`;
        return await db.query(query, [searchTerm, searchTerm, searchTerm]);
    }

    // 更新患者信息
    async updatePatient(id, patientData) {
        const {
            name, age, gender, idCard, phone, address,
            admissionDate, medicalRecordNumber, chiefComplaint
        } = patientData;

        const query = `
            UPDATE patients SET 
                name = ?, age = ?, gender = ?, id_card = ?, 
                phone = ?, address = ?, admission_date = ?, 
                medical_record_number = ?, chief_complaint = ?
            WHERE id = ?
        `;

        const result = await db.query(query, [
            name, age, gender, idCard, phone, address,
            admissionDate, medicalRecordNumber, chiefComplaint, id
        ]);

        return result.affectedRows > 0;
    }

    // 删除患者
    async deletePatient(id) {
        const query = 'DELETE FROM patients WHERE id = ?';
        const result = await db.query(query, [id]);
        return result.affectedRows > 0;
    }

    // 保存现病史
    async saveCurrentIllness(data) {
        const {
            patientId, symptomDetails, duration, severity,
            triggers, relievingFactors, associatedSymptoms
        } = data;

        const query = `
            INSERT INTO current_illness (
                patient_id, symptom_details, duration, severity,
                triggers, relieving_factors, associated_symptoms
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await db.query(query, [
            patientId, symptomDetails, duration, severity,
            triggers, relievingFactors, associatedSymptoms
        ]);

        return result.insertId;
    }

    // 保存系统回顾
    async saveSystemReview(patientId, systemReview) {
        const query = `
            INSERT INTO system_review (
                patient_id, general_condition, respiratory_system,
                circulatory_system, digestive_system, urogenital_system,
                nervous_system
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await db.query(query, [
            patientId,
            JSON.stringify(systemReview.general || {}),
            JSON.stringify(systemReview.respiratory || {}),
            JSON.stringify(systemReview.circulatory || {}),
            JSON.stringify(systemReview.digestive || {}),
            JSON.stringify(systemReview.urogenital || {}),
            JSON.stringify(systemReview.nervous || {})
        ]);

        return result.insertId;
    }

    // 保存体格检查
    async savePhysicalExam(data) {
        const {
            patientId, vitalSigns, generalAppearance,
            headNeck, chest, abdomen, extremities
        } = data;

        const query = `
            INSERT INTO physical_examination (
                patient_id, vital_signs, general_appearance,
                head_neck, chest, abdomen, extremities
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await db.query(query, [
            patientId,
            JSON.stringify(vitalSigns || {}),
            generalAppearance,
            JSON.stringify(headNeck || {}),
            JSON.stringify(chest || {}),
            JSON.stringify(abdomen || {}),
            JSON.stringify(extremities || {})
        ]);

        return result.insertId;
    }

    // 获取患者完整信息
    async getPatientFullInfo(patientId) {
        const patientQuery = 'SELECT * FROM patients WHERE id = ?';
        const illnessQuery = 'SELECT * FROM current_illness WHERE patient_id = ? ORDER BY created_at DESC';
        const reviewQuery = 'SELECT * FROM system_review WHERE patient_id = ? ORDER BY created_at DESC';
        const examQuery = 'SELECT * FROM physical_examination WHERE patient_id = ? ORDER BY created_at DESC';

        const [patient, illness, review, exam] = await Promise.all([
            db.query(patientQuery, [patientId]),
            db.query(illnessQuery, [patientId]),
            db.query(reviewQuery, [patientId]),
            db.query(examQuery, [patientId])
        ]);

        if (patient.length === 0) {
            return null;
        }

        return {
            patient: patient[0],
            currentIllness: illness,
            systemReview: review,
            physicalExam: exam
        };
    }
}

module.exports = new PatientModel();
