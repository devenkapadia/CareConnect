# Frontend
-   Login integration with API
-   Patient details ui for appointment booking
-   [MAJOR] Doctor Dasboard
-   [MAJOR] Admin Dashboard

# Backend 
## User side
-   (doctor)/(getAll group by specialization) **DONE - BUT NEED TO SEE available tag**
-   (doctor)/(id)
    - return detils + timeslots info
-   (contact)/feedback **DONE**
-   (appointment)
    - book
    - payment
    - fetch
    - refund **REMOVED**
-   (patient) 
    - add  **DONE**
    - get **DONE**

## Doctor
- (appointments)
    - fetchAll
    - fetchOne
    - refundApproval -> patient notify **REMOVED**
    - changeDateTime -> patient notify **REMOVED**
- (unavailble) **REMOVED**
    - byEvry
    - byDate
    - byDateRange
    - byTime

## Admin
- (stats)
    - return patients + doctors + user
- (transactions)
- (doctor)
    - CRUD
    
# Microservices
- Email notification
- Cron job to shift old data
- Daily backup -> local files
- greyLog (for logging)
- reminder to patient (1hr) and doctors (10min)
# DB Schema
