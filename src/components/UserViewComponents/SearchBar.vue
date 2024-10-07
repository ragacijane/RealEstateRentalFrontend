<script lang="ts">
import { allCategories } from '@/constants/constant'
import type { PropertyProjected, SearchQueryParams } from '@/typesAndUtils/types'
import { defineComponent, ref, watch, type PropType } from 'vue'
import FilteringDialog from '@/components/UserViewComponents/FilterDialog.vue'
import SortDialog from '@/components/UserViewComponents/SortDialog.vue'
import router from '@/router'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

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
    const searchIdDialog = ref<boolean>(false)
    const searchId = ref<string | null>(null)
    const router = useRouter()
    const theme = useTheme()

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
      closeSortDialog,
      searchIdDialog,
      searchId,
      router,
      theme
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
              @click="() => (searchIdDialog = true)"
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
    <v-dialog v-model="sortDialog" class="flex align-center justify-centers">
      <SortDialog
        :current-sort="localSortMethod"
        @sort-changed="handleSortChange"
        @close-dialog="closeSortDialog"
      />
    </v-dialog>
    <v-dialog v-model="filterDialog">
      <FilteringDialog :filter-params="localFilterParams" @close-dialog="closeFilterDialog" />
    </v-dialog>
    <v-dialog v-model="searchIdDialog">
      <div class="d-flex align-center justify-center">
        <v-card width="450px" :class="theme.current.value.dark ? 'dark-background' : ''">
          <v-card-title class="pb-4"
            >&nbsp;
            <v-btn
              icon
              @click="
                () => {
                  searchId = null
                  searchIdDialog = false
                }
              "
              class="close-btn"
              aria-label="Close"
              color="primary"
              variant="flat"
              size="small"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
              focused
              variant="outlined"
              v-model="searchId"
              placeholder="Unesite ID ovde"
              class="primary-input"
              type="number"
              hide-spin-buttons
            >
              <template v-slot:prepend>
                <v-chip variant="flat" color="primary"
                  ><v-icon class="icon-bold text-white"> mdi-fingerprint </v-icon></v-chip
                >
              </template>
            </v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="flat" color="primary" @click="router.push(`oglas/${searchId}`)"
                >Primeni</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
  </v-container>
</template>
<style scoped>
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.dark-background {
  background: linear-gradient(45deg, black 0%, rgb(56, 56, 56) 50%, black 100%) !important;
}
</style>
