<script lang="ts">
import { testfetchImages } from '@/services/dataService'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const images = ref<string[]>([])

    onMounted(async () => {
      images.value = await testfetchImages(1)
      console.log(images)
    })

    return {
      images
    }
  }
})
</script>

<template>
  <main>
    <h1>User View</h1>
    <div>
      <div v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Image" class="image-item" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.image-item {
  width: 300px;
  height: auto;
  margin: 10px;
}
</style>
