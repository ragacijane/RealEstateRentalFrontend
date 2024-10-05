<script setup lang="ts">
import TheHeader from '@/components/UserViewComponents/TheHeader.vue'
import { fetchProperty } from '@/services/dataService'
import type { Property } from '@/typesAndUtils/types'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apoloneImage from '@/assets/colorLogoTextVer.svg'
import PropertyPageData from '@/components/UserViewComponents/PropertyPageData.vue'

const property = ref<Property | null>(null)
const route = useRoute()
const isLoading = ref<boolean>(false)
const router = useRouter()
const error = ref<boolean>(true)

const getProperty = async () => {
  const id = route.params.id ? parseInt(route.params.id as string) : 0
  if (id > 0) {
    property.value = await fetchProperty(id)
    if (property.value !== null && property.value !== undefined) {
      error.value = false
    }
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
  <v-container fluid class="bacground-container">
    <v-empty-state
      v-if="error"
      headline="&nbsp;"
      title="Nema rezultata."
      text="Nažalost nemamo oglase koji odgovaraju navedenim kriterijumima."
      :image="apoloneImage"
    >
      <v-btn variant="flat" color="primary" @click="() => router.push('/')">Povratak</v-btn>
    </v-empty-state>

    <div v-else class="card-wrapper pr-3">
      <v-card max-width="900px" elevation="20">
        <PropertyPageData :property="property!" />
      </v-card>
    </div>
  </v-container>
</template>
<style scoped>
.background-container {
  position: relative;
  width: 100vw;
  overflow: hidden;
}

.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: calc(100vh - 68px); */
}
</style>
