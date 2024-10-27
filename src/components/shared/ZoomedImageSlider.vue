<script lang="ts">
import { fetchImages } from '@/services/dataService'
import type { Pictures } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, watch, type PropType } from 'vue'

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
    const activeIndex = ref(0) // Track the active item index

    onMounted(async () => {
      isLoading.value = true
      if (props.images && props.images.length > 0) {
        images.value = props.images
      } else {
        images.value = await fetchImages(props.propertyId)
      }
      isLoading.value = false
    })

    watch(images, (newImages) => {
      if (newImages.length) {
        activeIndex.value = 0 // Reset to the first item when images load
      }
    })
    return {
      images,
      isLoading,
      activeIndex
    }
  }
})
</script>
<template>
  <div v-if="isLoading" class="text-center">
    <v-progress-circular size="120" color="primary" indeterminate />
  </div>
  <v-carousel
    v-else
    v-model="activeIndex"
    show-arrows="hover"
    hide-delimiter-background
    height="90vh"
  >
    <v-carousel-item
      v-for="(img, index) in images"
      :key="index"
      :src="img.picturePath"
      height="90vh"
    >
    </v-carousel-item>
  </v-carousel>
</template>
