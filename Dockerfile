#  Dockerfile for Node Express Backend

FROM node:10.16-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

ARG NODE_ENV=production

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]





# FROM node:16
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# ARG NODE_ENV=production
# COPY client ./
# RUN npm install --prefix client && npm run build --prefix client
# COPY . .
# EXPOSE 5000
# CMD [ "node", "server.js" ]
