from archive import archive_future_appointments
from dbbackup import create_backup
from apscheduler.scheduler import Scheduler

def main():
    # Call the archive function
    archive_future_appointments()
    
    # Call the backup function
    create_backup()

sched = Scheduler()
sched.start()
sched.add_cron_job(main, minute=0)


