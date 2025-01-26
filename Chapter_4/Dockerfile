# use an offical node.js runtime as a parent image
FROM node:22-alpine

# Set the working dir in the container
WORKDIR /app

# Copy the package.json and the package-lock.json diles to the container
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the rest of the apps code
COPY . .

# Expose the port that the app runs on
EXPOSE 5000

# Define the cmd to run the app
CMD ["node", "./src/server.js"]