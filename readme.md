# Steps to run k8s
- run `sh ./k8s/elk-start.sh`
- *Wait for few minutes and access the elasticsearch on `http://192.168.49.2:30001/`*
- run `sh ./k8s/start.sh`
- this will start all the services access at `careconnect.local`
### To  Stop
- run `sh ./k8s/stop.sh`
- run `sh ./k8s/elk-stop.sh`


