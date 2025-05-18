pipeline {
    agent any
    triggers { 
        githubPush() 
    }
    environment {
        GITHUB_CRED_ID = '8a04b3d0-fc77-45de-a0d0-260eb63cc33c'
        DOCKERHUB_CRED_ID = '476d8d59-73e9-4eb2-82b2-83113de121d1'
        GITHUB_REPO_URL = 'https://github.com/devenkapadia/CareConnect.git'
        DEV_EMAIL = 'shubhp2610@gmail.com'

        DOCKER_USER = 'shubhpatel2610'
        FRONTEND_IMAGE = "${DOCKER_USER}/frontend-service"
        AUTH_IMAGE = "${DOCKER_USER}/auth-service"
        ADMIN_IMAGE = "${DOCKER_USER}/admin-service"
        USER_IMAGE = "${DOCKER_USER}/user-service"
        DOCTOR_IMAGE = "${DOCKER_USER}/doctor-service"
        EMAIL_IMAGE = "${DOCKER_USER}/email-service"
        ARCHIVE_IMAGE = "${DOCKER_USER}/archive-service"
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
                        sh 'mvn clean -DskipTests=true package'
                    }
                    dir('admin-service') {
                        sh 'mvn clean -DskipTests=true package'
                    }
                    dir('user-service') {
                        sh 'mvn clean -DskipTests=true package'
                    }
                    dir('doctor-service') {
                        sh 'mvn clean -DskipTests=true package'
                    }
                }
            }
        }
        stage('Building Docker Images') {
            steps {
                script {
                    dir('frontend') {
                        sh "docker build -t ${FRONTEND_IMAGE} ."
                    }
                    dir('auth-service') {
                        sh "docker build -t ${AUTH_IMAGE} ."
                    }
                    dir('admin-service') {
                        sh "docker build -t ${ADMIN_IMAGE} ."
                    }
                    dir('user-service') {
                        sh "docker build -t ${USER_IMAGE} ."
                    }
                    dir('doctor-service') {
                        sh "docker build -t ${DOCTOR_IMAGE} ."
                    }
                    dir('email-service') {
                        sh "docker build -t ${EMAIL_IMAGE} ."
                    }
                    dir('archive-service') {
                        sh "docker build -t ${ARCHIVE_IMAGE} ."
                    }
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKERHUB_CRED_ID}") {
                        sh "docker push ${FRONTEND_IMAGE}"
                        sh "docker push ${AUTH_IMAGE}"
                        sh "docker push ${ADMIN_IMAGE}"
                        sh "docker push ${USER_IMAGE}"
                        sh "docker push ${DOCTOR_IMAGE}"
                        sh "docker push ${EMAIL_IMAGE}"
                        sh "docker push ${ARCHIVE_IMAGE}"
                    }
                }
            }
        }
        stage('Run Ansible Playbook') {
            steps {
                script {
                    withEnv(["ANSIBLE_HOST_KEY_CHECKING=False"]) {
                        withCredentials([string(credentialsId: 'ansible-vault-password', variable: 'VAULT_PASSWORD')]) {
                            dir('ansible') {
                                sh '''
                                    echo "$VAULT_PASSWORD" > vault_pass.txt
                                    ansible-playbook -i inventory.ini playbook.yaml --vault-password-file vault_pass.txt
                                    rm vault_pass.txt
                                '''
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            mail to: "${DEV_EMAIL}",
                 subject: "Mini-Project Deployment SUCCESS: Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The build was successful!"
        }
        failure {
            mail to: "${DEV_EMAIL}",
                 subject: "Mini-Project Deployment FAILURE: Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The build failed."
        }
        always {
            cleanWs()
        }
    }
}
