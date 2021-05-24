/** 
This is a dummy pipeline
*/

// Variables
def gitRepo = 'https://github.com/JGCdev/adidas-coding-challenge'
def branch = 'master'

//Pipeline
pipeline {
    agent { any }
    stages {

        stage('Pull application code') {
            git branch: branch, url: gitRepo
        }

        stage('Build') {
            // Dummy code
            steps {
                sh './build-script.sh'
            }
        }

        stage('Run sonarqube') {
            // Dummy code
            steps {
                sh './sonar-script.sh'
            }
        }

        stage('Run unit tests') {
            // Dummy code
            steps {
                sh './test-script.sh'
            }
        }

        stage('Build Production') {
            // Dummy code
            steps {
                sh './prod-build-script.sh'
            }
        }

        stage('Deploy') {
            // Dummy code
            steps {
                sh './deploy-script.sh'
            }
        }
    }
}
