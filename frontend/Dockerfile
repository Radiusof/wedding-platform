# Dockerfile pour le frontend Vue.js

FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Production stage avec serveur léger
FROM nginx:alpine AS production

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port
EXPOSE 8080

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"] 