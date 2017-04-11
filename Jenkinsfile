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
    post { 
        success { 
            script {
                sh 'curl -s ' + "http://myhubot_hubot_1:1234/build/${env.JOB_NAME}/success"
            }
        }
        unstable { 
            script {
                sh 'curl -s ' + "http://myhubot_hubot_1:1234/build/${env.JOB_NAME}/unstable"
            }
        }
        failure { 
            script {
                sh 'curl -s ' + "http://myhubot_hubot_1:1234/build/${env.JOB_NAME}/failure"
            }
        }
    }
}
