<script lang="ts">
import type { PictureDto, PropertyProjected, Tag } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, type PropType } from 'vue'
import { allCategories } from '@/constants/constant'
import { useDataStore } from '@/store/dataStore'
import { fetchImages, fetchTagsFromProperty } from '@/services/dataService'
import ZoomedImageSlider from '../shared/ZoomedImageSlider.vue'

export default defineComponent({
  name: 'PropertyPageData',
  props: {
    property: {
      type: Object as PropType<PropertyProjected>,
      required: true
    }
  },
  components: { ZoomedImageSlider },
  setup(props) {
    const dataStore = useDataStore()
    const allTags = ref<Tag[]>([])
    const propertyTags = ref<number[]>([])
    const isLoading = ref<boolean>(true)
    const images = ref<PictureDto[]>([])
    const imageSliderDialog = ref<boolean>(false)

    onMounted(async () => {
      isLoading.value = true
      await dataStore.fetchTagsDataStore()
      allTags.value = dataStore.allTags
      propertyTags.value = await fetchTagsFromProperty(props.property.idProperty)
      images.value = await fetchImages(props.property.idProperty)
      isLoading.value = false
    })

    return {
      allCategories,
      allTags,
      propertyTags,
      isLoading,
      images,
      imageSliderDialog
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
        <v-img :src="images[0]?.pictureUrl" height="100%" cover />
      </v-col>
      <v-col v-if="$vuetify.display.smAndUp" cols="0" sm="4" class="pa-1">
        <v-row>
          <v-col cols="12" class="pb-1"
            ><v-img :src="images[1]?.pictureUrl" height="100%" cover
          /></v-col>
          <v-col cols="12" class="pt-1"
            ><v-img :src="images[2]?.pictureUrl" height="100%" cover
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
      <v-col>
        <p class="font-weight-medium text-h6">
          {{ allCategories[property.category].value }} - {{ property.type.typeName }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" lg="2">
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
      <v-col cols="12" sm="6" lg="3"
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
      <v-col cols="12" md="4" lg="3">
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
      <v-col cols="6" md="4" lg="3">
        <v-text-field readonly focused label="Grejanje" v-model="property.heating" variant="plain">
          <template v-slot:prepend-inner>
            <v-icon> mdi-heating-coil</v-icon>
          </template></v-text-field
        >
      </v-col>
      <v-col cols="6" md="4" lg="1">
        <v-text-field
          readonly
          focused
          label="Sprat"
          v-model="property.floor"
          variant="plain"
          width="40px"
        >
          <template v-slot:prepend-inner>
            <v-icon> mdi-elevator-passenger-outline </v-icon>
          </template></v-text-field
        ></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="12"><p class="font-weight-medium text-h6">Opis:</p></v-col>
      <v-col cols="12"
        ><p class="font-weight-medium text-body-1">
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
