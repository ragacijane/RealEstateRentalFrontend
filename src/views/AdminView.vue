<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import DataTable from '@/components/DataTable.vue'
import { useAdminStore } from '@/store/adminStore'
import { onMounted } from 'vue'
const adminStore = useAdminStore()

onMounted(async () => {
  await adminStore.fetchAndSetProperties()
})
</script>

<template>
  <v-app>
    <TheHeader />

    <DataTable />

    <TheFooter />
  </v-app>
</template>
