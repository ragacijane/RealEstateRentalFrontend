<script lang="ts">
import { defineComponent, onMounted, ref, type PropType } from 'vue'
import Image from '@/assets/backgroundImage.jpg'
import type { Property } from '@/typesAndUtils/types'
import { useRouter } from 'vue-router'
import { fetchThumbnail } from '@/services/dataService'
import ZoomedImageSlider from '@/components/UserViewComponents/ZoomedImageSlider.vue'

export default defineComponent({
  name: 'PropertyCard',
  props: {
    property: {
      type: Object as PropType<Property>
    }
  },
  components: {
    ZoomedImageSlider
  },
  setup(props) {
    const router = useRouter()
    const imageSliderDialog = ref<boolean>(false)
    const thumbURL = ref<string>('/noImage.jpg')
    const isLoading = ref<boolean>(false)

    const getPicUrl = async () => {
      const temp = props.property?.thumbnail

      if (temp !== undefined && temp.length > 0) {
        try {
          thumbURL.value = await fetchThumbnail(temp)
          if (!thumbURL.value) {
            thumbURL.value = '/noImage.jpg'
          }
        } catch (error) {
          console.error('Error fetching thumbnail:', error)
          thumbURL.value = '/noImage.jpg'
        }
      } else {
        thumbURL.value = '/noImage.jpg'
      }
    }

    onMounted(async () => {
      isLoading.value = true
      await getPicUrl()
      isLoading.value = false
    })

    return {
      Image,
      property: props.property,
      imageSliderDialog,
      router,
      thumbURL
    }
  }
})
</script>

<template>
  <v-card elevation="6">
    <v-img :src="thumbURL" class="align-end" height="180px" cover @click="imageSliderDialog = true">
      <v-card-title class="text-white"
        ><v-chip label variant="flat" color="primary" class="font-weight-medium"
          ><v-icon class="text-white pa-0 pr-2"> mdi-fingerprint </v-icon>
          {{ property?.idProperty }}</v-chip
        ></v-card-title
      >
    </v-img>
    <v-container class="pa-1" @click="() => router.push(`oglas/${property?.idProperty}`)">
      <p class="font-weight-medium text-h5 single-line-text" color="primary">
        <v-icon class="text-h5">mdi-map-marker</v-icon>
        {{ property?.title.split(',')[1] }}
      </p>
      <p class="font-weight-medium text-h6 single-line-text" color="primary">
        {{ property?.title.split(',')[0] }}
      </p>
      <v-divider></v-divider>
      <v-row class="pt-1" no-gutters>
        <v-col cols="9">
          <p class="font-weight-medium text-body-1">
            <v-icon size="small">mdi-square-off-outline</v-icon>
            {{ property?.structure.structureType }}
          </p></v-col
        >
      </v-row>
      <v-row no-gutters>
        <v-col cols>
          <p class="font-weight-medium text-body-1">
            <v-icon size="small">mdi-set-square</v-icon>{{ property?.squareFootage }} m²
          </p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <p class="font-weight-medium text-body-1" color="primary">
            <v-icon size="small">mdi-bed-king</v-icon> {{ property?.equipment.equipmentType }}
          </p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" class="d-flex align-center justify-end"
          ><v-chip label variant="flat" color="primary"
            ><p class="font-weight-medium">{{ property?.price }} €</p>
          </v-chip></v-col
        >
      </v-row>
    </v-container>
    <v-dialog
      v-model="imageSliderDialog"
      opacity="0.8"
      eager
      theme="light"
      class="pa-0 ma-0"
      height="100vh"
    >
      <div class="pa-0 pt-1 ma-0">
        <ZoomedImageSlider :property-id="property?.idProperty || 0" />
      </div>
      <v-btn icon @click="imageSliderDialog = false" class="close-button" elevation="0">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-dialog>
  </v-card>
</template>
<style scoped>
.v-card {
  width: 250px;
  height: 360px;
}
.single-line-text {
  white-space: nowrap; /* Prevent the text from wrapping onto multiple lines */
  overflow: hidden; /* Hide any overflowing text */
  text-overflow: ellipsis; /* Add ellipsis ("...") if the text is too long */
  font-size: clamp(12px, 3vw, 20px); /* Dynamically scale font size */
}
.close-button {
  position: absolute;
  top: 0px;
  right: 1px;
  background-color: transparent !important; /* Transparent background */
  color: white !important; /* White icon color */
}
</style>
