FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./target/user-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 3002

ENTRYPOINT ["java","-jar","app.jar"]

#mvn clean -DskipTests=true  package