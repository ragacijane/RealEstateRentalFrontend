<script lang="ts">
import { fetchThumbnail } from '@/services/dataService'
import type { OwnerItem } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, type PropType } from 'vue'
import ZoomedImageSlider from '@/components/UserViewComponents/ZoomedImageSlider.vue'
export default defineComponent({
  name: 'DataTableRowExpanded',
  props: {
    propertyItem: {
      type: Object as PropType<OwnerItem>,
      required: true
    }
  },
  components: {
    ZoomedImageSlider
  },
  setup(props) {
    const isZoomed = ref<boolean>(false)
    const thumbURL = ref<string>('/noImage.jpg')
    const isLoading = ref<boolean>(true)

    onMounted(async () => {
      isLoading.value = true
      await getPicUrl()
      isLoading.value = false
    })

    const getPicUrl = async () => {
      const temp = props.propertyItem.property.thumbnail

      if (temp !== null && temp.length > 0) {
        try {
          thumbURL.value = await fetchThumbnail(temp)
          if (!thumbURL.value) {
            thumbURL.value = '/noImage.jpg'
          }
        } catch (error) {
          console.error('Error fetching thumbnail:', error)
          thumbURL.value = '/noImage.jpg'
        }
      } else {
        thumbURL.value = '/noImage.jpg'
      }
    }
    const toggleZoom = () => {
      isZoomed.value = !isZoomed.value
    }
    return {
      isZoomed,
      isLoading,
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
        <v-col cols="1" class="d-flex align-center justify-center pr-7">
          <div @dblclick="toggleZoom()">
            <v-progress-circular
              v-if="isLoading"
              size="60"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <v-img v-else :src="thumbURL" width="100px"></v-img>
          </div>
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
              <p class="font-weight-bold d-inline">Kupatila:</p>
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
            <v-col cols="3"
              ><p class="font-weight-bold d-inline">Kvadratura:</p>
              {{ propertyItem.property.squareFootage }} m²</v-col
            >
            <v-col cols="3"
              ><p class="font-weight-bold d-inline">Grejanje:</p>
              {{ propertyItem.property.heating }}</v-col
            >
            <!-- Peti red -->
            <v-col cols="9">
              <p class="font-weight-bold d-inline">Naslov:</p>
              {{ propertyItem.property.title }}
            </v-col>
            <v-col cols="3"
              ><p class="font-weight-bold d-inline">Prostorije:</p>
              {{ propertyItem.property.rooms }}</v-col
            >
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
    <v-dialog v-model="isZoomed" opacity="0.8" eager theme="light" class="pa-0 ma-0" height="100vh">
      <div class="pa-0 pt-1 ma-0">
        <ZoomedImageSlider :property-id="propertyItem.property.idProperty" />
      </div>
      <v-btn icon @click="isZoomed = false" class="close-button" elevation="0">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-dialog>
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

.close-button {
  position: absolute;
  top: 0px;
  right: 1px;
  background-color: transparent !important; /* Transparent background */
  color: white !important; /* White icon color */
}
</style>
