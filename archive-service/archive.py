import psycopg2
from datetime import datetime, timedelta
import pytz
from logging_service import logger
from config import *
from rabbitmq import RabbitMQ

# PostgreSQL Connection Config
DB_CONFIG = {
    "dbname": DATABASE_NAME,
    "user": DATABASE_USER,
    "password": DATABASE_PASSWORD,
    "host": REMOTE_HOST,
    "port": REMOTE_PORT
}

def archive_future_appointments():
    conn = None
    cur = None
    try:
        # Connect to the database
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()
        rabbitmq = RabbitMQ()
        # Verify connection
        cur.execute("SELECT current_database(), CURRENT_TIMESTAMP")
        db_name, db_time = cur.fetchone()
        print(f"Connected to database: {db_name} | Server time: {db_time}")

        # Get current time in IST
        ist_timezone = pytz.timezone('Asia/Kolkata')
        now = datetime.now(ist_timezone)
        print(f"IST time: {now}")
        print(f"[{now}] Archiving future appointments...")
        
        one_hour_later = now + timedelta(hours=1)

        # Format time for query
        one_hour_later_d = one_hour_later.strftime('%d-%m-%Y')
        one_hour_later_h = one_hour_later.strftime('%H:00')

        # Check if the appointment is in the future
        cur.execute("""
            SELECT a.appointment_id, u.email, a.date, a.time, d.name, a.status
            FROM appointments a
            JOIN app_users u ON a.user_id = u.user_id
            JOIN app_users d ON a.doctor_id = d.user_id
            WHERE a.status IN ('CONFIRMED')
            AND a.date = %s
            AND a.time = %s
        """, (one_hour_later_d, one_hour_later_h))
        future_appointments = cur.fetchall()
        print(f"Found {len(future_appointments)} future appointments")
        for appointment in future_appointments:
            data = {
                "email": appointment[1],
                "subject": "Appointment Reminder",
                "message": f"Dear {appointment[1]},\n\nThis is a reminder for your appointment with Dr. {appointment[4]} on {appointment[2]} at {appointment[3]}.\n\nBest regards,\nCareConnect Team"
            }
            rabbitmq.publish("EmailQueue", str(data))
        print(f"Published {len(future_appointments)} messages to EmailQueue")
        
        # Use naive datetime for database comparison (without timezone info)
        naive_now = now.replace(tzinfo=None)
        
        # Step 1: Count records that should be archived
        cur.execute("""
            SELECT COUNT(*) 
            FROM appointments 
            WHERE TO_TIMESTAMP(date || ' ' || time, 'DD-MM-YYYY HH24:MI') < %s
        """, (naive_now,))
        eligible_count = cur.fetchone()[0]
        print(f"Found {eligible_count} eligible future appointments")

        # Step 2: Perform the insert and get affected rows
        cur.execute("""
            INSERT INTO archived_appointments (
                appointment_id, patient_id, user_id, doctor_id, payment_id, 
                date, time, status, notes, created_at, updated_at
            )
            SELECT 
                appointment_id, patient_id, user_id, doctor_id, payment_id, 
                date, time, status, notes, created_at, updated_at
            FROM appointments
            WHERE TO_TIMESTAMP(date || ' ' || time, 'DD-MM-YYYY HH24:MI') < %s
            RETURNING appointment_id
        """, (naive_now,))
        inserted_count = cur.rowcount
        print(f"Inserted {inserted_count} records into archived_appointments")

        # Step 3: convert PENDING to CANCELLED
        cur.execute("""
            UPDATE archived_appointments
            SET status = 'CANCELLED'
            WHERE status = 'REQUESTED' 
        """)
        updated_count = cur.rowcount
        print(f"Updated {updated_count} records to CANCELLED in archived_appointments")

        # step 4: convert CONFIRMED to COMPLETED
        cur.execute("""
            UPDATE archived_appointments
            SET status = 'COMPLETED'
            WHERE status = 'PENDING' 
        """)
        updated_count = cur.rowcount
        print(f"Updated {updated_count} records to COMPLETED in archived_appointments")

        # Step 5: Perform the delete and get affected rows
        cur.execute("""
            DELETE FROM appointments
            WHERE TO_TIMESTAMP(date || ' ' || time, 'DD-MM-YYYY HH24:MI') < %s
        """, (naive_now,))
        deleted_count = cur.rowcount
        print(f"Deleted {deleted_count} records from appointments")

        # Commit the transaction
        conn.commit()
        print(f"[{datetime.now(ist_timezone)}] Transaction committed successfully")
        logger.info(f"Archived successfully. Transfered {inserted_count} records to archived_appointments and deleted {deleted_count} records from appointments. Updated {updated_count} records to CANCELLED and COMPLETED in archived_appointments.")

    except Exception as e:
        print(f"Error archiving appointments: {e}")
        if conn:
            conn.rollback()
            print("Transaction rolled back")
        logger.error(f"Error archiving appointments: {e}")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
            print("Database connection closed")
            logger.info("Database connection closed")