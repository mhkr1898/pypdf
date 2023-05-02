#& fetch image from microsoft
FROM mcr.microsoft.com/devcontainers/python:0-3.11

# Add to image
## Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app 
## Install nodejs and npm
RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - \
    && apt-get install -y nodejs

## Install Debian updates and packages
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    && apt-get clean

## Install Node.js packages
COPY src/package.json .
COPY src/package-lock.json .
RUN npm install



