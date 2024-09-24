<script lang="ts">
import { login } from '@/services/authService'
import type { LoginForm } from '@/typesAndUtils/types'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AdminLogin',
  setup() {
    const loginData = ref<LoginForm>({ username: '', password: '' })
    const userError = ref<string | null>(null)
    const passError = ref<string | null>(null)
    const loginPressed = ref<boolean>(false)

    const router = useRouter()
    const handleLogin = async () => {
      if (validateForm()) {
        try {
          loginPressed.value = true
          await login(loginData.value.username, loginData.value.password)
          router.push('/admin') // Navigate to the admin page after successful login
        } catch (error) {
          console.error('Login failed:', error)
          userError.value = 'Incorrect username or password'
          passError.value = null
        }
      }
      loginPressed.value = false
    }

    const validateForm = () => {
      userError.value = !loginData.value.username ? 'Username je obavezan!' : null
      passError.value = !loginData.value.password ? 'Password je obavezan!' : null
      return !userError.value && !passError.value
    }
    return {
      loginData,
      userError,
      passError,
      loginPressed,
      //function
      handleLogin
    }
  }
})
</script>

<template>
  <v-card title="Dobrodošli">
    <div v-if="loginPressed" class="text-center">
      <v-progress-circular size="120" color="primary" indeterminate></v-progress-circular>
      <h2 class="primary--text">Molimo sačekajte 😊</h2>
    </div>
    <v-card-text v-else>
      <form @submit.prevent="handleLogin">
        <v-text-field
          v-model="loginData.username"
          label="Username"
          :error-messages="userError"
          :rules="[(v: string) => !!v || 'Username je obavezan!']"
        ></v-text-field>
        <v-text-field
          v-model="loginData.password"
          label="Password"
          type="password"
          :error-messages="passError"
          :rules="[(v: string) => !!v || 'Password je obavezan!']"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="loginPressed" type="submit" color="primary" variant="flat">Login</v-btn>
        </v-card-actions>
      </form>
    </v-card-text>
  </v-card>
</template>
<style scoped>
.v-card {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.v-card-text {
  display: flex;
  flex-direction: column;
}

.v-btn {
  margin-top: 20px;
}
</style>
