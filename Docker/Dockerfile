FROM python:3.9-slim

# Install curl for health checks and debugging
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy all files except those in .dockerignore
COPY . .

# Add debug environment variable
ENV FLASK_DEBUG=1

EXPOSE 5000 8000

# Use explicit Python command to see errors
CMD ["python", "app.py"]