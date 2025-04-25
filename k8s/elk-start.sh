# Apply namespace first
kubectl apply -f namespace.yaml
kubectl apply -f elk-deployment.yaml -n careconnect