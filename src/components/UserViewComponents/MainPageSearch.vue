<script lang="ts">
import { useDataStore } from '@/store/dataStore'
import type {
  Borough,
  Equipment,
  SearchPropertyParams,
  SearchQueryParams,
  Structure,
  Tag,
  Types
} from '@/typesAndUtils/types'
import { createQueryParams, getEmptyParams } from '@/typesAndUtils/utils'
import { defineComponent, ref, watchEffect } from 'vue'
import { allCategories } from '@/constants/constant'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainPageSearch',
  setup() {
    const step = ref<number>(1)
    const dataStore = useDataStore()
    const allTags = ref<Tag[]>(dataStore.allTags)
    const allTypes = ref<Types[]>(dataStore.allTypes)
    const allBoroughs = ref<Borough[]>(dataStore.allBoroughs)
    const allStructures = ref<Structure[]>(dataStore.allStructures)
    const allEquips = ref<Equipment[]>(dataStore.allEquips)

    const searchId = ref<string>('')

    const isLoading = ref(true)
    const route = useRoute()
    const router = useRouter()

    const parseQueryParams = (): SearchQueryParams => {
      return {
        idTy: route.query.idTy ? parseInt(route.query.idTy as string) : null,
        idBors:
          route.query.idBors !== undefined
            ? (route.query.idBors as string).split(',').map(Number)
            : null,
        sqMin: (route.query.sqMin as string) || null,
        sqMax: (route.query.sqMax as string) || null,
        cat: route.query.cat !== undefined ? parseInt(route.query.cat as string) : null,
        idSt: route.query.idSt !== undefined ? parseInt(route.query.idSt as string) : null,
        idEq: route.query.idEq !== undefined ? parseInt(route.query.idEq as string) : null,
        prMin: (route.query.prMin as string) || null,
        prMax: (route.query.prMax as string) || null
      }
    }
    const filterParams = ref<SearchQueryParams>(parseQueryParams())

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

    const applyFilters = (filters: SearchQueryParams) => {
      const filteredQueryParams = createQueryParams(filters)
      router.push({ path: '/pretraga', query: filteredQueryParams })
    }

    return {
      step,
      allTags,
      allEquips,
      allTypes,
      allBoroughs,
      allStructures,
      allCategories,
      isLoading,
      //
      applyFilters,
      filterParams,
      searchId
    }
  }
})
</script>

<template>
  <v-card class="pa-4" elevation="10" theme="light">
    <div v-if="isLoading" class="text-center">
      <v-progress-circular size="120" color="primary" indeterminate />
    </div>
    <div v-else>
      <v-tabs>
        <v-tab prepend-icon="mdi-id-card" text="Pretraga" @click="step = 1" color="primary" />
        <v-tab prepend-icon="mdi-fingerprint" text="ID" @click="step = 0" color="primary" />
        <!-- identifier or -->
      </v-tabs>
      <v-card-text>
        <v-window v-model="step">
          <v-window-item :value="0">
            <v-text-field
              variant="outlined"
              v-model="searchId"
              placeholder="Unesite ID ovde"
              class="primary-input"
              type="number"
              color="primary"
            >
              <template v-slot:prepend>
                <v-chip variant="flat" color="primary"
                  ><v-icon class="icon-bold text-white"> mdi-fingerprint </v-icon></v-chip
                >
              </template>
            </v-text-field>
          </v-window-item>
          <v-window-item :value="1">
            <v-row class="pt-4">
              <v-col cols="12" md="4">
                <v-select
                  variant="outlined"
                  color="primary"
                  clearable
                  v-model="filterParams.cat"
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
                  v-model="filterParams.idTy"
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
                  v-model="filterParams.idBors"
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
          </v-window-item>
          <v-window-item :value="2">
            <v-row class="pt-4">
              <v-col cols="12" md="6">
                <v-select
                  variant="outlined"
                  color="primary"
                  clearable
                  v-model="filterParams.idSt"
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
                  v-model="filterParams.idEq"
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
          </v-window-item>
          <v-window-item :value="3">
            <v-row>
              <v-col cols="12" md="6">
                <v-chip label variant="flat" color="primary">CENA</v-chip>
                <v-row class="pt-4" justify="space-evenly">
                  <v-col cols="6">
                    <v-text-field
                      variant="outlined"
                      v-model="filterParams.prMin"
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
                      v-model="filterParams.prMax"
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
                      v-model="filterParams.sqMin"
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
                      v-model="filterParams.sqMax"
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
          </v-window-item>
        </v-window>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="step > 1"
          color="primary"
          variant="text"
          :style="{ fontWeight: 'bold' }"
          @click="step--"
        >
          VRATI
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="step < 3 && step > 0" color="primary" variant="flat" @click="step++">
          DALJE
        </v-btn>
        <v-btn
          v-if="step === 3 || step === 0"
          color="primary"
          variant="flat"
          @click="() => applyFilters(filterParams)"
        >
          PRETRAŽI
          <v-icon left class="pl-4 icon-bold">mdi-magnify</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>
<style scoped>
.v-card {
  width: 600px;
  background-color: rgba(255, 255, 255, 0.95);
}
.icon-bold {
  font-weight: bold;
  font-size: 1.5rem;
  /* color: #3f0636;  */
}
</style>
