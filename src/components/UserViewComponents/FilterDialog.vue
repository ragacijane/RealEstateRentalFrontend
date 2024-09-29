<script lang="ts">
import { useDataStore } from '@/store/dataStore'
import type {
  Borough,
  Equipment,
  SearchQueryParams,
  Structure,
  Tag,
  Types
} from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, watchEffect, type PropType } from 'vue'
import { allCategories } from '@/constants/constant'
import { useRouter } from 'vue-router'
import { createQueryParams } from '@/typesAndUtils/utils'

export default defineComponent({
  name: 'FilteringDialog',
  props: {
    filterParams: {
      type: Object as PropType<SearchQueryParams>,
      required: true
    }
  },
  setup(props, { emit }) {
    const localFilterParams = ref<SearchQueryParams>({ ...props.filterParams })
    const dataStore = useDataStore()
    const allTags = ref<Tag[]>(dataStore.allTags)
    const allTypes = ref<Types[]>(dataStore.allTypes)
    const allBoroughs = ref<Borough[]>(dataStore.allBoroughs)
    const allStructures = ref<Structure[]>(dataStore.allStructures)
    const allEquips = ref<Equipment[]>(dataStore.allEquips)
    const isLoading = ref(true)

    const router = useRouter()

    const applyFilters = (filters: SearchQueryParams) => {
      const filteredQueryParams = createQueryParams(filters)
      emit('close-dialog')
      router.push({ path: '/pretraga', query: filteredQueryParams })
    }
    const closeDialog = () => {
      emit('close-dialog')
    }
    onMounted(async () => {
      await dataStore.fetchData()
    })

    watchEffect(() => {
      if (
        dataStore.allTypes.length &&
        dataStore.allTags.length &&
        dataStore.allBoroughs.length &&
        dataStore.allStructures.length &&
        dataStore.allEquips.length
      ) {
        allTags.value = dataStore.allTags
        allTypes.value = dataStore.allTypes
        allBoroughs.value = dataStore.allBoroughs
        allStructures.value = dataStore.allStructures
        allEquips.value = dataStore.allEquips

        // Set loading to false once all data is available
        isLoading.value = false
      } else {
        isLoading.value = true
      }
    })

    return {
      localFilterParams,
      allCategories,
      allTags,
      allEquips,
      allTypes,
      allBoroughs,
      allStructures,
      isLoading,
      applyFilters,
      closeDialog
    }
  }
})
</script>

<template>
  <v-container fluid>
    <div class="card-wrapper">
      <v-card class="pa-4 card-content" elevation="20" width="600px">
        <p class="font-weight-medium text-h5 s">&nbsp;</p>
        <v-btn
          icon
          @click="closeDialog"
          class="close-btn"
          aria-label="Close"
          variant="flat"
          color="primary"
          size="small"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <div v-if="isLoading" class="text-center">
          <v-progress-circular size="120" color="primary" indeterminate />
        </div>
        <div class="scrollable-content" v-else>
          <v-row class="pa-2">
            <v-col cols="12" md="4">
              <v-select
                variant="outlined"
                color="primary"
                clearable
                v-model="localFilterParams.cat"
                label="Kategorija"
                :items="allCategories"
                item-title="value"
                item-value="id"
                ><template v-slot:selection="{ item, index }">
                  <v-chip variant="flat" color="primary" v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip></template
                >
              </v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                variant="outlined"
                color="primary"
                clearable
                v-model="localFilterParams.idTy"
                label="Vrsta"
                :items="allTypes"
                item-title="typeName"
                item-value="idType"
                ><template v-slot:selection="{ item, index }">
                  <v-chip variant="flat" color="primary" v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip></template
                >
              </v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                variant="outlined"
                color="primary"
                clearable
                multiple
                v-model="localFilterParams.idBors"
                label="Lokacija"
                :items="allBoroughs"
                item-title="boroughName"
                item-value="idBorough"
                ><template v-slot:selection="{ item, index }">
                  <v-chip variant="flat" color="primary">
                    <span>{{ item.title }}</span>
                  </v-chip></template
                >
              </v-select>
            </v-col>
          </v-row>
          <v-row class="pa-2">
            <v-col cols="12" md="6">
              <v-select
                variant="outlined"
                color="primary"
                clearable
                v-model="localFilterParams.idSt"
                label="Struktura"
                :items="allStructures"
                item-title="structureType"
                item-value="idStructure"
                ><template v-slot:selection="{ item, index }">
                  <v-chip variant="flat" color="primary" v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip></template
                >
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                variant="outlined"
                color="primary"
                clearable
                v-model="localFilterParams.idEq"
                label="Nameštenost"
                :items="allEquips"
                item-title="equipmentType"
                item-value="idEquipment"
                ><template v-slot:selection="{ item, index }">
                  <v-chip variant="flat" color="primary" v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip></template
                >
              </v-select>
            </v-col>
          </v-row>
          <v-row class="pa-2">
            <v-col cols="12" md="6">
              <v-chip label variant="flat" color="primary">CENA</v-chip>
              <v-row class="pt-4" justify="space-evenly">
                <v-col cols="6">
                  <v-text-field
                    variant="outlined"
                    v-model="localFilterParams.prMin"
                    density="compact"
                    label="Od"
                    class="primary-input"
                    type="number"
                    color="primary"
                    suffix="€"
                  />
                </v-col>
                <v-col cols="6"
                  ><v-text-field
                    variant="outlined"
                    v-model="localFilterParams.prMax"
                    density="compact"
                    label="Do"
                    class="primary-input"
                    type="number"
                    color="primary"
                    suffix="€"
                /></v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-chip label variant="flat" color="primary">POVRSINA</v-chip>
              <v-row class="pt-4" justify="space-evenly">
                <v-col cols="6"
                  ><v-text-field
                    variant="outlined"
                    v-model="localFilterParams.sqMin"
                    density="compact"
                    label="Od"
                    class="primary-input"
                    type="number"
                    color="primary"
                    suffix="m²"
                /></v-col>
                <v-col cols="6">
                  <v-text-field
                    variant="outlined"
                    v-model="localFilterParams.sqMax"
                    density="compact"
                    label="Do"
                    class="primary-input"
                    type="number"
                    color="primary"
                    suffix="m²"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="pa-2">
            <v-col cols="12" class="d-flex justify-center align-center">
              <v-btn variant="flat" color="primary" @click="() => applyFilters(localFilterParams)"
                >Pretraga</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </v-container>
</template>
<style scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 68px);
}
.card-content {
  position: relative;
  display: flex;
  flex-direction: column;
  /* height: 80%; */
  max-height: 80%;
}

.scrollable-content {
  flex: 1; /* Allows content to grow and take up remaining space */
  overflow-y: auto; /* Enable scrolling only for the content */
  overflow-x: hidden;
  padding-bottom: 16px; /* Provide some space at the bottom */
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
