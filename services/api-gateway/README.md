# API Gateway - Wedding Platform

## Description

L'API Gateway est le point d'entrée central de la plateforme Wedding. Il gère le routage des requêtes vers les différents microservices, l'authentification JWT, et fournit des fonctionnalités de sécurité et de monitoring.

## Fonctionnalités

### 🔐 Authentification
- Validation JWT pour les routes protégées
- Stratégie Passport JWT configurée
- Gestion des tokens Bearer

### 🛣️ Routage
- Proxy automatique vers les microservices
- Configuration centralisée des services
- Gestion des erreurs de service

### 🛡️ Sécurité
- Rate limiting (100 requêtes/minute)
- CORS configuré
- Validation des données d'entrée
- Protection contre les attaques CSRF

### 📊 Monitoring
- Health checks
- Informations sur les services
- Logs structurés

## Services Routés

| Service | Port | Base Path | Auth Requise |
|---------|------|-----------|--------------|
| User Service | 3001 | `/auth`, `/users` | Partiel |
| FAQ Service | 3002 | `/faqs` | Non |
| Location Service | 3003 | `/locations` | Non |
| Accommodation Service | 3004 | `/accommodations` | Non |
| Playlist Service | 3005 | `/playlists` | Oui |
| Notification Service | 3006 | `/notifications` | Oui |

## Endpoints

### Informations
- `GET /api` - Informations sur l'API Gateway
- `GET /api/health` - Health check
- `GET /api/services` - Liste des services disponibles

### Routage des Services
- `GET/POST/PUT/DELETE /api/{service-name}/*` - Routage vers les microservices

## Configuration

### Variables d'environnement

```env
PORT=3000
JWT_SECRET=your-jwt-secret-here
MONGODB_URI=mongodb://admin:password@mongodb:27017/wedding_db?authSource=admin
REDIS_URL=redis://redis:6379
```

### Rate Limiting

- **TTL**: 60 secondes
- **Limite**: 100 requêtes par IP
- **Headers**: `X-RateLimit-*`

## Développement

### Installation

```bash
cd services/api-gateway
npm install
```

### Démarrage en développement

```bash
npm run start:dev
```

### Build

```bash
npm run build
npm run start:prod
```

## Tests

```bash
# Tests unitaires
npm run test

# Tests E2E
npm run test:e2e

# Couverture
npm run test:cov
```

## Structure du Projet

```
src/
├── auth/                 # Module d'authentification
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── proxy/               # Module de proxy
│   ├── proxy.module.ts
│   ├── proxy.service.ts
│   └── proxy.controller.ts
├── health/              # Health checks
│   └── health.controller.ts
├── app.module.ts        # Module principal
├── main.ts             # Point d'entrée
└── redis.provider.ts   # Configuration Redis
```

## Exemples d'utilisation

### Authentification

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Utilisation du token
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Routage vers les services

```bash
# FAQ Service
curl http://localhost:3000/api/faqs

# Location Service
curl http://localhost:3000/api/locations

# Playlist Service (avec auth)
curl http://localhost:3000/api/playlists \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Monitoring

### Health Check

```bash
curl http://localhost:3000/api/health
```

Réponse :
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "service": "api-gateway",
  "version": "1.0.0"
}
```

### Services Info

```bash
curl http://localhost:3000/api/services
```

## Déploiement

L'API Gateway est configuré pour être déployé avec Docker :

```bash
docker-compose up api-gateway
```

## Troubleshooting

### Service indisponible

Si un microservice est indisponible, l'API Gateway retournera :

```json
{
  "message": "Service 'service-name' is unavailable"
}
```

### Erreur d'authentification

```json
{
  "message": "Authentication required"
}
```

### Rate limit dépassé

```json
{
  "message": "ThrottlerException: Too Many Requests"
}
```
