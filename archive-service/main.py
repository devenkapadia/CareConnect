from archive import archive_future_appointments
from dbbackup import create_backup
from logging_service import logger
from config import *
def main():
    # Call the archive function
    archive_future_appointments()
    
    # Call the backup function
    create_backup()

if __name__ == "__main__":
    print("Starting periodic tasks...")
    # print(DATABASE_NAME)
    # print(REMOTE_HOST)
    # print(REMOTE_PORT)
    # print(DATABASE_USER)
    # print(DATABASE_PASSWORD)
    # print(LOGSTASH_HOST)
    # print(LOGSTASH_PORT)
    main()
    logger.info("Periodic tasks completed successfully.")