<script setup lang="ts">
import TheHeader from '@/components/UserViewComponents/TheHeader.vue'
import apoloneImage from '@/assets/colorLogoTextVer.svg'
import { useRouter } from 'vue-router'
const router = useRouter()
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
