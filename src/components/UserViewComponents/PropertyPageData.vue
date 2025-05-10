<script lang="ts">
import type { Pictures, PropertyProjected, Tag } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, type PropType } from 'vue'
import { allCategories } from '@/constants/constant'
import { useDataStore } from '@/store/dataStore'
import { fetchImages, fetchTagsFromProperty } from '@/services/dataService'
import ZoomedImageSlider from '../shared/ZoomedImageSlider.vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import axios from 'axios' // Import Axios

export default defineComponent({
  name: 'PropertyPageData',
  props: {
    property: {
      type: Object as PropType<PropertyProjected>,
      required: true
    }
  },
  components: {
    ZoomedImageSlider,
    GoogleMap,
    Marker
  },
  setup(props) {
    const dataStore = useDataStore()
    const allTags = ref<Tag[]>([])
    const propertyTags = ref<number[]>([])
    const isLoading = ref<boolean>(true)
    const images = ref<Pictures[]>([])
    const imageSliderDialog = ref<boolean>(false)
    const snackbar = ref(false)
    const snackbarMessage = ref('')
    const latitude = ref<number | null>(null)
    const longitude = ref<number | null>(null)
    const googleKey = ref<string>(import.meta.env.VITE_MAP_KEY)

    const getCoordinates = async (address: string) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleKey.value}`

      try {
        const response = await axios.get(url)
        if (response.data.status === 'OK') {
          const location = response.data.results[0].geometry.location
          latitude.value = location.lat
          longitude.value = location.lng
        } else {
          console.error('Geocoding error:', response.data.status)
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error)
      }
    }

    onMounted(async () => {
      isLoading.value = true
      await dataStore.fetchTagsDataStore()
      allTags.value = dataStore.allTags
      propertyTags.value = await fetchTagsFromProperty(props.property.idProperty)
      images.value = await fetchImages(props.property.idProperty)

      await getCoordinates(props.property.title)

      isLoading.value = false
    })

    const shareContent = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Check this out!',
            text: 'Here’s something interesting I found.',
            url: window.location.href // Current page URL or any URL you'd like to share
          })
        } catch (error) {
          console.error('Error sharing:', error)
        }
      } else {
        alert('Sharing is not supported on this browser.')
      }
    }

    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href)
        snackbarMessage.value = 'Link uspešno kopiran!'
        snackbar.value = true
        setTimeout(() => {
          snackbar.value = false
        }, 1000)
      } catch (error) {
        console.error('Failed to copy:', error)
      }
    }

    return {
      allCategories,
      allTags,
      propertyTags,
      isLoading,
      images,
      imageSliderDialog,
      snackbar,
      snackbarMessage,
      shareContent,
      copyLink,
      latitude,
      longitude,
      googleKey
    }
  }
})
</script>

<template>
  <div v-if="isLoading" class="text-center">
    <v-progress-circular size="120" color="primary" indeterminate />
  </div>
  <v-container v-else fluid>
    <v-row @click="imageSliderDialog = true">
      <v-col cols="12" sm="8" class="pa-1">
        <v-img :src="images[0]?.picturePath" height="100%" cover />
      </v-col>
      <v-col v-if="$vuetify.display.smAndUp" cols="0" sm="4" class="pa-1">
        <v-row>
          <v-col cols="12" class="pb-1"
            ><v-img :src="images[1]?.picturePath" height="100%" cover
          /></v-col>
          <v-col cols="12" class="pt-1"
            ><v-img :src="images[2]?.picturePath" height="100%" cover
          /></v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-chip label variant="flat" color="primary" class="font-weight-medium"
          ><v-icon class="text-white pa-0 pr-2"> mdi-fingerprint </v-icon>
          {{ property.idProperty }}</v-chip
        >
      </v-col>
      <v-col class="d-flex align-center justify-end">
        <v-chip label variant="flat" color="primary"
          ><p class="font-weight-medium">{{ property.price }} €</p>
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        ><p class="font-weight-medium text-h5">
          <v-icon class="text-h5">mdi-map-marker</v-icon>
          {{ property.title }}
        </p></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="9" class="mt-1">
        <p class="font-weight-medium text-h6">
          {{ allCategories[property.category].value }} - {{ property.type.typeName }}
        </p>
      </v-col>
      <v-col cols="3" class="d-flex align-center justify-end">
        <v-btn size="small" class="mr-3" @click="copyLink" icon="mdi-content-copy" />
        <v-btn size="small" @click="shareContent" icon="mdi-share-variant" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" md="4">
        <v-text-field
          readonly
          focused
          label="Kvadratura"
          v-model="property.squareFootage"
          variant="plain"
          suffix="m²"
          width="97px"
        >
          <template v-slot:prepend-inner>
            <v-icon> mdi-home </v-icon>
          </template></v-text-field
        ></v-col
      >
      <v-col cols="6" md="4"
        ><v-text-field
          readonly
          focused
          label="Struktura"
          v-model="property.structure.structureName"
          variant="plain"
        >
          <template v-slot:prepend-inner>
            <v-icon> mdi-square-off-outline </v-icon>
          </template></v-text-field
        ></v-col
      >
      <v-col cols="6" md="4">
        <v-text-field
          readonly
          focused
          label="Nameštenost"
          v-model="property.equipment.equipmentName"
          variant="plain"
        >
          <template v-slot:prepend-inner>
            <v-icon> mdi-bed-king </v-icon>
          </template></v-text-field
        ></v-col
      >
      <v-col cols="6" md="4">
        <v-text-field readonly focused label="Grejanje" v-model="property.heating" variant="plain">
          <template v-slot:prepend-inner>
            <v-icon> mdi-heating-coil</v-icon>
          </template></v-text-field
        >
      </v-col>
      <v-col cols="6" md="4">
        <v-text-field readonly focused label="Sprat" v-model="property.floor" variant="plain">
          <template v-slot:prepend-inner>
            <v-icon> mdi-elevator-passenger-outline </v-icon>
          </template></v-text-field
        ></v-col
      >
      <v-col cols="6" md="4">
        <v-text-field
          readonly
          focused
          label="Kupatila"
          v-model="property.bathrooms"
          variant="plain"
        >
          <template v-slot:prepend-inner>
            <v-icon> mdi-shower</v-icon>
          </template></v-text-field
        ></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="12"><p class="font-weight-medium text-h6">Opis:</p></v-col>
      <v-col cols="12"
        ><p class="font-weight-medium text-body-1" style="white-space: pre-line">
          {{ property.description }}
        </p></v-col
      >
      <v-col cols="12"><p class="font-weight-medium text-h6">Posebne pogodnosti:</p></v-col>
      <v-col cols="12">
        <v-chip
          v-for="(item, index) in propertyTags"
          :key="index"
          class="ma-2"
          color="primary"
          variant="flat"
          label
        >
          {{ allTags[item - 1]?.tagName || '' }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <google-map
          :api-key="googleKey"
          :center="{ lat: latitude, lng: longitude }"
          :zoom="12"
          style="width: 100%; height: 400px"
        >
          <Marker :options="{ position: { lat: latitude, lng: longitude } }" />
        </google-map>
      </v-col>
    </v-row>
    <v-dialog
      v-model="imageSliderDialog"
      opacity="0.8"
      eager
      theme="light"
      class="pa-0 ma-0"
      height="100vh"
    >
      <div class="pa-0 pt-1 ma-0">
        <ZoomedImageSlider :property-id="property.idProperty" :images="images" />
      </div>
      <v-btn icon @click="imageSliderDialog = false" class="close-button" elevation="0">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-dialog>
    <v-snackbar v-model="snackbar" width="80" color="primary">
      <p class="text-center">{{ snackbarMessage }}</p>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.close-button {
  position: absolute;
  top: 0px;
  right: 1px;
  background-color: transparent !important; /* Transparent background */
  color: white !important; /* White icon color */
}
</style>
