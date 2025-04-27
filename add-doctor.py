import json
import bcrypt
import uuid  # Example for PostgreSQL, adjust for your database

# Your doctor data (as a Python list of dictionaries)
doctors_data = [
    {
        '_id': 'doc1',
        'name': 'Dr. Richard James',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'General physician',
        'degree': 'MBBS',
        'experience': '4 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 50,
        'address': {
            'line1': '17th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc2',
        'name': 'Dr. Emily Larson',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Gynecologist',
        'degree': 'MBBS',
        'experience': '3 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 60,
        'address': {
            'line1': '27th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc3',
        'name': 'Dr. Sarah Patel',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Dermatologist',
        'degree': 'MBBS',
        'experience': '1 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 30,
        'address': {
            'line1': '37th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc4',
        'name': 'Dr. Christopher Lee',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Pediatricians',
        'degree': 'MBBS',
        'experience': '2 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 40,
        'address': {
            'line1': '47th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc5',
        'name': 'Dr. Jennifer Garcia',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Neurologist',
        'degree': 'MBBS',
        'experience': '4 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 50,
        'address': {
            'line1': '57th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc6',
        'name': 'Dr. Andrew Williams',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Neurologist',
        'degree': 'MBBS',
        'experience': '4 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 50,
        'address': {
            'line1': '57th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc7',
        'name': 'Dr. Christopher Davis',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'General physician',
        'degree': 'MBBS',
        'experience': '4 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 50,
        'address': {
            'line1': '17th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc8',
        'name': 'Dr. Timothy White',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Gynecologist',
        'degree': 'MBBS',
        'experience': '3 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 60,
        'address': {
            'line1': '27th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc9',
        'name': 'Dr. Ava Mitchell',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Dermatologist',
        'degree': 'MBBS',
        'experience': '1 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 30,
        'address': {
            'line1': '37th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc10',
        'name': 'Dr. Jeffrey King',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Pediatricians',
        'degree': 'MBBS',
        'experience': '2 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 40,
        'address': {
            'line1': '47th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc11',
        'name': 'Dr. Zoe Kelly',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Neurologist',
        'degree': 'MBBS',
        'experience': '4 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 50,
        'address': {
            'line1': '57th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc12',
        'name': 'Dr. Patrick Harris',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Neurologist',
        'degree': 'MBBS',
        'experience': '4 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 50,
        'address': {
            'line1': '57th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc13',
        'name': 'Dr. Chloe Evans',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'General physician',
        'degree': 'MBBS',
        'experience': '4 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 50,
        'address': {
            'line1': '17th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc14',
        'name': 'Dr. Ryan Martinez',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Gynecologist',
        'degree': 'MBBS',
        'experience': '3 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 60,
        'address': {
            'line1': '27th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
    {
        '_id': 'doc15',
        'name': 'Dr. Amelia Hill',
        'image': 'https://picsum.photos/200/300',
        'speciality': 'Dermatologist',
        'degree': 'MBBS',
        'experience': '1 Years',
        'about': 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        'fees': 30,
        'address': {
            'line1': '37th Cross, Richmond',
            'line2': 'Circle, Ring Road, London'
        }
    },
]

for i, doctor in enumerate(doctors_data):
    # Generate data for app_users
    user_id = str(uuid.uuid4())  # Generate a UUID for user_id
    name = doctor['name']
    email = f"{name.lower().replace(' ', '_')}{i}@example.com"  # Generate unique email
    password = f"password"  #temp_password_{i} Generate temporary password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    role = 'doctor'  # Assuming 'doctor' is a valid user_role

    # SQL for inserting into app_users
    insert_user_sql = f"""
    INSERT INTO app_users (user_id, name, email, password, role)
    VALUES ('{user_id}', '{name}', '{email}', '{hashed_password}', '{role}');
    """
    print(insert_user_sql)

    # Generate address string
    address_str = f"{doctor['address']['line1']}, {doctor['address']['line2']}"

    # SQL for inserting into doctors
    insert_doctor_sql = f"""
    INSERT INTO doctors (doctor_id, specialization,started_year, consultation_fee, about, degree, address, image)
    VALUES ('{user_id}', '{doctor['speciality']}',2020, {float(doctor['fees'])}, '{doctor['about'].replace("'", "''")}', '{doctor['degree']}', '{address_str.replace("'", "''")}', 'https://picsum.photos/200/300');
    """
    print(insert_doctor_sql)
    #print("--") # Separator between doctor entries

print("SQL statements generated. Please execute them against your PostgreSQL database.")
