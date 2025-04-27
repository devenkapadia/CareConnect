\c careconnect
CREATE TYPE appointment_status AS ENUM (
    'PENDING',
    'CONFIRMED',
    'COMPLETED',
    'CANCELLED',
    'REQUESTED'
);
CREATE TYPE backup_status AS ENUM (
    'SUCCESS',
    'FAILURE',
    'PENDING'
);

CREATE TYPE gender_type AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER'
);

CREATE TYPE payment_status AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED'
);

CREATE TYPE user_role AS ENUM (
    'PATIENT',
    'DOCTOR',
    'ADMIN'
);


CREATE TABLE app_users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE appointments (
    appointment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL,
    user_id UUID NOT NULL,
    doctor_id UUID NOT NULL,
    payment_id UUID,
    date VARCHAR(255) NOT NULL,
    time VARCHAR(255) NOT NULL
    status appointment_status DEFAULT 'PENDING',
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,

);



CREATE TABLE archived_appointments (
    appointment_id uuid NOT NULL,
    patient_id uuid,
    user_id uuid,
    doctor_id uuid,
    payment_id uuid,
    date VARCHAR(255),
    "time" VARCHAR(255),
    status VARCHAR(255),
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


CREATE TABLE backup_logs (
    backup_id uuid DEFAULT gen_random_uuid() NOT NULL,
    backup_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status backup_status DEFAULT 'PENDING'::backup_status,
    error_message text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE doctors (
    doctor_id uuid NOT NULL,
    specialization character varying(100) NOT NULL,
    started_year integer,
    consultation_fee numeric(10,2),
    about text,
    image VARCHAR(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    degree VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE feedback (
    feedback_id uuid NOT NULL,
    comments text,
    created_at timestamp(6) without time zone NOT NULL,
    email VARCHAR(255),
    name character varying(100),
    updated_at timestamp(6) without time zone NOT NULL
);

CREATE TABLE patients (
    patient_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    date_of_birth date,
    gender VARCHAR(255),
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);

CREATE TABLE payments (
    payment_id uuid DEFAULT gen_random_uuid() NOT NULL,
    amount numeric(10,2) NOT NULL,
    payment_status VARCHAR(255) DEFAULT 'PENDING'::payment_status,
    transaction_id character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) without time zone NOT NULL
);

INSERT INTO app_users (user_id, email, password, role, name, created_at, updated_at) VALUES
    ('ff418aa9-8d81-4435-9c91-98b903f29421', 'shubh@a.com', '$2a$10$bX0BeYojJ6x6HUrMk0O.Re3aplCIrilgxnHsI9u.yMmzFco6XWaHK', 'PATIENT', 'Shubh', '2025-03-29 15:03:22.228', '2025-03-29 15:03:22.228'),
    ('bf9902f3-79c8-4830-9ba8-12a2134049a3', 'doc@a.com', '$2a$10$8L0sdkHoRxsD3FYtcJpfC.eJCQQ6eA2rj6xmkI1djVOHSgYG1MTdu', 'DOCTOR', 'Doc', '2025-03-29 15:37:04.126', '2025-03-29 15:37:04.126'),
    ('17952f5d-1390-49f3-9858-8f2206619c50', 'admin@a.com', '$2a$10$zxmy54OH2jSpumctQ8GYe.TzlVbFNvTUJt1FxVuasmY2Q69wsR1HS', 'ADMIN', 'Admin', '2025-03-29 15:38:17.981', '2025-03-29 15:38:17.981'),
    ('e5cb7bde-1735-4caf-8cbb-5400c82e6816', 'doc2@a.com', '$2a$10$wnrgEDy50ifbP.8GzlAk3ekmJoU5cZApggk/WA2iHkxv0ZSdedm.W', 'DOCTOR', 'Doctor Two', '2025-03-29 17:15:42.978', '2025-03-29 17:15:42.978'),
    ('a019011a-a561-40d3-af7d-97a97103ea98', 'dr._sarah_patel2@example.com', '$2b$12$UsEH9BLg9wIdMfX7NnslBehGyG/XwE68VxGyrT/lY08x2RCtmQf8a', 'DOCTOR', 'Dr. Sarah Patel', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('7f2ec725-43d6-47e8-8394-b84aefd5e93d', 'dr._christopher_lee3@example.com', '$2b$12$TSV/p7TsAcv1A2h43VaslOqSUSScqWViQ39mXLdZwS4YFwpCEVY0y', 'DOCTOR', 'Dr. Christopher Lee', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('710e74d2-e6fe-4c61-b73a-cb0140c4d55b', 'dr._jennifer_garcia4@example.com', '$2b$12$T6fhIIVnNoJKnR2YEjJr8e1Ho77FrJum1RS/x8Gm6qM2.VVbJkeJa', 'DOCTOR', 'Dr. Jennifer Garcia', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('0fc630f8-da54-4673-bcb0-7389eaa8d707', 'dr._andrew_williams5@example.com', '$2b$12$UGgZukdla97e77M3cKV2OO3q.FxSsfj0z/FMSWIEDXybnXJkRC2Te', 'DOCTOR', 'Dr. Andrew Williams', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('5905e307-a2d3-40cd-affa-02aceeaea5a7', 'dr._christopher_davis6@example.com', '$2b$12$EAa4ma2rP9i7yrkMePve9utcoh.Gf7U4U0DHyUFJGzcjGZeXsImJm', 'DOCTOR', 'Dr. Christopher Davis', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('dc12a7dc-5404-44f7-b4b2-df45cf499109', 'dr._timothy_white7@example.com', '$2b$12$8xEIUpAPDS/lVi9RKSjhFeBp/4PkwSSLNn/UiW521RKzkzweA3p0S', 'DOCTOR', 'Dr. Timothy White', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('03ee4092-7993-496d-929d-e5a478ef68e2', 'dr._ava_mitchell8@example.com', '$2b$12$B68QAXIqFGaHuDVVDkUYmeb21L5n5B.OnYNT4xMQUGYf8K3CYPcRe', 'DOCTOR', 'Dr. Ava Mitchell', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('da31aa52-6805-4508-9585-30583b0a1be4', 'dr._jeffrey_king9@example.com', '$2b$12$2lybzy9WIMHdf.m3nu6g.OpfJcQGCWqcS5.qePW0FRM3eX5Ii3F4W', 'DOCTOR', 'Dr. Jeffrey King', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('676d412a-ec51-4b81-9e8d-8870a7ebed11', 'dr._zoe_kelly10@example.com', '$2b$12$32GQo94Mw4lJVao6/7Ec..66mp/jAMCmUkle1diCTm5UKRBNMpqlW', 'DOCTOR', 'Dr. Zoe Kelly', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('cf16a15f-8b98-4b74-9292-97ca1c7928d1', 'dr._patrick_harris11@example.com', '$2b$12$F0dPHGnOUHe07aBk7wh9G.4Kg1clHTjbZPUz9HnSaVRdvDeAx4XHa', 'DOCTOR', 'Dr. Patrick Harris', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('8006070e-728b-4410-be2d-edf3dcefe796', 'dr._chloe_evans12@example.com', '$2b$12$rEJfEVySfSji03AedDX4BO045vrDdwqNhrfS6qST0rMNyly2jKzGe', 'DOCTOR', 'Dr. Chloe Evans', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('80294ae6-fab6-4af4-a0db-8ba0785e7537', 'dr._ryan_martinez13@example.com', '$2b$12$K5MneOS9mTSnpnGtnBkN1.cYvAuS91.BhODZRLimjzwrD70C8MANi', 'DOCTOR', 'Dr. Ryan Martinez', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('793e35c6-fcb8-4c79-9f06-b5889cc3de95', 'dr._amelia_hill14@example.com', '$2b$12$sG2Aa5plsJU97VnywdqSyek39/Dj3dDLna1em9WMnpz3cxYMXKO5W', 'DOCTOR', 'Dr. Amelia Hill', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978'),
    ('5ac22895-6a50-46d6-ab9b-9072e86ca5bf', 'dr._emily_larson1@example.com', '$2b$12$1pq82yKmnveAyshMptjCnenfRy/t41CTPn13Wxw62TUS0RMbjnkya', 'DOCTOR', 'Dr. Emily Larson', '2025-03-29 17:56:35.098978', '2025-03-29 17:56:35.098978');

    INSERT INTO appointments (appointment_id, patient_id, doctor_id, appointment_time, status, reason, created_at, updated_at) VALUES
    ('d0e4c59f-5945-45c0-9892-4afae98e53b9', 'ff418aa9-8d81-4435-9c91-98b903f29421', 'bf9902f3-79c8-4830-9ba8-12a2134049a3', '2025-03-30 12:00:00', 'SCHEDULED', 'Regular check-up', '2025-03-29 15:40:00', '2025-03-29 15:40:00'),
    ('ec48a9ab-c84d-4fc8-bc7e-837c547b2a3b', 'ff418aa9-8d81-4435-9c91-98b903f29421', 'e5cb7bde-1735-4caf-8cbb-5400c82e6816', '2025-04-01 15:30:00', 'SCHEDULED', 'Consultation about allergies', '2025-03-29 16:00:00', '2025-03-29 16:00:00');
    
    INSERT INTO archived_appointments (appointment_id, patient_id, doctor_id, appointment_time, status, reason, created_at, updated_at, archived_at) VALUES
    ('d1fdd5db-ea1a-49ee-8011-6ef245032e0a', 'ff418aa9-8d81-4435-9c91-98b903f29421', 'bf9902f3-79c8-4830-9ba8-12a2134049a3', '2025-03-20 10:00:00', 'COMPLETED', 'Follow-up appointment', '2025-03-15 12:00:00', '2025-03-20 11:00:00', '2025-03-21 10:00:00');
    
    INSERT INTO doctors (doctor_id, specialization, experience_years, rating) VALUES
    ('bf9902f3-79c8-4830-9ba8-12a2134049a3', 'General Physician', 5, 4.5),
    ('e5cb7bde-1735-4caf-8cbb-5400c82e6816', 'Allergist', 8, 4.7),
    ('a019011a-a561-40d3-af7d-97a97103ea98', 'Cardiologist', 10, 4.8),
    ('7f2ec725-43d6-47e8-8394-b84aefd5e93d', 'Dermatologist', 7, 4.6),
    ('710e74d2-e6fe-4c61-b73a-cb0140c4d55b', 'Neurologist', 9, 4.9),
    ('0fc630f8-da54-4673-bcb0-7389eaa8d707', 'Pediatrician', 6, 4.4),
    ('5905e307-a2d3-40cd-affa-02aceeaea5a7', 'Psychiatrist', 12, 4.5),
    ('dc12a7dc-5404-44f7-b4b2-df45cf499109', 'Oncologist', 15, 4.8),
    ('03ee4092-7993-496d-929d-e5a478ef68e2', 'Orthopedic Surgeon', 11, 4.7),
    ('da31aa52-6805-4508-9585-30583b0a1be4', 'Gastroenterologist', 8, 4.5),
    ('676d412a-ec51-4b81-9e8d-8870a7ebed11', 'Endocrinologist', 9, 4.6),
    ('cf16a15f-8b98-4b74-9292-97ca1c7928d1', 'Rheumatologist', 7, 4.3),
    ('8006070e-728b-4410-be2d-edf3dcefe796', 'Urologist', 10, 4.4),
    ('80294ae6-fab6-4af4-a0db-8ba0785e7537', 'Pulmonologist', 5, 4.2),
    ('793e35c6-fcb8-4c79-9f06-b5889cc3de95', 'Ophthalmologist', 13, 4.9),
    ('5ac22895-6a50-46d6-ab9b-9072e86ca5bf', 'ENT Specialist', 6, 4.4);