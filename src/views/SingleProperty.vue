<script setup lang="ts">
import TheHeader from '@/components/UserViewComponents/TheHeader.vue'
import { fetchProperty } from '@/services/dataService'
import type { Property } from '@/typesAndUtils/types'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apoloneImage from '@/assets/colorLogoTextVer.svg'

const property = ref<Property | null>(null)
const route = useRoute()
const isLoading = ref<boolean>(false)
const router = useRouter()

const getProperty = async () => {
  const id = route.query.id ? parseInt(route.query.id as string) : 0

  if (id > 0) {
    property.value = await fetchProperty(id)
  } else {
    console.error('Invalid property ID')
  }
}

onMounted(() => {
  getProperty()
})
</script>

<template>
  <TheHeader />
  <v-container fluid>
    <v-empty-state
      headline="&nbsp;"
      title="Nema rezultata."
      text="Nažalost nemamo oglase koji odgovaraju navedenim kriterijumima."
      :image="apoloneImage"
    >
      <v-btn variant="flat" color="primary" @click="() => router.push('/')">Povratak</v-btn>
    </v-empty-state>
  </v-container>
</template>
