<script lang="ts">
import { BACKEND_URL } from '@/constants/constant'
import type { OwnerItem } from '@/typesAndUtils/types'
import { defineComponent, type PropType } from 'vue'
export default defineComponent({
  name: 'DataTableRowExpanded',
  props: {
    propertyItem: {
      type: Object as PropType<OwnerItem>,
      required: true
    }
  },
  setup(props) {
    const getPicUrl = (): string => {
      const temp = props.propertyItem.property.thumbnail
      if (temp !== null && temp.length > 0) {
        return BACKEND_URL + '/images/thumbnails/' + temp
      } else {
        return '/noImage.jpg'
      }
    }
    return {
      getPicUrl
    }
  }
})
</script>

<template>
  <div v-if="propertyItem && propertyItem.idOwner">
    <v-container>
      <v-row>
        <v-col cols="1">
          <v-img :src="getPicUrl()" width="150px"></v-img>
        </v-col>
        <v-col cols="11">
          <v-row dense no-gutters>
            <!-- Prvi red-->
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Ime vlasnika:</p>
              {{ propertyItem.name }}
            </v-col>
            <v-col cols="13">
              <p class="font-weight-bold d-inline">Kategorija:</p>
              {{ propertyItem.property.category == 0 ? 'Iznajmljivanje' : 'Prodaja' }}
            </v-col>
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Opština:</p>
              {{ propertyItem.property.borough.boroughName }}
            </v-col>
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Cena:</p>
              {{ propertyItem.property.price }} €
            </v-col>
            <!-- Drugi red-->
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Telefon:</p>
              {{ propertyItem.phone }}
            </v-col>
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Tip:</p>
              {{ propertyItem.property.type.typeName }}
            </v-col>
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Ulica i broj:</p>
              {{ propertyItem.street }}
              {{ propertyItem.number }}
            </v-col>
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Depozit:</p>
              {{ propertyItem.property.deposit == 0 ? 'DA' : 'NE' }}
            </v-col>
            <!-- Treci red-->
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Email:</p>
              {{ propertyItem.email }}
            </v-col>
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Struktura:</p>
              {{ propertyItem.property.structure.structureType }}
            </v-col>
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Sprat:</p>
              {{ propertyItem.property.floor }}
            </v-col>
            <v-col cols="3">
              <p class="font-weight-bold d-inline" align="center">Kupatila:</p>
              {{ propertyItem.property.bathrooms }}
            </v-col>
            <!-- Cetvrti red-->
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Ugovor:</p>
              {{ propertyItem.contract }}
            </v-col>
            <v-col cols="3">
              <p class="font-weight-bold d-inline">Nameštenost:</p>
              {{ propertyItem.property.equipment.equipmentType }}
            </v-col>
            <v-col cols="6">
              <v-row dense no-gutters>
                <v-col cols="3"
                  ><p class="font-weight-bold d-inline">Prostorije:</p>
                  {{ propertyItem.property.rooms }}</v-col
                >
                <v-col cols="3"
                  ><p class="font-weight-bold d-inline">Kvadratura:</p>
                  {{ propertyItem.property.squareFootage }} m²</v-col
                >
                <v-col cols="3"
                  ><p class="font-weight-bold d-inline">Grejanje:</p>
                  {{ propertyItem.property.heating }}</v-col
                >
              </v-row>
            </v-col>
            <!-- Peti red -->
            <v-col cols="7">
              <p class="font-weight-bold d-inline">Naslov:</p>
              {{ propertyItem.property.title }}
            </v-col>
            <!-- Sesti red-->
            <v-col cols="6">
              <p class="font-weight-bold d-inline">Opis:</p>
              {{ propertyItem.property.description }}
            </v-col>
            <v-col cols="6">
              <p class="font-weight-bold d-inline">Dodatne informacije:</p>
              {{ propertyItem.moreInfo }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
