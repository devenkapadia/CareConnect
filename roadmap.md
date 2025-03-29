# Frontend
-   Login integration with API
-   Patient details ui for appointment booking
-   [MAJOR] Doctor Dasboard
-   [MAJOR] Admin Dashboard

# Backend 
## User side
-   (doctor)/(getAll group by specialization)
-   (doctor)/(id)
    - return detils + timeslots info
-   (doctor)/(book appointment)
-   (contact)/feedback
-   (appointment)
    - payment
    - fetch
    - refund
-   (patient)
    - add
    - get
    - attached to appointment

## Doctor
- (appointments)
    - fetchAll
    - fetchOne
    - refundApproval -> patient notify
    - changeDateTime -> patient notify
- (unavailble)
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
