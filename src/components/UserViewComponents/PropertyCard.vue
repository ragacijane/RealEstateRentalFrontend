<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Image from '@/assets/backgroundImage.jpg'
import type { Property } from '@/typesAndUtils/types'

export default defineComponent({
  name: 'PropertyCard',
  props: {
    property: {
      type: Object as PropType<Property>
    }
  },
  setup(prop) {
    return {
      Image
    }
  }
})
</script>

<template>
  <v-card elevation="6">
    <v-img :src="Image" class="align-end" height="220px" cover>
      <v-card-title class="text-white"
        ><v-chip label variant="flat" color="primary"
          ><v-icon class="text-white pa-0 pr-2"> mdi-fingerprint </v-icon>ID</v-chip
        ></v-card-title
      >
    </v-img>
    <v-container>
      <p class="font-weight-medium text-h6" color="primary">Medium weight text.</p>
    </v-container>
  </v-card>
</template>
<style scoped>
.v-card {
  width: 300px;
  height: 450px;
}
</style>
