<script lang="ts">
import { allCategories } from '@/constants/constant'
import { useAdminStore } from '@/store/adminStore'
import { useDataStore } from '@/store/dataStore'
import {
  type Tag,
  type Borough,
  type Equipment,
  type OwnerItem,
  type SearchPropertyParams,
  type Structure,
  type Types
} from '@/typesAndUtils/types'
import { getEmptyParams } from '@/typesAndUtils/utils'
import { defineComponent, onMounted, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'DataTableSearch',
  setup(props, { emit }) {
    const adminStore = useAdminStore()
    const dataStore = useDataStore()
    const allTags = ref<Tag[]>([])
    const allTypes = ref<Types[]>([])
    const allBoroughs = ref<Borough[]>([])
    const allStructures = ref<Structure[]>([])
    const allEquips = ref<Equipment[]>([])
    const filteredProperties = ref<OwnerItem[]>([])

    const params = ref<SearchPropertyParams>(getEmptyParams())

    onMounted(async () => {
      await dataStore.fetchData()
      allTags.value = dataStore.allTags
      allEquips.value = dataStore.allEquips
      allTypes.value = dataStore.allTypes
      allBoroughs.value = dataStore.allBoroughs
      allStructures.value = dataStore.allStructures
      // await adminStore.fetchAndSetProperties()
      filteredProperties.value = adminStore.allProperties
    })

    const filter = () => {
      const paramValue = params.value

      const tempId = paramValue.ID
      if (tempId && tempId.length > 0) {
        filteredProperties.value = adminStore.allProperties.filter((prop) =>
          prop.idOwner.toString().includes(tempId)
        )
      } else {
        filteredProperties.value = adminStore.allProperties

        const tempCategory = paramValue.category
        if (tempCategory != null && tempCategory != undefined) {
          filteredProperties.value = filteredProperties.value.filter(
            (prop) => prop.property.category == tempCategory
          )
        }

        const tempType = paramValue.type
        if (tempType)
          filteredProperties.value = filteredProperties.value.filter(
            (prop) => prop.property.type.idType == tempType.idType
          )

        const tempBorough: Borough[] | null | undefined = paramValue.borough
        if (tempBorough && Array.isArray(tempBorough) && tempBorough.length > 0) {
          const boroughNames = tempBorough.map((b) => b.boroughName)
          filteredProperties.value = filteredProperties.value.filter((prop) =>
            boroughNames.includes(prop.property.borough.boroughName)
          )
        }

        const tempMinSF = paramValue.squareFootageMin
        if (tempMinSF)
          filteredProperties.value = filteredProperties.value.filter(
            (prop) => parseInt(prop.property.squareFootage) >= parseInt(tempMinSF, 10)
          )

        const tempMaxSF = paramValue.squareFootageMax
        if (tempMaxSF)
          filteredProperties.value = filteredProperties.value.filter(
            (prop) => parseInt(prop.property.squareFootage) <= parseInt(tempMaxSF, 10)
          )

        const tempPhone = paramValue.phoneNumber
        if (tempPhone && tempPhone.length > 0) {
          filteredProperties.value = filteredProperties.value.filter((prop) =>
            prop.phone.toString().includes(tempPhone)
          )
        }

        const tempStruct = paramValue.structure
        if (tempStruct) {
          filteredProperties.value = filteredProperties.value.filter(
            (prop) => prop.property.structure.idStructure == tempStruct.idStructure
          )
        }

        const tempStreet = paramValue.street
        if (tempStreet && tempStreet.length > 0) {
          filteredProperties.value = filteredProperties.value.filter((prop) =>
            prop.street.toString().includes(tempStreet)
          )
        }

        const tempEqip = paramValue.equipment
        if (tempEqip) {
          filteredProperties.value = filteredProperties.value.filter(
            (prop) => prop.property.equipment.idEquipment == tempEqip.idEquipment
          )
        }

        const tempMinPrice = paramValue.priceMin
        if (tempMinPrice)
          filteredProperties.value = filteredProperties.value.filter(
            (prop) => parseInt(prop.property.price) >= parseInt(tempMinPrice, 10)
          )

        const tempMaxPrice = paramValue.priceMax
        if (tempMaxPrice)
          filteredProperties.value = filteredProperties.value.filter(
            (prop) => parseInt(prop.property.price) <= parseInt(tempMaxPrice, 10)
          )
      }
      emit('filter', {
        filteredProperties: filteredProperties.value
      })
    }
    const setId = (value: string | null) => {
      filter()
    }
    const setTypeId = () => {
      filter()
    }
    const setPhone = () => {
      filter()
    }
    const setBorough = () => {
      filter()
    }
    const setSFMin = () => {
      filter()
    }
    const setSFMax = () => {
      filter()
    }
    const setCategory = (data: any) => {
      filter()
    }
    const setStructure = () => {
      filter()
    }
    const setEquip = () => {
      filter()
    }
    const setStreet = () => {
      filter()
    }
    const setPriceMin = () => {
      filter()
    }
    const setPriceMax = () => {
      filter()
    }

    return {
      allTags,
      allEquips,
      allTypes,
      allBoroughs,
      allStructures,
      allCategories,
      params,
      //functions
      setId,
      setTypeId,
      setPhone,
      setBorough,
      setSFMin,
      setSFMax,
      setCategory,
      setStructure,
      setEquip,
      setStreet,
      setPriceMin,
      setPriceMax
    }
  }
})
</script>

<template>
  <v-row>
    <v-col cols="12" md="2" sm="2"
      ><v-text-field
        clearable
        v-model="params.ID"
        type="number"
        label="ID"
        @update:modelValue="setId"
    /></v-col>
    <v-col cols="12" md="2" sm="2"
      ><v-select
        clearable
        v-model="params.category"
        label="Kategorija"
        :items="allCategories"
        item-title="value"
        item-value="id"
        @update:modelValue="setCategory"
    /></v-col>
    <v-col cols="12" md="2" sm="2"
      ><v-select
        clearable
        v-model="params.type"
        label="Tip"
        :items="allTypes"
        item-title="typeName"
        item-value="idType"
        return-object
        @update:modelValue="setTypeId"
    /></v-col>
    <v-col cols="12" md="2" sm="2"
      ><v-select
        clearable
        multiple
        v-model="params.borough"
        label="Opština"
        :items="allBoroughs"
        item-title="boroughName"
        item-value="id"
        return-object
        @update:modelValue="setBorough"
    /></v-col>
    <v-col cols="12" md="2" sm="2">
      <v-text-field
        v-model="params.squareFootageMin"
        label="Površina od:"
        @update:modelValue="setSFMin"
        type="number"
      />
    </v-col>
    <v-col cols="12" md="2" sm="2">
      <v-text-field
        v-model="params.squareFootageMax"
        label="Površina do:"
        @update:modelValue="setSFMax"
        type="number"
      />
    </v-col>

    <v-col cols="12" md="2" sm="2">
      <v-text-field
        v-model="params.phoneNumber"
        label="Broj telefona"
        @update:modelValue="setPhone"
        type="number"
      />
    </v-col>
    <v-col cols="12" md="2" sm="2"
      ><v-select
        v-model="params.structure"
        clearable
        label="Struktura"
        :items="allStructures"
        item-title="structureType"
        item-value="idStructure"
        return-object
        @update:modelValue="setStructure"
    /></v-col>

    <v-col cols="12" md="2" sm="2"
      ><v-text-field v-model="params.street" label="Ulica" @update:modelValue="setStreet"
    /></v-col>

    <v-col cols="12" md="2" sm="2"
      ><v-select
        v-model="params.equipment"
        clearable
        label="Nameštenost"
        :items="allEquips"
        item-title="equipmentType"
        item-value="id"
        return-object
        @update:modelValue="setEquip"
    /></v-col>

    <v-col cols="12" md="2" sm="2">
      <v-text-field
        v-model="params.priceMin"
        label="Cena od:"
        @update:modelValue="setPriceMin"
        type="number"
    /></v-col>
    <v-col cols="12" md="2" sm="2">
      <v-text-field
        v-model="params.priceMax"
        label="Cena do:"
        @update:modelValue="setPriceMax"
        type="number"
      />
    </v-col>
  </v-row>
</template>
