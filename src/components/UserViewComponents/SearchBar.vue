<script lang="ts">
import { allCategories } from '@/constants/constant'
import type { PropertyProjected, SearchQueryParams } from '@/typesAndUtils/types'
import { defineComponent, ref, watch, type PropType } from 'vue'
import FilteringDialog from '@/components/UserViewComponents/FilterDialog.vue'
import SortDialog from '@/components/UserViewComponents/SortDialog.vue'

export default defineComponent({
  name: 'SearchBar',
  components: {
    FilteringDialog,
    SortDialog
  },
  props: {
    filterParams: {
      type: Object as PropType<SearchQueryParams>,
      required: true
    },
    currentSortMethod: {
      type: String,
      default: 'none',
      required: true
    }
  },
  emits: ['sort'],
  setup(props, { emit }) {
    const filteredProperties = ref<PropertyProjected[]>([])
    const localFilterParams = ref<SearchQueryParams>({ ...props.filterParams })
    const filterDialog = ref<boolean>(false)
    const sortDialog = ref<boolean>(false)
    const localSortMethod = ref<string>(props.currentSortMethod)

    const closeFilterDialog = () => {
      filterDialog.value = false
    }
    const closeSortDialog = () => {
      sortDialog.value = false
    }

    const handleSortChange = (sortOption: string) => {
      closeSortDialog()
      localSortMethod.value = sortOption
      emit('sort', sortOption)
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
      allCategories,
      localFilterParams,
      filterDialog,
      sortDialog,
      localSortMethod,
      closeFilterDialog,
      handleSortChange,
      closeSortDialog
    }
  }
})
</script>
<template>
  <v-container fluid width="100vw" class="pr-7.5">
    <v-row align="center">
      <v-col cols="12" sm="6" md="4">
        <p class="text-h5 font-weight-medium" size="large">
          {{
            localFilterParams.cat !== null &&
            localFilterParams.cat !== undefined &&
            [0, 1, 2].includes(localFilterParams.cat)
              ? allCategories[localFilterParams.cat].value.toUpperCase()
              : 'PRETRAGA'
          }}
        </p>
      </v-col>
      <v-col cols="0" md="2"></v-col>
      <v-col cols="12" md="6" justify="end" align="end">
        <v-row>
          <v-col cols="12" sm="4">
            <v-btn
              color="primary"
              size="large"
              rounded
              :style="{ fontSize: '12px' }"
              width="100%"
              @click="() => (filterDialog = true)"
            >
              <v-icon class="pa-0 pr-5" left>mdi-fingerprint</v-icon>
              TRAŽI PO ID</v-btn
            >
          </v-col>
          <v-col cols="12" sm="4">
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
          <v-col cols="12" sm="4">
            <v-btn
              color="primary"
              size="large"
              rounded
              width="100%"
              :style="{ fontSize: '12px' }"
              @click="() => (sortDialog = true)"
            >
              <v-icon class="pa-0 pr-5" left>mdi-sort</v-icon>
              Sortiraj</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <!-- SORT DIALOG -->
  <v-dialog v-model="sortDialog">
    <SortDialog
      :current-sort="localSortMethod"
      @sort-changed="handleSortChange"
      @close-dialog="closeSortDialog"
    />
  </v-dialog>
  <!-- FILTER DIALOG -->
  <v-dialog v-model="filterDialog">
    <FilteringDialog :filter-params="localFilterParams" @close-dialog="closeFilterDialog" />
  </v-dialog>
</template>
<style scoped></style>
