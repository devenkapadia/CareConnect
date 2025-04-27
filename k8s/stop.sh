kubectl delete -f ingress.yaml -n careconnect

kubectl delete -f archive-service.yaml -n careconnect
kubectl delete -f email-service.yaml -n careconnect

# Delete deployments
kubectl delete -f deployment-doctor-service.yaml -n careconnect
kubectl delete -f deployment-admin-service.yaml -n careconnect
kubectl delete -f deployment-user-service.yaml -n careconnect
kubectl delete -f deployment-auth-service.yaml -n careconnect
kubectl delete -f deployment-frontend-service.yaml -n careconnect
kubectl delete -f hpa.yaml -n careconnect
# Delete services
kubectl delete -f service-doctor.yaml -n careconnect
kubectl delete -f service-admin.yaml -n careconnect
kubectl delete -f service-user.yaml -n careconnect
kubectl delete -f service-auth.yaml -n careconnect
kubectl delete -f service-frontend.yaml -n careconnect

echo "All resources have been deleted successfully."