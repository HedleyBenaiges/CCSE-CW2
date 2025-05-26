# Base Docker image
FROM node:24-alpine

# Working directory in container
WORKDIR /app

# Copy dependencies to working dir, so they can be cached separately
# Changes to the source code won't invalidate this layer
COPY package*.json ./
RUN npm ci

# Copy the rest files to container
COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]

# CMD [ "tail", "-f", "/dev/null" ] # Debug command

