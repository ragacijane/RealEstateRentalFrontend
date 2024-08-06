<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import DataTable from '@/components/DataTable.vue'
import { useAdminStore } from '@/store/adminStore'
import { onMounted, ref, watch } from 'vue'
import AdminLogin from '@/components/AdminLogin.vue'
import { useAuthStore } from '@/store/authStore'

const adminStore = useAdminStore()
const authStore = useAuthStore()

// Reactive reference to manage login state
const isNotLoggedIn = ref<boolean>(!authStore.authToken)

// On component mount, check if the user is logged in
onMounted(async () => {
  isNotLoggedIn.value = !authStore.authToken
})

// Watch for changes in authentication token and update state
watch(
  () => authStore.authToken,
  async (newToken) => {
    isNotLoggedIn.value = !newToken // Show dialog if no token
    if (!isNotLoggedIn.value) {
      await adminStore.fetchAndSetProperties()
      console.log(adminStore.allProperties)
    }
  },
  { immediate: true }
)
</script>

<template>
  <v-app>
    <!-- Header component -->
    <TheHeader />

    <!-- Main content area -->
    <DataTable />

    <!-- Footer component -->
    <TheFooter />

    <!-- Login dialog visibility controlled by `isLoggedIn` -->
    <v-dialog v-model="isNotLoggedIn" persistent>
      <AdminLogin />
    </v-dialog>
  </v-app>
</template>
