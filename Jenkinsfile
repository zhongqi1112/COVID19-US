pipeline {
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
        stage('Deploy') {
            steps {
                sh 'rm -rf docs'
                sh 'mv dist docs'
                sh 'git add .'
                sh 'git commit -m "Deploy" '
                sh 'git push'
            }
        }
    }
}
