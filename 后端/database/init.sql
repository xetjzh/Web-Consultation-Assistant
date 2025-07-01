-- 医疗问诊助手数据库初始化脚本

-- 创建数据库
CREATE DATABASE IF NOT EXISTS medical_consultation DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE medical_consultation;

-- 患者基本信息表
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '姓名',
    age INT NOT NULL COMMENT '年龄',
    gender ENUM('男', '女') NOT NULL COMMENT '性别',
    id_card VARCHAR(18) UNIQUE COMMENT '身份证号',
    phone VARCHAR(20) COMMENT '电话号码',
    address TEXT COMMENT '地址',
    admission_date DATE COMMENT '入院日期',
    medical_record_number VARCHAR(50) UNIQUE COMMENT '病历号',
    chief_complaint TEXT COMMENT '主诉',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT '患者基本信息表';

-- 现病史表
CREATE TABLE IF NOT EXISTS current_illness (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    symptom_details TEXT COMMENT '症状详情',
    duration VARCHAR(200) COMMENT '持续时间',
    severity ENUM('轻度', '中度', '重度') COMMENT '严重程度',
    triggers TEXT COMMENT '诱发因素',
    relieving_factors TEXT COMMENT '缓解因素',
    associated_symptoms TEXT COMMENT '伴随症状',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) COMMENT '现病史表';

-- 既往史表
CREATE TABLE IF NOT EXISTS past_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    diseases TEXT COMMENT '既往疾病',
    surgeries TEXT COMMENT '手术史',
    allergies TEXT COMMENT '过敏史',
    medications TEXT COMMENT '用药史',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) COMMENT '既往史表';

-- 个人史表
CREATE TABLE IF NOT EXISTS personal_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    smoking BOOLEAN DEFAULT FALSE COMMENT '吸烟史',
    smoking_details TEXT COMMENT '吸烟详情',
    drinking BOOLEAN DEFAULT FALSE COMMENT '饮酒史',
    drinking_details TEXT COMMENT '饮酒详情',
    occupation VARCHAR(100) COMMENT '职业',
    living_environment TEXT COMMENT '居住环境',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) COMMENT '个人史表';

-- 家族史表
CREATE TABLE IF NOT EXISTS family_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    hereditary_diseases TEXT COMMENT '遗传性疾病',
    family_diseases TEXT COMMENT '家族疾病史',
    parents_health TEXT COMMENT '父母健康状况',
    siblings_health TEXT COMMENT '兄弟姐妹健康状况',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) COMMENT '家族史表';

-- 婚姻生育史表
CREATE TABLE IF NOT EXISTS marriage_birth_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    marital_status ENUM('未婚', '已婚', '离异', '丧偶') COMMENT '婚姻状况',
    marriage_age INT COMMENT '结婚年龄',
    pregnancies INT COMMENT '妊娠次数',
    births INT COMMENT '分娩次数',
    abortions INT COMMENT '流产次数',
    menstrual_history TEXT COMMENT '月经史',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) COMMENT '婚姻生育史表';

-- 系统回顾表
CREATE TABLE IF NOT EXISTS system_review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    general_condition JSON COMMENT '一般状况',
    respiratory_system JSON COMMENT '呼吸系统',
    circulatory_system JSON COMMENT '循环系统',
    digestive_system JSON COMMENT '消化系统',
    urogenital_system JSON COMMENT '泌尿生殖系统',
    nervous_system JSON COMMENT '神经系统',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) COMMENT '系统回顾表';

-- 体格检查表
CREATE TABLE IF NOT EXISTS physical_examination (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    vital_signs JSON COMMENT '生命体征',
    general_appearance TEXT COMMENT '一般状态',
    head_neck JSON COMMENT '头颈部检查',
    chest JSON COMMENT '胸部检查',
    abdomen JSON COMMENT '腹部检查',
    extremities JSON COMMENT '四肢检查',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) COMMENT '体格检查表';

-- 辅助检查表
CREATE TABLE IF NOT EXISTS auxiliary_examination (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    lab_tests JSON COMMENT '实验室检查',
    imaging_studies JSON COMMENT '影像学检查',
    special_tests JSON COMMENT '特殊检查',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) COMMENT '辅助检查表';

-- 诊断表
CREATE TABLE IF NOT EXISTS diagnosis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    primary_diagnosis TEXT COMMENT '主要诊断',
    secondary_diagnosis TEXT COMMENT '次要诊断',
    differential_diagnosis TEXT COMMENT '鉴别诊断',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) COMMENT '诊断表';

-- 治疗方案表
CREATE TABLE IF NOT EXISTS treatment_plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    medications JSON COMMENT '药物治疗',
    procedures TEXT COMMENT '治疗操作',
    lifestyle_advice TEXT COMMENT '生活方式建议',
    follow_up_plan TEXT COMMENT '随访计划',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) COMMENT '治疗方案表';

-- 创建索引
CREATE INDEX idx_patients_name ON patients(name);
CREATE INDEX idx_patients_phone ON patients(phone);
CREATE INDEX idx_patients_created_at ON patients(created_at);

-- 插入测试数据
INSERT INTO patients (name, age, gender, phone, chief_complaint) VALUES
('张三', 35, '男', '13800138001', '头痛3天'),
('李四', 28, '女', '13800138002', '咳嗽伴发热2天'),
('王五', 45, '男', '13800138003', '胸痛1周');

COMMIT;
