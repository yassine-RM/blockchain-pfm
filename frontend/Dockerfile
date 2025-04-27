# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install Create-React-App globally
RUN npm install -g create-react-app

RUN create-react-app .

RUN npm install

EXPOSE 3000

# Default command: Start a shell
CMD [ "npm", "start" ]
