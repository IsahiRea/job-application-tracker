# Node Image
FROM node:14

# Working Directory
WORKDIR /app

# Copy package .json and install dependencies
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Set the port to run on
EXPOSE 5000

# Comand to run the app
CMD ["npm", "run", "dev"]