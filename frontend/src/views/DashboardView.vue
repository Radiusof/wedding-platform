<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- En-tête du dashboard -->
      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg p-8">
          <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">
              Bienvenue, {{ authStore.userFullName }} !
            </h1>
            <p class="text-lg text-gray-600 mb-8">
              Gérez votre mariage en toute simplicité
            </p>
          </div>

          <!-- Cartes des fonctionnalités -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <!-- Playlists -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-pink-500 rounded-md flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Playlists</h3>
                    <p class="text-sm text-gray-500">Gérez vos playlists de mariage</p>
                  </div>
                </div>
                <div class="mt-4">
                  <router-link
                    to="/playlists"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 transition-colors duration-200"
                  >
                    Voir mes playlists
                  </router-link>
                </div>
              </div>
            </div>

            <!-- FAQ -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">FAQ</h3>
                    <p class="text-sm text-gray-500">Questions fréquemment posées</p>
                  </div>
                </div>
                <div class="mt-4">
                  <router-link
                    to="/faq"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                  >
                    Consulter la FAQ
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Lieux -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Lieux</h3>
                    <p class="text-sm text-gray-500">Trouvez votre lieu de réception</p>
                  </div>
                </div>
                <div class="mt-4">
                  <button
                    disabled
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
                  >
                    Bientôt disponible
                  </button>
                </div>
              </div>
            </div>

            <!-- Hébergement -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Hébergement</h3>
                    <p class="text-sm text-gray-500">Réservez pour vos invités</p>
                  </div>
                </div>
                <div class="mt-4">
                  <button
                    disabled
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
                  >
                    Bientôt disponible
                  </button>
                </div>
              </div>
            </div>

            <!-- Notifications -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Notifications</h3>
                    <p class="text-sm text-gray-500">Restez informé</p>
                  </div>
                </div>
                <div class="mt-4">
                  <button
                    disabled
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
                  >
                    Bientôt disponible
                  </button>
                </div>
              </div>
            </div>

            <!-- Paramètres -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Paramètres</h3>
                    <p class="text-sm text-gray-500">Configurez votre compte</p>
                  </div>
                </div>
                <div class="mt-4">
                  <router-link
                    to="/settings"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-200"
                  >
                    Configurer
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/AppHeader.vue'

const authStore = useAuthStore()
</script> 