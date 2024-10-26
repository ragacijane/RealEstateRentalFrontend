<script lang="ts">
import { fetchImages } from '@/services/dataService'
import type { Pictures } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'ZoomedImageSlider',
  props: {
    propertyId: {
      type: Number,
      required: true
    },
    images: {
      type: Array as PropType<Pictures[]>,
      required: false
    }
  },
  setup(props) {
    const images = ref<Pictures[]>([])
    const isLoading = ref<boolean>(false)
    onMounted(async () => {
      isLoading.value = true
      if (props.images && props.images.length > 0) {
        images.value = props.images
      } else {
        images.value = await fetchImages(props.propertyId)
      }
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
  <v-carousel v-else show-arrows="hover" hide-delimiter-background height="90vh">
    <v-carousel-item
      v-for="(img, index) in images"
      :key="index"
      :src="img.picturePath"
      height="90vh"
    >
    </v-carousel-item>
  </v-carousel>
</template>
