<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">FAQ</h1>
          
          <div class="space-y-6">
            <div class="border-b border-gray-200 pb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                Comment créer une playlist ?
              </h3>
              <p class="text-gray-600">
                Allez dans la section Playlists et cliquez sur "Créer une nouvelle playlist". 
                Vous pourrez ensuite ajouter des chansons depuis Deezer.
              </p>
            </div>

            <div class="border-b border-gray-200 pb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                Comment rechercher des chansons ?
              </h3>
              <p class="text-gray-600">
                Utilisez la barre de recherche dans la section Playlists pour trouver 
                des chansons par titre, artiste ou album.
              </p>
            </div>

            <div class="border-b border-gray-200 pb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                Puis-je partager mes playlists ?
              </h3>
              <p class="text-gray-600">
                Oui, vous pouvez rendre vos playlists publiques pour les partager 
                avec vos invités.
              </p>
            </div>

            <div class="pb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                Comment modifier mon profil ?
              </h3>
              <p class="text-gray-600">
                Accédez à la section Paramètres depuis le menu utilisateur 
                pour modifier vos informations personnelles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script> 