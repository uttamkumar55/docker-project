# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .  

# Install dependencies without cache
RUN pip install --no-cache-dir -r requirements.txt  

# Copy the rest of the app files
COPY . . 

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]

