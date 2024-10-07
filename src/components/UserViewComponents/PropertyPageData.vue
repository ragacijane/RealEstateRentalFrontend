<script lang="ts">
import type { PropertyProjected, Tag } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, type PropType } from 'vue'
import { allCategories } from '@/constants/constant'
import { useDataStore } from '@/store/dataStore'
import { fetchTagsFromProperty } from '@/services/dataService'

export default defineComponent({
  name: 'PropertyPageData',
  props: {
    property: {
      type: Object as PropType<PropertyProjected>,
      required: true
    }
  },

  setup(props) {
    const dataStore = useDataStore()
    const allTags = ref<Tag[]>([])
    const propertyTags = ref<number[]>([])
    const isLoading = ref<boolean>(true)

    onMounted(async () => {
      isLoading.value = true
      await dataStore.fetchTagsDataStore()
      allTags.value = dataStore.allTags
      propertyTags.value = await fetchTagsFromProperty(props.property.idProperty)
      isLoading.value = false
    })

    return {
      allCategories,
      allTags,
      propertyTags,
      isLoading
    }
  }
})
</script>

<template>
  <div v-if="isLoading" class="text-center">
    <v-progress-circular size="120" color="primary" indeterminate />
  </div>
  <v-container v-else fluid>
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
      <v-col cols="6" md="4" lg="2">
        <v-text-field
          readonly
          focused
          label="Sprat"
          v-model="property.floor"
          variant="plain"
          width="130px"
        >
          <template v-slot:prepend-inner>
            <v-icon> mdi-elevator-passenger-outline </v-icon>
          </template></v-text-field
        ></v-col
      >
      <v-col cols="6" md="4" lg="2">
        <v-text-field readonly focused label="Grejanje" v-model="property.heating" variant="plain">
          <template v-slot:prepend-inner>
            <v-icon> mdi-heating-coil</v-icon>
          </template></v-text-field
        >
      </v-col>
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
          label
        >
          {{ allTags[item]?.tagName || '' }}
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>
