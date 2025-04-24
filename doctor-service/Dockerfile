FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./target/doctor-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 3003

ENTRYPOINT ["java","-jar","app.jar"]

#mvn clean -DskipTests=true  package