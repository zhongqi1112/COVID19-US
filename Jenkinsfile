pipeline {
    environment {
        registry = "stephenwangmath/covid19us"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }

    agent any

    tools {nodejs 'nodejs'}

    stages {
        stage('Clear Workspace') {
            steps {
                deleteDir()
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Setup') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Build Image') {
            steps {
                script {
                  dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        stage('Deploy Iamge') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Remove Unused docker image') {
            steps{
                sh "docker rmi $covid19us:$BUILD_NUMBER"
                sh "docker rmi $covid19us:latest"
            }
        }
    }
}
