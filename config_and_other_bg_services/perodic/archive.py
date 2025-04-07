import psycopg2
from apscheduler.schedulers.blocking import BlockingScheduler
from datetime import datetime
from logging_service import logger
# PostgreSQL Connection Config
DB_CONFIG = {
    "dbname": "careconnect",
    "user": "careconnect",
    "password": "QWERTqwert@12345",
    "host": "db.careconnect.261403.xyz",
    "port": "5432"
}

def archive_future_appointments():
    conn = None
    cur = None
    try:
        # Connect to the database
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        # Verify connection
        cur.execute("SELECT current_database(), CURRENT_TIMESTAMP")
        db_name, db_time = cur.fetchone()
        print(f"Connected to database: {db_name} | Server time: {db_time}")

        now = datetime.now()
        print(f"Local time: {now}")
        print(f"[{now}] Archiving future appointments...")

        # Step 1: Count records that should be archived
        cur.execute("""
            SELECT COUNT(*) 
            FROM appointments 
            WHERE TO_TIMESTAMP(date || ' ' || time, 'DD-MM-YYYY HH24:MI') < %s
        """, (now,))
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
        """, (now,))
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
        """, (now,))
        deleted_count = cur.rowcount
        print(f"Deleted {deleted_count} records from appointments")

        # Commit the transaction
        conn.commit()
        print(f"[{datetime.now()}] Transaction committed successfully")
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

#archive_future_appointments()
# # Scheduler to run every hour on the hour
# scheduler = BlockingScheduler()
# scheduler.add_job(archive_future_appointments, 'cron', minute=0)
# print("Appointment Archiver is running...")

# try:
#     scheduler.start()
# except (KeyboardInterrupt, SystemExit):
#     print("Scheduler stopped.")
