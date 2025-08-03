<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo et navigation principale -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">Wedding Platform</span>
          </router-link>

          <!-- Navigation principale -->
          <nav class="hidden md:flex ml-10 space-x-8">
            <router-link
              to="/dashboard"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-pink-600"
            >
              Dashboard
            </router-link>
            <router-link
              to="/playlists"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-pink-600"
            >
              Playlists
            </router-link>
            <router-link
              to="/faq"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-pink-600"
            >
              FAQ
            </router-link>
          </nav>
        </div>

        <!-- Menu utilisateur -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>

          <!-- Menu utilisateur -->
          <div class="relative">
            <button
              @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center space-x-2 p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <div class="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">
                  {{ userInitials }}
                </span>
              </div>
              <span class="hidden md:block text-sm font-medium text-gray-700">
                {{ authStore.userFullName }}
              </span>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
            >
              <router-link
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                @click="isUserMenuOpen = false"
              >
                Mon profil
              </router-link>
              <router-link
                to="/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                @click="isUserMenuOpen = false"
              >
                Paramètres
              </router-link>
              <hr class="my-1">
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <div v-if="isMobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        <router-link
          to="/dashboard"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          active-class="text-pink-600 bg-pink-50"
          @click="isMobileMenuOpen = false"
        >
          Dashboard
        </router-link>
        <router-link
          to="/playlists"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          active-class="text-pink-600 bg-pink-50"
          @click="isMobileMenuOpen = false"
        >
          Playlists
        </router-link>
        <router-link
          to="/faq"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          active-class="text-pink-600 bg-pink-50"
          @click="isMobileMenuOpen = false"
        >
          FAQ
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isUserMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)

// Initiales de l'utilisateur
const userInitials = computed(() => {
  if (!authStore.user) return 'U'
  return `${authStore.user.firstName.charAt(0)}${authStore.user.lastName.charAt(0)}`.toUpperCase()
})

const handleLogout = () => {
  authStore.logout()
  isUserMenuOpen.value = false
  router.push('/login')
}

// Fermer les menus en cliquant à l'extérieur
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style> 