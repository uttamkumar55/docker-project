pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'to-do-app-2025'     // You can change this to any name you want
        DOCKER_TAG = 'latest'               // Tag can be latest or any version like 'v1.0'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // If Jenkins isn't pulling it already from SCM, uncomment this:
                 git 'https://github.com/uttamkumar55/docker-project.git'
                echo 'Code checked out automatically by Jenkins'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('Run Docker Container') {
            steps {
                echo 'Running Docker container...'
                sh '''
                    docker stop flask-todo-container || true
                    docker rm flask-todo-container || true
                    docker run -d --name flask-todo-container -p 5000:5000 $DOCKER_IMAGE:$DOCKER_TAG
                '''
            }
        }
    }
}
