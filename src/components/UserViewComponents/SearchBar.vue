<script lang="ts">
import { allCategories } from '@/constants/constant'
import type { Property, SearchQueryParams } from '@/typesAndUtils/types'
import { defineComponent, ref, watch, type PropType } from 'vue'

export default defineComponent({
  name: 'SearchBar',
  props: {
    filterParams: {
      type: Object as PropType<SearchQueryParams>,
      required: true
    }
  },
  emits: ['filter'],
  setup(props, { emit }) {
    const filteredProperties = ref<Property[]>([])
    const localFilterParams = ref<SearchQueryParams>(props.filterParams)

    const filter = () => {
      emit('filter', props.filterParams)
    }

    watch(
      () => props.filterParams,
      (newParams) => {
        localFilterParams.value = newParams
      },
      { deep: true, immediate: true }
    )

    return {
      filteredProperties,
      filter,
      allCategories,
      filterParams: localFilterParams
    }
  }
})
</script>
<template>
  <v-container fluid width="100vw" class="pr-8">
    <v-row class="pb-4" align="center">
      <v-col cols="12" sm="6" md="4">
        <p class="text-h4 font-weight-medium">
          {{
            filterParams.cat !== null &&
            filterParams.cat !== undefined &&
            [0, 1, 2].includes(filterParams.cat)
              ? allCategories[filterParams.cat].value
              : 'Pretraga'
          }}
        </p>
      </v-col>
      <v-col cols="12" sm="6" md="4"></v-col>
      <v-col cols="12" md="4" justify="end" align="end">
        <v-row>
          <v-col cols="12" sm="6">
            <v-btn color="primary" size="large" rounded width="100%">
              <v-icon class="pa-0 pr-5" left>mdi-filter-variant</v-icon>
              Filtriraj</v-btn
            >
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn color="primary" size="large" rounded width="100%">
              <v-icon class="pa-0 pr-5" left>mdi-sort</v-icon>
              Sortiraj</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>
