<script lang="ts">
import { fetchImages } from '@/services/dataService'
import type { PictureDto } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'ZoomedImageSlider',
  props: {
    propertyId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const images = ref<PictureDto[]>([])
    const isLoading = ref<boolean>(false)
    onMounted(async () => {
      isLoading.value = true
      images.value = await fetchImages(props.propertyId)
      isLoading.value = false
    })
    return {
      images,
      isLoading
    }
  }
})
</script>
<template>
  <div v-if="isLoading" class="text-center">
    <v-progress-circular size="120" color="primary" indeterminate />
  </div>
  <v-carousel v-else show-arrows="hover" cycle hide-delimiter-background>
    <v-carousel-item v-for="(img, index) in images" :key="index" :src="img.pictureUrl">
    </v-carousel-item>
  </v-carousel>
</template>
