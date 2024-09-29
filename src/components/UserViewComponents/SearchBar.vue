<script lang="ts">
import { allCategories } from '@/constants/constant'
import type { Property, SearchQueryParams } from '@/typesAndUtils/types'
import { defineComponent, ref, watch, type PropType } from 'vue'
import FilteringDialog from '@/components/UserViewComponents/FilterDialog.vue'

export default defineComponent({
  name: 'SearchBar',
  components: {
    FilteringDialog
  },
  props: {
    filterParams: {
      type: Object as PropType<SearchQueryParams>,
      required: true
    }
  },
  // emits: ['filter'],
  setup(props) {
    const filteredProperties = ref<Property[]>([])
    const localFilterParams = ref<SearchQueryParams>({ ...props.filterParams })
    const filterDialog = ref<boolean>(false)
    const sortDialog = ref<boolean>(false)

    const closeDialogAndApplyFilters = () => {
      filterDialog.value = false
    }

    // const filter = () => {
    //   emit('filter')
    // }

    watch(
      () => props.filterParams,
      (newParams) => {
        localFilterParams.value = newParams
      },
      { deep: true, immediate: true }
    )

    return {
      filteredProperties,
      allCategories,
      localFilterParams,
      filterDialog,
      sortDialog,
      closeDialogAndApplyFilters
    }
  }
})
</script>
<template>
  <v-container fluid width="100vw" class="pr-7.5">
    <v-row align="center">
      <v-col cols="12" sm="6" md="4">
        <p class="text-h4 font-weight-medium" size="large">
          {{
            localFilterParams.cat !== null &&
            localFilterParams.cat !== undefined &&
            [0, 1, 2].includes(localFilterParams.cat)
              ? allCategories[localFilterParams.cat].value.toUpperCase()
              : 'Pretraga'
          }}
        </p>
      </v-col>
      <v-col cols="0" sm="6" md="4"></v-col>
      <v-col cols="12" md="4" justify="end" align="end">
        <v-row>
          <v-col cols="12" sm="6">
            <v-btn
              color="primary"
              size="large"
              rounded
              :style="{ fontSize: '12px' }"
              width="100%"
              @click="() => (filterDialog = true)"
            >
              <v-icon class="pa-0 pr-5" left>mdi-filter-variant</v-icon>
              Filtriraj</v-btn
            >
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn color="primary" size="large" rounded width="100%" :style="{ fontSize: '12px' }">
              <v-icon class="pa-0 pr-5" left>mdi-sort</v-icon>
              Sortiraj</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <!-- SEARCH DIALOG -->
  <v-dialog v-model="sortDialog"></v-dialog>

  <!-- FILTER DIALOG -->
  <v-dialog v-model="filterDialog">
    <FilteringDialog
      :filter-params="localFilterParams"
      @apply-filters="closeDialogAndApplyFilters"
    />
  </v-dialog>
</template>
<style scoped></style>
