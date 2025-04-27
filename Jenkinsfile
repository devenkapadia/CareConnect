pipeline {
    agent any
    triggers { 
      githubPush() 
   }
    environment {
        GITHUB_CRED_ID = '8a04b3d0-fc77-45de-a0d0-260eb63cc33c'
        DOCKERHUB_CRED_ID = '476d8d59-73e9-4eb2-82b2-83113de121d1'
        DOCKER_IMAGE_NAME = 'shubhpatel2610/miniprojectspe'
        GITHUB_REPO_URL = 'https://github.com/devenkapadia/CareConnect.git'
        DEV_EMAIL = 'shubhp2610@gmail.com'
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', url: "${GITHUB_REPO_URL}", credentialsId: "${GITHUB_CRED_ID}"
                }
            }
        }
        stage('Clean & Build Spring Boot Services') {
            steps {
                script {
                    dir('auth-service') {
                        sh 'mvn clean -DskipTests=true  package'
                    }
                    dir('admin-service') {
                        sh 'mvn clean -DskipTests=true  package'
                    }
                    dir('user-service') {
                        sh 'mvn clean -DskipTests=true  package'
                    }
                    dir('doctor-service') {
                        sh 'mvn clean -DskipTests=true  package'
                    }
                }
            }
        }
        stage('Building docker images') {
            steps {
                script {
                    dir('frontend') {
                        sh 'docker build -t shubhpatel2610/frontend-service .'
                    }
                    dir('auth-service') {
                        sh 'docker build -t shubhpatel2610/auth-service .'
                    }
                    dir('admin-service') {
                        sh 'docker build -t shubhpatel2610/admin-service .'
                    }
                    dir('user-service') {
                        sh 'docker build -t shubhpatel2610/user-service .'
                    }
                    dir('doctor-service') {
                        sh 'docker build -t shubhpatel2610/doctor-service .'
                    }
                    dir('email-service') {
                        sh 'docker build -t shubhpatel2610/email-service .'
                    }
                    dir('archive-service') {
                        sh 'docker build -t shubhpatel2610/archive-service .'
                    }
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script{
                    docker.withRegistry('', "${DOCKERHUB_CRED_ID}") {
                    sh "docker push shubhpatel2610/frontend-service"
                    sh "docker push shubhpatel2610/auth-service"
                    sh "docker push shubhpatel2610/admin-service"
                    sh "docker push shubhpatel2610/user-service"
                    sh "docker push shubhpatel2610/doctor-service"
                    sh "docker push shubhpatel2610/email-service"
                    sh "docker push shubhpatel2610/archive-service"
                    }
                 }
            }
        }
 }
}
//  post {
//         success {
//             mail to: "${DEV_EMAIL}",
//                  subject: "Mini-Project Deployment SUCCESS: Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
//                  body: "The build was successful!"
//         }
//         failure {
//             mail to: "${DEV_EMAIL}",
//                  subject: "Mini-Project Deployment FAILURE: Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
//                  body: "The build failed."
//         }
//         always {
//             cleanWs()
//         }
//       }
//     }