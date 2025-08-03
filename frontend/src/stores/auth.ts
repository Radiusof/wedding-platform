import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userFullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`
  })

  // Actions
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', credentials)
      const { token: authToken, user: userData } = response.data

      // Sauvegarder le token
      token.value = authToken
      localStorage.setItem('token', authToken)

      // Sauvegarder les données utilisateur
      user.value = userData

      // Configurer axios pour les futures requêtes
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

      return userData
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur de connexion'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const register = async (registerData: RegisterData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', registerData)
      const { token: authToken, user: userData } = response.data

      // Sauvegarder le token
      token.value = authToken
      localStorage.setItem('token', authToken)

      // Sauvegarder les données utilisateur
      user.value = userData

      // Configurer axios pour les futures requêtes
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

      return userData
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur d\'inscription'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  const fetchUser = async () => {
    if (!token.value) return null

    try {
      const response = await axios.get('http://localhost:3000/api/auth/me')
      user.value = response.data
      return response.data
    } catch (err: any) {
      // Si le token est invalide, déconnecter l'utilisateur
      if (err.response?.status === 401) {
        logout()
      }
      throw err
    }
  }

  const initializeAuth = async () => {
    if (token.value) {
      // Configurer axios avec le token existant
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      
      // Récupérer les données utilisateur
      try {
        await fetchUser()
      } catch (err) {
        // En cas d'erreur, déconnecter l'utilisateur
        logout()
      }
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,

    // Computed
    isAuthenticated,
    userFullName,

    // Actions
    login,
    register,
    logout,
    fetchUser,
    initializeAuth,
    clearError,
  }
}) 