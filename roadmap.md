# Frontend
-   Login integration with API
-   Patient details ui for appointment booking
-   [MAJOR] Doctor Dasboard
-   [MAJOR] Admin Dashboard

# Backend 
## User side
-   (doctor)/(getAll group by specialization) **DONE - BUT NEED TO SEE available tag**
-   (doctor)/(id)
    - return detils + timeslots info  **DONE**
-   (contact)/feedback **DONE**
-   (appointment)
    - book  **DONE**
    - payment
    - fetch **DONE**
    - refund **REMOVED**
-   (patient) 
    - add  **DONE**
    - get **DONE**

## Doctor
- (appointments)
    - fetchAll **DONE**
    - fetchOne **NOT NEEDED**
    - Approve **DONE**
    - refundApproval -> patient notify **REMOVED**
    - changeDateTime -> patient notify **REMOVED**
- (unavailble) **REMOVED**
    - byEvry
    - byDate
    - byDateRange
    - byTime

## Admin
- (stats) **DONE**
    - return patients + doctors + user
- (appointments) **DONE**
- (doctor)
    - CREATE **DONE**
    - LIST **DONE**
    - DELETE **DONE**
    - UPDATE **PENDING**
    
# Microservices
- Email notification (rabbitmq)
- Cron job to shift old data
- Daily backup -> local files cxc
- Loki + Grafana **DONE** 
- reminder to patient (1hr) and doctors (10min)


20:00

21:00

every hour on exact time:
        if current time 21:00
                then move all the before one to archived 
                notify the 22:00 guys about the meeting

on 0:00 backup the data to a zip file
