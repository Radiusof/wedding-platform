<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Rejoignez notre plateforme de mariage
        </p>
      </div>

      <!-- Formulaire -->
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Prénom et Nom -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="sr-only">Prénom</label>
              <input
                id="firstName"
                v-model="form.firstName"
                name="firstName"
                type="text"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="Prénom"
                :disabled="authStore.isLoading"
              />
            </div>
            <div>
              <label for="lastName" class="sr-only">Nom</label>
              <input
                id="lastName"
                v-model="form.lastName"
                name="lastName"
                type="text"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="Nom"
                :disabled="authStore.isLoading"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="sr-only">Adresse email</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
              placeholder="Adresse email"
              :disabled="authStore.isLoading"
            />
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
              placeholder="Mot de passe"
              :disabled="authStore.isLoading"
            />
          </div>

          <!-- Confirmation du mot de passe -->
          <div>
            <label for="confirmPassword" class="sr-only">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
              placeholder="Confirmer le mot de passe"
              :disabled="authStore.isLoading"
            />
          </div>
        </div>

        <!-- Validation du mot de passe -->
        <div v-if="form.password && form.confirmPassword" class="text-sm">
          <div v-if="!passwordsMatch" class="text-red-600">
            Les mots de passe ne correspondent pas
          </div>
          <div v-else-if="form.password.length < 6" class="text-yellow-600">
            Le mot de passe doit contenir au moins 6 caractères
          </div>
          <div v-else class="text-green-600">
            ✓ Mot de passe valide
          </div>
        </div>

        <!-- Message d'erreur -->
        <div v-if="authStore.error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-800">
                {{ authStore.error }}
              </p>
            </div>
          </div>
        </div>

        <!-- Bouton d'inscription -->
        <div>
          <button
            type="submit"
            :disabled="authStore.isLoading || !isFormValid"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span v-if="authStore.isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ authStore.isLoading ? 'Création du compte...' : 'Créer un compte' }}
          </button>
        </div>

        <!-- Liens -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Déjà un compte ?
            <router-link
              to="/login"
              class="font-medium text-pink-600 hover:text-pink-500 transition-colors duration-200"
            >
              Se connecter
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Validation du formulaire
const passwordsMatch = computed(() => form.value.password === form.value.confirmPassword)
const isFormValid = computed(() => {
  return form.value.firstName && 
         form.value.lastName && 
         form.value.email && 
         form.value.password && 
         form.value.confirmPassword &&
         passwordsMatch.value &&
         form.value.password.length >= 6
})

const handleRegister = async () => {
  if (!isFormValid.value) return

  try {
    await authStore.register({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password
    })
    
    // Redirection vers le dashboard après inscription
    router.push('/dashboard')
  } catch (error) {
    // L'erreur est déjà gérée dans le store
    console.error('Erreur d\'inscription:', error)
  }
}

onMounted(() => {
  // Si l'utilisateur est déjà connecté, le rediriger
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
  
  // Initialiser l'authentification
  authStore.initializeAuth()
})
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style> 