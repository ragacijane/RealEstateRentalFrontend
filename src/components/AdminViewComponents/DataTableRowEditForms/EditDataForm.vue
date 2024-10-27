<script lang="ts">
import { allCategories, yesOrNo } from '@/constants/constant'
import { useDataStore } from '@/store/dataStore'
import type { Property } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, watch, type PropType } from 'vue'

export default defineComponent({
  name: 'EditDataForm',
  props: {
    inputItem: {
      type: Object as PropType<Property>,
      required: true
    }
  },
  setup(props) {
    const dataStore = useDataStore()
    const { allTags, allEquips, allTypes, allBoroughs, allStructures } = dataStore
    const editedItem = ref<Property>({ ...props.inputItem })
    const customBorough = ref<string>('')

    onMounted(() => {
      editedItem.value = { ...props.inputItem }
      customBorough.value = editedItem.value.title.split(',')[1]
    })

    const getData = () => {
      return editedItem.value
    }
    watch(
      () => [editedItem.value.street, editedItem.value.borough?.boroughName, customBorough.value],
      ([street, borough]) => {
        if (borough && street) {
          if (editedItem.value.borough.idBorough == 18) {
            editedItem.value.title = `${street}, ${customBorough.value}`
          } else {
            editedItem.value.title = `${street}, ${borough}`
          }
        }
      },
      { immediate: true } // Apply the initial value
    )

    return {
      allTags,
      allEquips,
      allTypes,
      allBoroughs,
      allStructures,
      yesOrNo,
      allCategories,
      editedItem,
      customBorough,
      //functions
      getData
    }
  }
})
</script>
<template>
  <v-sheet>
    <v-row dense>
      <!-- Prvi red-->
      <v-col cols="12" md="3" sm="6">
        <v-text-field v-model="editedItem.name" label="Ime vlasnika"></v-text-field
      ></v-col>
      <v-col cols="12" md="3" sm="6"
        ><v-select
          v-model="editedItem.category"
          label="Kategorija"
          :items="allCategories"
          item-title="value"
          item-value="id"
      /></v-col>
      <v-col cols="12" md="3" sm="6">
        <v-select
          v-model="editedItem.borough"
          label="Opština"
          :items="allBoroughs"
          item-title="boroughName"
          item-value="id"
          return-object
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-text-field
          v-model="editedItem.price"
          label="Cena"
          type="number"
          hide-spin-buttons
          suffix="€"
        ></v-text-field>
      </v-col>
      <!-- Drugi red-->
      <v-col cols="12" md="3" sm="6">
        <v-text-field
          v-model="editedItem.phone"
          label="Telefon"
          type="number"
          hide-spin-buttons
        ></v-text-field></v-col
      ><v-col cols="12" md="3" sm="6">
        <v-select
          v-model="editedItem.type"
          label="Tip"
          :items="allTypes"
          item-title="typeName"
          item-value="idType"
          return-object
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-text-field v-model="editedItem.street" label="Ulica"></v-text-field>
      </v-col>
      <v-col cols="12" md="1" sm="6">
        <v-text-field v-model="editedItem.number" label="Broj"></v-text-field>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-select
          v-model="editedItem.deposit"
          label="Depozit"
          :items="yesOrNo"
          item-title="value"
          item-value="id"
        />
      </v-col>
      <!-- Treci red-->
      <v-col cols="12" md="3" sm="6">
        <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-select
          v-model="editedItem.structure"
          label="Struktura"
          :items="allStructures"
          item-title="structureName"
          item-value="idStructure"
          return-object
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-text-field v-model="editedItem.floor" label="Sprat"></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-text-field
          v-model="editedItem.bathrooms"
          label="Kupatila"
          type="number"
          hide-spin-buttons
        ></v-text-field>
      </v-col>
      <!--Cetvrti red-->
      <v-col cols="12" md="3" sm="6">
        <v-text-field v-model="editedItem.contract" label="Ugovor"></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-select
          v-model="editedItem.equipment"
          label="Nameštenost"
          :items="allEquips"
          item-title="equipmentName"
          item-value="id"
          return-object
        />
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-text-field
          v-model="editedItem.rooms"
          label="Prostorije"
          type="number"
          hide-spin-buttons
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-text-field
          v-model="editedItem.squareFootage"
          label="Kvadratura"
          type="number"
          hide-spin-buttons
          suffix="m²"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-text-field v-model="editedItem.heating" label="Grejanje"></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-text-field readonly v-model="editedItem.title" label="Naslov"></v-text-field>
      </v-col>
      <v-col v-if="editedItem.borough.idBorough == 18" cols="12" md="3" sm="6">
        <v-text-field v-model="customBorough" label="Mesto"></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="6"> </v-col>
      <v-col cols="12" md="7" sm="12">
        <v-textarea v-model="editedItem.description" label="Opis"></v-textarea>
      </v-col>
      <v-col cols="12" md="5" sm="12">
        <v-textarea v-model="editedItem.moreInfo" label="Dodatne informacije"></v-textarea>
      </v-col>
    </v-row>
  </v-sheet>
</template>
