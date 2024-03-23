FROM node:slim

ARG SRVPORT
ARG DBHOST
ARG DBNAME
ARG DBUSER
ARG DBPASSWD
ARG TOKEN_KEY

ENV SRVPORT="5057"

WORKDIR /app
COPY /backend/app/package.json .
RUN npm install
COPY /backend/app .
EXPOSE 5057
CMD [ "node", "server.js" ]