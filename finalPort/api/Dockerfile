# Using the official Python Image
FROM python:3.10-slim

# set the working directory
WORKDIR /app

# Copy requirements.txt file and install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# set environment variables
ENV FLASK_APP=app.py

# Expose the port to use
EXPOSE 5000

# On the terminal, run the application
CMD ["flask", "run", "--host=0.0.0.0"]