<script setup lang="ts">
import { fetchProperty } from '@/services/dataService'
import type { PropertyProjected } from '@/typesAndUtils/types'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apoloneImage from '@/assets/colorLogoTextVer.svg'
import PropertyPageData from '@/components/UserViewComponents/PropertyPageData.vue'

const property = ref<PropertyProjected | null>(null)
const route = useRoute()
const router = useRouter()

const getProperty = async () => {
  const id = route.params.id ? parseInt(route.params.id as string) : 0
  if (id > 0) {
    property.value = await fetchProperty(id)
    if (property.value !== null && property.value !== undefined) {
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
  <v-container fluid class="bacground-container" min-height="100vh">
    <div v-if="property != null && property != undefined" class="card-wrapper">
      <v-card width="900px" elevation="20">
        <PropertyPageData :property="property" />
      </v-card>
    </div>
    <v-empty-state
      v-else
      headline="&nbsp;"
      title="Nema rezultata."
      text="Nažalost nemamo oglase koji odgovaraju navedenim kriterijumima."
      :image="apoloneImage"
    >
      <v-btn variant="flat" color="primary" @click="() => router.push('/')">Povratak</v-btn>
    </v-empty-state>
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
.wrapper.dark-body .v-card {
  background: linear-gradient(45deg, black 0%, rgb(56, 56, 56) 50%, black 100%) !important;
}
</style>
