FROM node:slim

ARG SRVPORT
ARG DBHOST
ARG DBNAME
ARG DBUSER
ARG DBPASSWD
ARG TOKEN_KEY

ENV SRVPORT="5057"

WORKDIR /app
COPY /app/package.json /app
RUN npm install
COPY /app /app
EXPOSE 5057
CMD [ "node", "server.js" ]