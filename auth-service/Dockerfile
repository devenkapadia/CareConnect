FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./target/auth-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 3001

ENTRYPOINT ["java","-jar","app.jar"]

#mvn clean -DskipTests=true package