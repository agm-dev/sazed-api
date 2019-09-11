FROM node:10.16.0-alpine

# This defines the port exposed by the container
# and the one where the node app will listen.
# To define it, build the image like this:
#
# docker build --build-arg PORT=3000 --tag namespace/image:latest --tag namespace/image:v1 .
#
ARG PORT
ENV PORT=${PORT}

RUN mkdir -p /home/node-apps
WORKDIR /home/node-apps

COPY package.json .
RUN npm i --only=production

COPY . .

# Heroku will ignore the EXPOSE, and instead will asign a random port,
# mapped to the port 80. You only have to be sure that the node process
# looks on process.env.PORT for the port value.
EXPOSE ${PORT}

CMD [ "npm", "run", "prod" ]
