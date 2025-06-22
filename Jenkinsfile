pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git credentialsId: 'github-creds', url: 'https://github.com/Krish942/Pokemon_Website-React-JS-.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'   // or your build command
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['ec2-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@<EC2-IP> 'cd ~/app-folder && git pull && npm install && pm2 restart all'
                    '''
                }
            }
        }
    }
}
