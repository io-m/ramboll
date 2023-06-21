# Specify a base image
FROM node:14

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# TypeScript compilation
RUN npm run build

# Set environment variable
ENV NODE_ENV production

# Default port to expose
EXPOSE 3000

# Run the application
CMD [ "node", "dist/index.js" ]
