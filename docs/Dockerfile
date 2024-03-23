FROM nginx:latest
RUN mkdir /app
WORKDIR /app
COPY /files .
COPY nginx.conf /etc/nginx/nginx.conf
USER nginx