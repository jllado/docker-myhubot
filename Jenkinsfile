pipeline {
    agent any
    stages {
        stage ('Tests') {
            steps {
                sh './test.sh'
            }
        }
        stage ('Delete previous') {
            steps {
                sh './uninstall.sh'
            }
        }
        stage ('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
