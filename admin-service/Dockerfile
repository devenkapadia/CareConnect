FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./target/admin-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 3004

ENTRYPOINT ["java","-jar","app.jar"]

#mvn clean -DskipTests=true  package