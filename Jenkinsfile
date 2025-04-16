pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'to-do-app-2025'         // Your custom Docker image name
        DOCKER_TAG = 'latest'                   // You can change this to a version like 'v1.0'
        CONTAINER_NAME = 'loving_ardinghelli'   // Your actual Docker container name
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Checking out code from GitHub...'
                git 'https://github.com/uttamkumar55/docker-project.git'
                echo 'Code checkout complete.'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
                echo "Docker image $DOCKER_IMAGE:$DOCKER_TAG built successfully."
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "Stopping old container if it exists: $CONTAINER_NAME"
                sh 'docker stop $CONTAINER_NAME || true'

                echo "Removing old container if it exists: $CONTAINER_NAME"
                sh 'docker rm $CONTAINER_NAME || true'

                echo "Starting new container: $CONTAINER_NAME"
                sh """
                    docker run -d \
                        --name $CONTAINER_NAME \
                        -p 5000:5000 \
                        $DOCKER_IMAGE:$DOCKER_TAG
                """

                echo "Container $CONTAINER_NAME is now running!"
            }
        }
    }
}
