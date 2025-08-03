# Dockerfile pour chaque service NestJS
# À copier dans chaque dossier services/*/Dockerfile

FROM node:18-alpine AS builder

# Installer les dépendances système
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY tsconfig*.json ./

# Installer toutes les dépendances (incluant devDependencies pour le build)
RUN npm install --legacy-peer-deps && npm cache clean --force

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copier les fichiers de l'étape de build
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

# Switcher vers l'utilisateur non-root
USER nestjs

# Exposer le port (à adapter selon le service)
EXPOSE 3000

# Santé check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Démarrer l'application
CMD ["node", "dist/main.js"]