FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Now copy the rest of your application
COPY . .

# Ensure OpenSSL legacy provider for Webpack compatibility
ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 3000

CMD ["npm", "start"]
