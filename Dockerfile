# Use the official Node.js 14 LTS image as the base image
FROM node:18.17.0


# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy only the necessary files for building the application
COPY nuxt.config.ts .
COPY .env .
COPY app.vue .
COPY components ./components
COPY pages ./pages
COPY server ./server
COPY prisma ./prisma

#RUN npx prisma migrate deploy

# Build the Nuxt.js application
RUN npm run build

# Expose the port on which the application will run
ENV HOST 0.0.0.0
EXPOSE 3000

# Start the Nuxt.js application
CMD [ "npm", "run", "start" ]
