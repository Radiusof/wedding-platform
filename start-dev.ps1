# Script de démarrage pour l'environnement de développement
Write-Host "🚀 Démarrage de l'environnement de développement Wedding Platform" -ForegroundColor Green

# Vérifier si Docker est en cours d'exécution
Write-Host "📋 Vérification de Docker..." -ForegroundColor Yellow
try {
    docker version | Out-Null
    Write-Host "✅ Docker est en cours d'exécution" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker n'est pas en cours d'exécution. Veuillez démarrer Docker Desktop." -ForegroundColor Red
    exit 1
}

# Nettoyer les conteneurs existants
Write-Host "🧹 Nettoyage des conteneurs existants..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml down

# Démarrer MongoDB et Redis
Write-Host "🗄️ Démarrage de MongoDB et Redis..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up -d mongodb redis

# Attendre que les services soient prêts
Write-Host "⏳ Attente du démarrage des services..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Vérifier le statut des services
Write-Host "📊 Statut des services:" -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml ps

Write-Host "✅ Services de base démarrés avec succès!" -ForegroundColor Green
Write-Host "📝 Pour démarrer les services applicatifs, utilisez:" -ForegroundColor Cyan
Write-Host "   npm run dev (dans chaque dossier de service)" -ForegroundColor White
Write-Host "   ou" -ForegroundColor White
Write-Host "   docker-compose up -d (pour tous les services)" -ForegroundColor White 