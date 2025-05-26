FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]

# CMD [ "/tail", "-f", "/dev/null" ] # Debug command