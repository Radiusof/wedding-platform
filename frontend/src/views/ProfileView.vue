<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Mon Profil</h1>
          
          <div class="text-center py-12">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Gestion du profil</h3>
            <p class="text-gray-600 mb-6">
              Cette fonctionnalité sera bientôt disponible. Vous pourrez modifier vos informations personnelles.
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