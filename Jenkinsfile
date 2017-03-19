pipeline {
    agent any
    stages {
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
