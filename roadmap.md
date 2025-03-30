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
    - CREATE
    - LIST **DONE**
    - DELETE
    
# Microservices
- Email notification
- Cron job to shift old data
- Daily backup -> local files
- greyLog (for logging)
- reminder to patient (1hr) and doctors (10min)

# DB Schema
