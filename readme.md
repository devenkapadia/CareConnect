# Steps to run k8s
- minikube start
- minukube ssh - create 3 folders [careconnect, careconnect-backup, rabbitmq]
- run `sh ./k8s/elk-db-start.sh`
- *Wait for few minutes and access the elasticsearch on `http://192.168.49.2:30001/`*
- run `sh ./k8s/start.sh`
- this will start all the services access at `careconnect.local`

# To  Stop
- run `sh ./k8s/stop.sh`
- run `sh ./k8s/elk-db-stop.sh`

# When Changes are made in Code
### In the folder of microservice
- build the image: docker build -t shubhpatel2610/{name-of-service}:latest .
- push new image to docker: docker push shubhpatel2610/{name-of-service}:latest

### In k8s folder
- restart kubernetes: kubectl rollout restart deployment {name-of-service} -n namespace
- verify rollout: kubectl rollout status deployment {name-of-service} -n namespace