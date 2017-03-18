pipeline {
    agent any
    stages {
        stage ('Initialize') {
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
