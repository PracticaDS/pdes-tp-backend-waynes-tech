#FROM node
#WORKDIR /usr/src/app
#COPY package*.json ./
#RUN yarn install
#COPY . .
#CMD [ "yarn", "start" ]

#FROM node
#COPY . .
#RUN yarn install
#ENV NODE_ENV=production
#ENV PORT=3001
#EXPOSE 3001
#CMD yarn start-prod

FROM node:11-alpine

# Directory
ARG APP_DIR=app/back

RUN mkdir -p ${APP_DIR}

WORKDIR ${APP_DIR}

# Install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

# For production 

# Copy project files
COPY . .

# Expose running port
#EXPOSE 3001

# Run the project
CMD ["yarn", "start"]