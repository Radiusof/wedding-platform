<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Mes Playlists</h1>
          
          <div class="text-center py-12">
            <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Gestion des playlists</h3>
            <p class="text-gray-600 mb-6">
              Cette fonctionnalité sera bientôt disponible. Vous pourrez créer et gérer vos playlists de mariage.
            </p>
            <button
              disabled
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
            >
              Bientôt disponible
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script> 