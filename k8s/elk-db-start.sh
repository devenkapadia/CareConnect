kubectl apply -f namespace.yaml
kubectl apply -f pv.yaml
kubectl apply -f pvc.yaml -n careconnect
kubectl apply -f elk-deployment.yaml -n careconnect
kubectl apply -f secrets.yaml -n careconnect
kubectl apply -f db-service.yaml -n careconnect
kubectl apply -f rabbitmq-service.yaml -n careconnect