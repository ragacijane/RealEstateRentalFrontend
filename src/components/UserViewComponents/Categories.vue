<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import stan from '@/assets/stan.jpg'
import poslovna_zgrada from '@/assets/poslovna_zgrada.jpg'
import kuca from '@/assets/kuca.jpg'
import poslovni_prostor from '@/assets/poslovni_prostor.jpg'
import lokal from '@/assets/lokal.jpg'
import zemljiste from '@/assets/zemljiste.jpg'

export default defineComponent({
  name: 'Categories',
  setup() {
    const images = [stan, poslovna_zgrada, kuca, poslovni_prostor, lokal, zemljiste]
    const titles = ['STAN', 'POSLOVNA ZGRADA', 'KUCA', 'POSLOVNI PROSTOR', 'LOKAL', 'ZEMLJISTE']
    const idTypes = [1, 3, 5, 2, 4, 9]
    const router = useRouter()
    return {
      router,
      images,
      titles,
      idTypes
    }
  }
})
</script>

<template>
  <v-container fluid class="pt-5">
    <v-row justify="center" no-gutters>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        cols="12"
        sm="6"
        lg="4"
        class="d-flex justify-center pa-1 pb-7"
      >
        <v-card
          elevation="16"
          style="cursor: pointer; max-width: 400px; width: 100%; margin: 0"
          @click="() => router.push(`/pretraga?idTy=${idTypes[index]}`)"
        >
          <!-- Image inside the card -->
          <v-img :src="image" height="100%" max-height="380px" cover />

          <!-- Text under the image -->
          <v-card-text class="text-center">
            <span> {{ titles[index] }}</span>
            <!-- Add your custom text here -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
