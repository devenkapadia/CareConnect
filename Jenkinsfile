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
        stage('Clean & Build auth-service') {
            steps {
                script {
                    dir('auth-service') {
                        sh 'mvn clean -DskipTests=true  package'
                    }
                }
            }
        }
        stage('Clean & Build admin-service') {
            steps {
                script {
                    dir('admin-service') {
                        sh 'mvn clean -DskipTests=true  package'
                    }
                }
            }
        }
        stage('Clean & Build user-service') {
            steps {
                script {
                    dir('user-service') {
                        sh 'mvn clean -DskipTests=true  package'
                    }
                }
            }
        }
        stage('Clean & Build doctor-service') {
            steps {
                script {
                    dir('doctor-service') {
                        sh 'mvn clean -DskipTests=true  package'
                    }
                }
            }
        }
        stage('Build auth-service docker image') {
            steps {
                script {
                    dir('auth-service') {
                        sh 'docker build -t shubhpatel2610/auth-service .'
                    }
                }
            }
        }
        stage('Build admin-service docker image') {
            steps {
                script {
                    dir('admin-service') {
                        sh 'docker build -t shubhpatel2610/admin-service .'
                    }
                }
            }
        }
        stage('Build user-service docker image') {
            steps {
                script {
                    dir('user-service') {
                        sh 'docker build -t shubhpatel2610/user-service .'
                    }
                }
            }
        }
        stage('Build doctor-service docker image') {
            steps {
                script {
                    dir('doctor-service') {
                        sh 'docker build -t shubhpatel2610/doctor-service .'
                    }
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script{
                    docker.withRegistry('', "${DOCKERHUB_CRED_ID}") {
                    sh "docker push shubhpatel2610/auth-service"
                    sh "docker push shubhpatel2610/admin-service"
                    sh "docker push shubhpatel2610/user-service"
                    sh "docker push shubhpatel2610/doctor-service"
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