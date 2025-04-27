kubectl delete -f rabbitmq-service.yaml -n careconnect
kubectl delete -f elk-deployment.yaml -n careconnect
kubectl delete -f db-service.yaml -n careconnect
kubectl delete -f secrets.yaml -n careconnect
kubectl delete -f pvc.yaml -n careconnect
kubectl delete -f pv.yaml
kubectl delete -f namespace.yaml
