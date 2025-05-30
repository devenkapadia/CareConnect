import os
import subprocess
import datetime
from logging_service import logger
from config import *
#from logging_service import logger
# Database credentials and settings
BACKUP_DIRECTORY = "/app/backups"
BACKUP_FILENAME = "postgres_backup_{}.sql.gz"

# Create the backup directory if it doesn't exist
if not os.path.exists(BACKUP_DIRECTORY):
    os.makedirs(BACKUP_DIRECTORY)

def create_backup():
    now = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    dump_filename = os.path.join(BACKUP_DIRECTORY, BACKUP_FILENAME.format(now))

    # Construct the pg_dump command
    command = [
        "pg_dump",
        "-h", REMOTE_HOST,  # Remote host
        "-p", REMOTE_PORT,  # Remote port
        "-U", DATABASE_USER,
        "-d", DATABASE_NAME,
        "-F", "c",  # Use custom format
        "-b",
        "-f", dump_filename
    ]

    try:
        # Set the password in the environment variable
        env = os.environ.copy()
        env["PGPASSWORD"] = DATABASE_PASSWORD
        
        # Execute the pg_dump command
        result = subprocess.run(command, capture_output=True, text=True, check=True, env=env)
        print(f"Backup created successfully: {dump_filename}")
        # List files in the backup directory
        backup_files = os.listdir(BACKUP_DIRECTORY)
        print("Files in backup directory:")
        for file in backup_files:
            print(file)
        logger.info(f"Backup created successfully: {dump_filename}")
        logger.info(f"Command output: {result.stdout}")
        
    except subprocess.CalledProcessError as e:
        print(f"Error during backup: {e}")
        print(e.stderr)
        print(e.stdout)
        logger.error(f"Error during backup: {e}")
        logger.error(f"Command output: {e.stdout}")
        logger.error(f"Command error output: {e.stderr}")
        exit(1)
