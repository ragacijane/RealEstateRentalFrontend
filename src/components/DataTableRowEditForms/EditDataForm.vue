<script lang="ts">
import { allCategories, yesOrNo } from '@/constants/constant'
import { useDataStore } from '@/store/dataStore'
import type { OwnerItem } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, watch, type PropType } from 'vue'

export default defineComponent({
  name: 'EditDataForm',
  props: {
    inputItem: {
      type: Object as PropType<OwnerItem>,
      required: true
    }
  },
  setup(props) {
    const dataStore = useDataStore()
    const { allTags, allEquips, allTypes, allBoroughs, allStructures } = dataStore
    const editedItem = ref<OwnerItem>({ ...props.inputItem })

    onMounted(() => {
      editedItem.value = { ...props.inputItem }
    })

    const getData = () => {
      return editedItem.value
    }
    watch(
      () => [editedItem.value.street, editedItem.value.property.borough?.boroughName],
      ([street, borough]) => {
        if (borough && street) {
          editedItem.value.property.title = `${street}, ${borough}`
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
          v-model="editedItem.property.category"
          label="Kategorija"
          :items="allCategories"
          item-title="value"
          item-value="id"
      /></v-col>
      <v-col cols="12" md="3" sm="6">
        <v-select
          v-model="editedItem.property.borough"
          label="Opština"
          :items="allBoroughs"
          item-title="boroughName"
          item-value="id"
          return-object
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-text-field
          v-model="editedItem.property.price"
          label="Cena €"
          type="number"
        ></v-text-field>
      </v-col>
      <!-- Drugi red-->
      <v-col cols="12" md="3" sm="6">
        <v-text-field
          v-model="editedItem.phone"
          label="Telefon"
          type="number"
        ></v-text-field></v-col
      ><v-col cols="12" md="3" sm="6">
        <v-select
          v-model="editedItem.property.type"
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
          v-model="editedItem.property.deposit"
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
          v-model="editedItem.property.structure"
          label="Struktura"
          :items="allStructures"
          item-title="structureType"
          item-value="idStructure"
          return-object
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-text-field
          v-model="editedItem.property.floor"
          label="Sprat"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-text-field
          v-model="editedItem.property.bathrooms"
          label="Kupatila"
          type="number"
        ></v-text-field>
      </v-col>
      <!--Cetvrti red-->
      <v-col cols="12" md="3" sm="6">
        <v-text-field v-model="editedItem.contract" label="Ugovor"></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-select
          v-model="editedItem.property.equipment"
          label="Nameštenost"
          :items="allEquips"
          item-title="equipmentType"
          item-value="id"
          return-object
        />
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-text-field
          v-model="editedItem.property.rooms"
          label="Prostorije"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-text-field
          v-model="editedItem.property.squareFootage"
          label="Kvadratura (m²)"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-text-field v-model="editedItem.property.heating" label="Grejanje"></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <v-text-field readonly v-model="editedItem.property.title" label="Naslov"></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="6"> </v-col>
      <v-col cols="12" md="7" sm="12">
        <v-textarea v-model="editedItem.property.description" label="Opis"></v-textarea>
      </v-col>
      <v-col cols="12" md="5" sm="12">
        <v-textarea v-model="editedItem.moreInfo" label="Dodatne informacije"></v-textarea>
      </v-col>
    </v-row>
  </v-sheet>
</template>
