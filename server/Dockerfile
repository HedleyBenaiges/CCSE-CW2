# Use base Docker image: node:20-alpine (Linux distro w/ node installed)
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy json to working dir // So not all dependependencies are cached
COPY package*.json ./
RUN npm ci

# Copy the rest files to the working dir
COPY . .

# Expose port 5000
EXPOSE 5000

CMD [ "npm", "start" ]
# CMD [ "tail", "-f", "/dev/null" ]
