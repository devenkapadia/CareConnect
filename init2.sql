

CREATE TYPE public.appointment_status AS ENUM (
'PENDING',
'CONFIRMED',
'COMPLETED',
'CANCELLED',
'REQUESTED'
);

CREATE TYPE public.backup_status AS ENUM (
'SUCCESS',
'FAILURE',
'PENDING'
);

CREATE TYPE public.gender_type AS ENUM (
'MALE',
'FEMALE',
'OTHER'
);

CREATE TYPE public.payment_status AS ENUM (
'PENDING',
'COMPLETED',
'FAILED'
);

CREATE TYPE public.user_role AS ENUM (
'PATIENT',
'DOCTOR',
'ADMIN'
);

CREATE TABLE public.app_users (
user_id uuid DEFAULT gen_random_uuid() NOT NULL,
email character varying(255) NOT NULL,
password character varying(255) NOT NULL,
role character varying(255) NOT NULL,
name character varying(255) NOT NULL,
created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.appointments (
appointment_id uuid DEFAULT gen_random_uuid() NOT NULL,
patient_id uuid NOT NULL,
user_id uuid NOT NULL,
doctor_id uuid NOT NULL,
payment_id uuid,
status character varying(255) DEFAULT 'PENDING'::public.appointment_status,
notes text,
created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
date character varying(255) NOT NULL,
"time" character varying(255) NOT NULL
);

CREATE TABLE public.archived_appointments (
appointment_id uuid NOT NULL,
patient_id uuid,
user_id uuid,
doctor_id uuid,
payment_id uuid,
date character varying(255),
"time" character varying(255),
status character varying(255),
notes text,
created_at timestamp without time zone,
updated_at timestamp without time zone
);

CREATE TABLE public.backup_logs (
backup_id uuid DEFAULT gen_random_uuid() NOT NULL,
backup_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
status public.backup_status DEFAULT 'PENDING'::public.backup_status,
error_message text,
created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.doctors (
doctor_id uuid NOT NULL,
specialization character varying(100) NOT NULL,
started_year integer,
consultation_fee numeric(10,2),
about text,
image character varying(255),
created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
degree character varying(255),
address character varying(255)
);

CREATE TABLE public.feedback (
feedback_id uuid NOT NULL,
comments text,
created_at timestamp(6) without time zone NOT NULL,
email character varying(255),
name character varying(100),
updated_at timestamp(6) without time zone NOT NULL
);

CREATE TABLE public.patients (
patient_id uuid DEFAULT gen_random_uuid() NOT NULL,
user_id uuid NOT NULL,
first_name character varying(100) NOT NULL,
last_name character varying(100) NOT NULL,
date_of_birth date,
gender character varying(255),
created_at timestamp(6) without time zone NOT NULL,
updated_at timestamp(6) without time zone NOT NULL
);

CREATE TABLE public.payments (
payment_id uuid DEFAULT gen_random_uuid() NOT NULL,
amount numeric(10,2) NOT NULL,
payment_status character varying(255) DEFAULT 'PENDING'::public.payment_status,
transaction_id character varying(100),
created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp(6) without time zone NOT NULL
);

COPY public.app_users (user_id, email, password, role, name, created_at, updated_at) FROM stdin;
ff418aa9-8d81-4435-9c91-98b903f29421	shubh@a.com	$2a$10$bX0BeYojJ6x6HUrMk0O.Re3aplCIrilgxnHsI9u.yMmzFco6XWaHK	PATIENT	Shubh	2025-03-29 15:03:22.228	2025-03-29 15:03:22.228
bf9902f3-79c8-4830-9ba8-12a2134049a3	doc@a.com	$2a$10$8L0sdkHoRxsD3FYtcJpfC.eJCQQ6eA2rj6xmkI1djVOHSgYG1MTdu	DOCTOR	Doc	2025-03-29 15:37:04.126	2025-03-29 15:37:04.126
17952f5d-1390-49f3-9858-8f2206619c50	admin@a.com	$2a$10$zxmy54OH2jSpumctQ8GYe.TzlVbFNvTUJt1FxVuasmY2Q69wsR1HS	ADMIN	Admin	2025-03-29 15:38:17.981	2025-03-29 15:38:17.981
e5cb7bde-1735-4caf-8cbb-5400c82e6816	doc2@a.com	$2a$10$wnrgEDy50ifbP.8GzlAk3ekmJoU5cZApggk/WA2iHkxv0ZSdedm.W	DOCTOR	Doctor Two	2025-03-29 17:15:42.978	2025-03-29 17:15:42.978
a019011a-a561-40d3-af7d-97a97103ea98	dr._sarah_patel2@example.com	$2b$12$UsEH9BLg9wIdMfX7NnslBehGyG/XwE68VxGyrT/lY08x2RCtmQf8a	doctor	Dr. Sarah Patel	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
7f2ec725-43d6-47e8-8394-b84aefd5e93d	dr._christopher_lee3@example.com	$2b$12$TSV/p7TsAcv1A2h43VaslOqSUSScqWViQ39mXLdZwS4YFwpCEVY0y	doctor	Dr. Christopher Lee	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
710e74d2-e6fe-4c61-b73a-cb0140c4d55b	dr._jennifer_garcia4@example.com	$2b$12$T6fhIIVnNoJKnR2YEjJr8e1Ho77FrJum1RS/x8Gm6qM2.VVbJkeJa	doctor	Dr. Jennifer Garcia	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
0fc630f8-da54-4673-bcb0-7389eaa8d707	dr._andrew_williams5@example.com	$2b$12$UGgZukdla97e77M3cKV2OO3q.FxSsfj0z/FMSWIEDXybnXJkRC2Te	doctor	Dr. Andrew Williams	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
5905e307-a2d3-40cd-affa-02aceeaea5a7	dr._christopher_davis6@example.com	$2b$12$EAa4ma2rP9i7yrkMePve9utcoh.Gf7U4U0DHyUFJGzcjGZeXsImJm	doctor	Dr. Christopher Davis	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
dc12a7dc-5404-44f7-b4b2-df45cf499109	dr._timothy_white7@example.com	$2b$12$8xEIUpAPDS/lVi9RKSjhFeBp/4PkwSSLNn/UiW521RKzkzweA3p0S	doctor	Dr. Timothy White	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
03ee4092-7993-496d-929d-e5a478ef68e2	dr._ava_mitchell8@example.com	$2b$12$B68QAXIqFGaHuDVVDkUYmeb21L5n5B.OnYNT4xMQUGYf8K3CYPcRe	doctor	Dr. Ava Mitchell	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
da31aa52-6805-4508-9585-30583b0a1be4	dr._jeffrey_king9@example.com	$2b$12$2lybzy9WIMHdf.m3nu6g.OpfJcQGCWqcS5.qePW0FRM3eX5Ii3F4W	doctor	Dr. Jeffrey King	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
676d412a-ec51-4b81-9e8d-8870a7ebed11	dr._zoe_kelly10@example.com	$2b$12$32GQo94Mw4lJVao6/7Ec..66mp/jAMCmUkle1diCTm5UKRBNMpqlW	doctor	Dr. Zoe Kelly	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
cf16a15f-8b98-4b74-9292-97ca1c7928d1	dr._patrick_harris11@example.com	$2b$12$F0dPHGnOUHe07aBk7wh9G.4Kg1clHTjbZPUz9HnSaVRdvDeAx4XHa	doctor	Dr. Patrick Harris	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
8006070e-728b-4410-be2d-edf3dcefe796	dr._chloe_evans12@example.com	$2b$12$rEJfEVySfSji03AedDX4BO045vrDdwqNhrfS6qST0rMNyly2jKzGe	doctor	Dr. Chloe Evans	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
80294ae6-fab6-4af4-a0db-8ba0785e7537	dr._ryan_martinez13@example.com	$2b$12$K5MneOS9mTSnpnGtnBkN1.cYvAuS91.BhODZRLimjzwrD70C8MANi	doctor	Dr. Ryan Martinez	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
793e35c6-fcb8-4c79-9f06-b5889cc3de95	dr._amelia_hill14@example.com	$2b$12$sG2Aa5plsJU97VnywdqSyek39/Dj3dDLna1em9WMnpz3cxYMXKO5W	doctor	Dr. Amelia Hill	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
5ac22895-6a50-46d6-ab9b-9072e86ca5bf	dr._emily_larson1@example.com	$2b$12$1pq82yKmnveAyshMptjCnenfRy/t41CTPn13Wxw62TUS0RMbjnkya	DOCTOR	Dr. Emily Larson	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978
\.

COPY public.appointments (appointment_id, patient_id, user_id, doctor_id, payment_id, status, notes, created_at, updated_at, date, "time") FROM stdin;
e8fea480-171b-4f76-b7f7-99029e435e5a	41eee881-ff7e-495c-9399-d2c2326682f7	ff418aa9-8d81-4435-9c91-98b903f29421	e5cb7bde-1735-4caf-8cbb-5400c82e6816	\N	PENDING	Its important	2025-04-06 15:00:49.716	2025-04-06 15:00:49.716	10-04-2025	20:00
c9933a6f-27a3-4996-82f7-d03cd8f82552	9902fb9f-31a2-4574-97ef-546824ab095b	ff418aa9-8d81-4435-9c91-98b903f29421	80294ae6-fab6-4af4-a0db-8ba0785e7537	\N	PENDING	\N	2025-04-06 17:02:06.072	2025-04-06 17:02:06.072	2025-04-09	19:00
f39f47c2-b01a-46e6-b9ad-ff5d982dac3a	41eee881-ff7e-495c-9399-d2c2326682f7	ff418aa9-8d81-4435-9c91-98b903f29421	bf9902f3-79c8-4830-9ba8-12a2134049a3	\N	PENDING	Its important	2025-04-08 10:24:12.663	2025-04-08 10:25:15.828	10-04-2025	20:00
31f5af71-2e5c-4821-92bf-da027f252c28	41eee881-ff7e-495c-9399-d2c2326682f7	ff418aa9-8d81-4435-9c91-98b903f29421	5ac22895-6a50-46d6-ab9b-9072e86ca5bf	\N	REQUESTED	\N	2025-04-08 14:53:34.237	2025-04-08 14:53:34.237	2025-04-08	15:00
\.

COPY public.archived_appointments (appointment_id, patient_id, user_id, doctor_id, payment_id, date, "time", status, notes, created_at, updated_at) FROM stdin;
de5f85a2-58f9-449c-afbe-04ab62448ea2	41eee881-ff7e-495c-9399-d2c2326682f7	ff418aa9-8d81-4435-9c91-98b903f29421	e5cb7bde-1735-4caf-8cbb-5400c82e6816	\N	31-3-2025	20:00	CANCELLED	Its important	2025-03-29 22:35:57.225	2025-03-29 22:35:57.225
21266b7f-3fd7-4813-97da-6ca4c6255883	41eee881-ff7e-495c-9399-d2c2326682f7	ff418aa9-8d81-4435-9c91-98b903f29421	e5cb7bde-1735-4caf-8cbb-5400c82e6816	\N	31-03-2025	20:00	CANCELLED	Its important	2025-03-29 22:43:47.036	2025-03-29 22:43:47.036
f63349a2-c9da-4905-89ee-e9bbf4d7cb01	41eee881-ff7e-495c-9399-d2c2326682f7	ff418aa9-8d81-4435-9c91-98b903f29421	e5cb7bde-1735-4caf-8cbb-5400c82e6816	\N	31-03-2025	20:00	COMPLETED	Its important	2025-03-29 22:42:39.586	2025-03-29 22:42:39.586
7f91f7c1-2982-44fc-9772-ed593b8e9c8c	41eee881-ff7e-495c-9399-d2c2326682f7	ff418aa9-8d81-4435-9c91-98b903f29421	bf9902f3-79c8-4830-9ba8-12a2134049a3	\N	30-03-2025	19:00	COMPLETED	Its important	2025-03-29 22:50:16.823	2025-03-30 14:37:06.136
\.

COPY public.backup_logs (backup_id, backup_time, status, error_message, created_at, updated_at) FROM stdin;
\.

COPY public.doctors (doctor_id, specialization, started_year, consultation_fee, about, image, created_at, updated_at, degree, address) FROM stdin;
e5cb7bde-1735-4caf-8cbb-5400c82e6816	Cardiologist	2008	165.00	Senior cardiologist with a focus on echocardiography and preventive cardiology.	https://picsum.photos/200/300	2025-03-29 12:51:19.282456	2025-03-29 12:51:19.282456	\N	\N
bf9902f3-79c8-4830-9ba8-12a2134049a3	Cardiologist	2013	140.75	Cardiologist specializing in cardiac arrhythmias and pacemakers.	https://picsum.photos/200/300	2025-03-29 12:51:19.282456	2025-03-29 12:51:19.282456	\N	\N
5ac22895-6a50-46d6-ab9b-9072e86ca5bf	Gynecologist	2020	60.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	27th Cross, Richmond, Circle, Ring Road, London
a019011a-a561-40d3-af7d-97a97103ea98	Dermatologist	2020	30.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	37th Cross, Richmond, Circle, Ring Road, London
7f2ec725-43d6-47e8-8394-b84aefd5e93d	Pediatricians	2020	40.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	47th Cross, Richmond, Circle, Ring Road, London
710e74d2-e6fe-4c61-b73a-cb0140c4d55b	Neurologist	2020	50.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	57th Cross, Richmond, Circle, Ring Road, London
0fc630f8-da54-4673-bcb0-7389eaa8d707	Neurologist	2020	50.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	57th Cross, Richmond, Circle, Ring Road, London
5905e307-a2d3-40cd-affa-02aceeaea5a7	General physician	2020	50.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	17th Cross, Richmond, Circle, Ring Road, London
dc12a7dc-5404-44f7-b4b2-df45cf499109	Gynecologist	2020	60.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	27th Cross, Richmond, Circle, Ring Road, London
03ee4092-7993-496d-929d-e5a478ef68e2	Dermatologist	2020	30.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	37th Cross, Richmond, Circle, Ring Road, London
da31aa52-6805-4508-9585-30583b0a1be4	Pediatricians	2020	40.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	47th Cross, Richmond, Circle, Ring Road, London
676d412a-ec51-4b81-9e8d-8870a7ebed11	Neurologist	2020	50.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	57th Cross, Richmond, Circle, Ring Road, London
cf16a15f-8b98-4b74-9292-97ca1c7928d1	Neurologist	2020	50.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	57th Cross, Richmond, Circle, Ring Road, London
8006070e-728b-4410-be2d-edf3dcefe796	General physician	2020	50.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	17th Cross, Richmond, Circle, Ring Road, London
80294ae6-fab6-4af4-a0db-8ba0785e7537	Gynecologist	2020	60.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	27th Cross, Richmond, Circle, Ring Road, London
793e35c6-fcb8-4c79-9f06-b5889cc3de95	Dermatologist	2020	30.00	Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.	https://picsum.photos/200/300	2025-03-29 17:56:35.098978	2025-03-29 17:56:35.098978	MBBS	37th Cross, Richmond, Circle, Ring Road, London
\.

COPY public.feedback (feedback_id, comments, created_at, email, name, updated_at) FROM stdin;
0bcd91af-8a12-4f06-8023-60d49f7efabb	Test comments	2025-03-29 16:18:24.779	test@a.com	test	2025-03-29 16:18:24.779
366484ef-462b-4eb6-a2d6-a16de5cadbcb	Test comments	2025-03-31 23:11:00.809	test@a.com	test	2025-03-31 23:11:00.809
a4ea68a6-6e8a-41e1-94b2-3516f221cc84	This app is made by some skillful person	2025-04-06 17:07:18.661	devenkapadia1@gmail.com	Ancient Aliens 	2025-04-06 17:07:18.661
a2b11a5e-8047-4769-a18d-23bd89dd8b30	adadw	2025-04-06 17:07:34.797	devenkapadia1@gmail.com	Ancient Aliens 	2025-04-06 17:07:34.797
\.

COPY public.patients (patient_id, user_id, first_name, last_name, date_of_birth, gender, created_at, updated_at) FROM stdin;
41eee881-ff7e-495c-9399-d2c2326682f7	ff418aa9-8d81-4435-9c91-98b903f29421	test	test	1999-11-22	MALE	2025-03-29 16:59:19.304	2025-03-29 16:59:19.304
9902fb9f-31a2-4574-97ef-546824ab095b	ff418aa9-8d81-4435-9c91-98b903f29421	test	two	1988-11-11	FEMALE	2025-03-29 17:09:27.197	2025-03-29 17:09:27.197
d7434025-5e6c-467c-add5-036ddd49ac93	ff418aa9-8d81-4435-9c91-98b903f29421	test	three	0011-07-15	FEMALE	2025-04-06 15:33:57.72	2025-04-06 15:33:57.72
\.

COPY public.payments (payment_id, amount, payment_status, transaction_id, created_at, updated_at) FROM stdin;
\.

ALTER TABLE ONLY public.app_users
ADD CONSTRAINT app_users_email_key UNIQUE (email);

ALTER TABLE ONLY public.app_users
ADD CONSTRAINT app_users_pkey PRIMARY KEY (user_id);

ALTER TABLE ONLY public.appointments
ADD CONSTRAINT appointments_pkey PRIMARY KEY (appointment_id);

ALTER TABLE ONLY public.archived_appointments
ADD CONSTRAINT archived_appointments_pkey PRIMARY KEY (appointment_id);

ALTER TABLE ONLY public.backup_logs
ADD CONSTRAINT backup_logs_pkey PRIMARY KEY (backup_id);

ALTER TABLE ONLY public.doctors
ADD CONSTRAINT doctors_pkey PRIMARY KEY (doctor_id);

ALTER TABLE ONLY public.feedback
ADD CONSTRAINT feedback_pkey PRIMARY KEY (feedback_id);

ALTER TABLE ONLY public.patients
ADD CONSTRAINT patients_pkey PRIMARY KEY (patient_id);

ALTER TABLE ONLY public.payments
ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);

ALTER TABLE ONLY public.appointments
ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(doctor_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.appointments
ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.appointments
ADD CONSTRAINT appointments_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(payment_id) ON DELETE SET NULL;

ALTER TABLE ONLY public.appointments
ADD CONSTRAINT appointments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.app_users(user_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.doctors
ADD CONSTRAINT doctors_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.app_users(user_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.archived_appointments
ADD CONSTRAINT fk_appointment_doctor FOREIGN KEY (doctor_id) REFERENCES public.doctors(doctor_id);

ALTER TABLE ONLY public.archived_appointments
ADD CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id);

ALTER TABLE ONLY public.archived_appointments
ADD CONSTRAINT fk_appointment_payment FOREIGN KEY (payment_id) REFERENCES public.payments(payment_id);

ALTER TABLE ONLY public.archived_appointments
ADD CONSTRAINT fk_appointment_user FOREIGN KEY (user_id) REFERENCES public.app_users(user_id);

ALTER TABLE ONLY public.patients
ADD CONSTRAINT patients_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.app_users(user_id) ON DELETE CASCADE;

