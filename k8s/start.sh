# Apply deployments
kubectl apply -f deployment-auth-service.yaml -n careconnect
kubectl apply -f deployment-user-service.yaml -n careconnect
kubectl apply -f deployment-admin-service.yaml -n careconnect
kubectl apply -f deployment-doctor-service.yaml -n careconnect
kubectl apply -f deployment-frontend-service.yaml -n careconnect
kubectl apply -f hpa.yaml -n careconnect

# Apply services
kubectl apply -f service-auth.yaml -n careconnect
kubectl apply -f service-user.yaml -n careconnect
kubectl apply -f service-admin.yaml -n careconnect
kubectl apply -f service-doctor.yaml -n careconnect
kubectl apply -f service-frontend.yaml -n careconnect

kubectl apply -f archive-service.yaml -n careconnect
kubectl apply -f email-service.yaml -n careconnect

# Apply ingress
kubectl apply -f ingress.yaml -n careconnect

echo "All resources have been applied successfully."