<script lang="ts">
import type { OwnerItem } from '@/services/types';
import { defineComponent, type PropType } from 'vue';
export default defineComponent({
    name: "DataTableRowExpanded",
    props: {
    propertyItem: {
      type: Object as PropType<OwnerItem>,
      required: true
    }
  },
    setup() {
    },
})
</script>
  

<template>
    <div v-if="propertyItem && propertyItem.idOwner">
      <v-container>
        <v-row dense>
          <!-- Prvi red-->
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Ime vlasnika:</p>
            {{ propertyItem.name }}
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Kategorija:</p>
            {{
              propertyItem.property.category == 0 ? "Iznajmljivanje" : "Prodaja"
            }}
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Opština:</p>
            {{ propertyItem.property.borough.boroughName }}
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Cena:</p>
            {{ propertyItem.property.price }} €
          </v-col>
          <!-- Drugi red-->
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Telefon:</p>
            {{ propertyItem.phone }}
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Tip:</p>
            {{ propertyItem.property.type.typeName }}
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Ulica i broj:</p>
            {{ propertyItem.street }}
            {{ propertyItem.number }}
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Depozit:</p>
            {{ propertyItem.property.deposit == 0 ? "DA" : "NE" }}
          </v-col>
          <!-- Treci red-->
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Email:</p>
            {{ propertyItem.email }}
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Struktura:</p>
            {{ propertyItem.property.structure.structureType }}
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Sprat:</p>
            {{ propertyItem.property.floor }}
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline" align="center">Kupatila:</p>
            {{ propertyItem.property.bathrooms }}
          </v-col>
          <!-- Cetvrti red-->
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Ugovor:</p>
            {{ propertyItem.contract }}
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <p class="font-weight-bold d-inline">Nameštenost:</p>
            {{ propertyItem.property.equipment.equipmentType }}
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <p class="font-weight-bold d-inline" align="start">Prostorije:</p>
            {{ propertyItem.property.rooms }}
            &emsp;&emsp;&emsp;
            <p class="font-weight-bold d-inline">Kvadratura:</p>
            {{ propertyItem.property.squareFootage }} m² &emsp;&emsp;&ensp;&emsp;
            <p class="font-weight-bold d-inline" align="end">Grejanje:</p>
            {{ propertyItem.property.heating }}
          </v-col>
          <!-- Peti red -->
          <v-col cols="12" md="7" sm="7">
            <p class="font-weight-bold d-inline">Naslov:</p>
            {{ propertyItem.property.title }}
          </v-col>
          <!-- Sesti red-->
          <v-col cols="12" md="6" sm="6">
            <p class="font-weight-bold d-inline">Opis:</p>
            {{ propertyItem.property.description }}
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <p class="font-weight-bold d-inline">Dodatne informacije:</p>
            {{ propertyItem.moreInfo }}
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>
