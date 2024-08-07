<script lang="ts">
import { BACKEND_URL } from '@/constants/constant'
import { fetchThumbnail } from '@/services/dataService'
import type { OwnerItem } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, type PropType } from 'vue'
export default defineComponent({
  name: 'DataTableRowExpanded',
  props: {
    propertyItem: {
      type: Object as PropType<OwnerItem>,
      required: true
    }
  },
  setup(props) {
    const isZoomed = ref<boolean>(false)
    const thumbURL = ref<string>('/noImage.jpg')

    onMounted(async () => {
      await getPicUrl()
    })

    const getPicUrl = async () => {
      const temp = props.propertyItem.property.thumbnail

      if (temp !== null && temp.length > 0) {
        try {
          // Call your fetchThumbnail function from DataService to get the URL
          thumbURL.value = await fetchThumbnail(temp)
          if (!thumbURL.value) {
            thumbURL.value = '/noImage.jpg' // Fallback to default image if URL is empty
          }
        } catch (error) {
          console.error('Error fetching thumbnail:', error)
          thumbURL.value = '/noImage.jpg' // Handle error case
        }
      } else {
        thumbURL.value = '/noImage.jpg' // Handle case where thumbnail is null or empty
      }
    }
    const toggleZoom = () => {
      isZoomed.value = !isZoomed.value
    }
    return {
      isZoomed,
      thumbURL,
      toggleZoom,
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
          <div @dblclick="toggleZoom()"><v-img :src="thumbURL" width="150px"></v-img></div>
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
    <v-dialog v-model="isZoomed" max-width="100%" height="100%"
      ><v-card v-if="isZoomed" class="full-screen-card">
        <v-btn icon class="nav-button close" @click="toggleZoom()">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-img :src="thumbURL" alt="Selected Image" class="full-image" /> </v-card
    ></v-dialog>
  </div>
</template>

<style scoped>
.full-screen-card {
  width: 97vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.full-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.nav-button {
  position: absolute;
  transform: translateY(-50%);
  z-index: 10;
}
.close {
  top: 10px;
  right: 20px;
  transform: none;
  position: absolute;
  z-index: 10;
}
</style>
