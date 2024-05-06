# Image par défaut comprenant nodejs en version allégé
FROM node:20.10.0-alpine as build

# Création du répertoire de travail
RUN mkdir -p /app

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie du fichier contenant la configuration du projet
COPY ./package*.json ./

# Installation des dépendances
RUN npm install

# Copie des fichier du projet
COPY . ./

# Build la stack vite
RUN npm run build

# utilisation de NGINX
FROM nginx:alpine

# Copie du projet build
COPY --from=build /app/dist /usr/share/nginx/html

# Copie de NGINX Config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Exposition du port
EXPOSE 80

# Commande d'éxécution du serveur
CMD ["nginx", "-g", "daemon off;"]
