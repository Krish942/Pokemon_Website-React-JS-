pipeline {
    agent any

    environment {
        IMAGE_NAME = 'pokemon-react'
        CONTAINER_NAME = 'pokemon-react-container'
    }

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Krish942/Pokemon_Website-React-JS-.git'
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Docker Run') {
            steps {
                sh '''
                    docker rm -f $CONTAINER_NAME || true
                    docker run -d -p 3000:80 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }
}
