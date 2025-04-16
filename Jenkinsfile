pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'to-do-app-2025'
        DOCKER_TAG = 'latest'
        CONTAINER_NAME = 'loving_ardinghelli'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat "docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% ."
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "Running Docker container..."
                bat """
                    docker stop %CONTAINER_NAME% || exit 0
                    docker rm %CONTAINER_NAME% || exit 0
                    docker run -d --name %CONTAINER_NAME% -p 5000:5000 %DOCKER_IMAGE%:%DOCKER_TAG%
                """
            }
        }
    }
}
