# Base image
FROM node:18.16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock if using Yarn
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Expose any necessary ports
EXPOSE 3000

# Set environment variables if required
# ENV NODE_ENV production

# Build the code (if necessary)
# RUN npm run build

# Specify the command to start your application
CMD [ "npm", "start" ]
