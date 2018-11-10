FROM node:8.11.2

# Create app directory
WORKDIR /usr/app


# Install app dependencies
COPY package*.json ./
#RUN npm install && \
#    npm install -g pushstate-server

# Build and optimize react app
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

# defined in package.json
CMD [ "npm", "start" ]

# docker build -t euromillion .
# docker run -p 3000:3000 -d euromillion