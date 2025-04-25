#!/bin/bash

# Delete Kubernetes resources in the correct order

# Delete ingress
kubectl delete -f ingress.yaml -n careconnect

#kubectl delete -f elk-deployment.yaml -n careconnect

# Delete deployments
kubectl delete -f deployment-doctor-service.yaml -n careconnect
kubectl delete -f deployment-admin-service.yaml -n careconnect
kubectl delete -f deployment-user-service.yaml -n careconnect
kubectl delete -f deployment-auth-service.yaml -n careconnect
kubectl delete -f deployment-frontend-service.yaml -n careconnect

# Delete services
kubectl delete -f service-doctor.yaml -n careconnect
kubectl delete -f service-admin.yaml -n careconnect
kubectl delete -f service-user.yaml -n careconnect
kubectl delete -f service-auth.yaml -n careconnect
kubectl delete -f service-frontend.yaml -n careconnect

# Delete secrets
kubectl delete -f secrets.yaml -n careconnect

echo "All resources have been deleted successfully."