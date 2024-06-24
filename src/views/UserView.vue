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
    <v-sheet class="mx-auto" elevation="8" max-width="600">
      <v-slide-group class="pa-4" center-active show-arrows>
        <v-slide-group-item
          v-for="(image, index) in images"
          :key="index"
          v-slot="{ isSelected, toggle }"
        >
          <v-card
            :color="isSelected ? 'grey-lighten-1 transparent' : 'grey-lighten-1'"
            class="ma-4"
            height="200"
            width="120"
            @click="toggle"
          >
            <div class="d-flex fill-height align-center justify-center">
              <v-scale-transition>
                <v-icon
                  v-if="isSelected"
                  color="white"
                  icon="mdi-close-circle-outline"
                  size="48"
                ></v-icon>
              </v-scale-transition>
              <v-img :src="image" alt="Image" class="image-item" />
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </main>
</template>

<style scoped>
.image-item {
  width: 150px;
  height: auto;
  margin: 10px;
}
</style>
