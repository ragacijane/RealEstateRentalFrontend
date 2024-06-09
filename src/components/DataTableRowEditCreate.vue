<script lang="ts">
import { allCategories, yesOrNo } from '@/constants/constant';
import { useDataContext } from '@/contexts/DataContext';
import type { OwnerItem } from '@/typesAndUtils/types';
import { defineComponent, ref, type PropType } from 'vue';

export default defineComponent({
    name: "DataTableRowEditCreate",
    
    props: {
    defaultItem: {
      type: Object as PropType<OwnerItem>,
      required: true,
    },
  },

  setup(props,{emit}){
    const { allTags, allEquips, allTypes, allBoroughs, allStructures } = useDataContext();
    var step = 0;
    var index=-1;
    const selectedTags = ref<number[]>([]);
    const editedItem = ref(props.defaultItem);
    const selectedImages = ref<File[]>([]);
    const shownImages = ref<{ name: string, url: string }[]>([]);
    const uploadedImages = ref<File[]>([]);
    const formData = new FormData();
    const newImages= ref<boolean>(false);

    const close = () => {
      index=-1;
      newImages.value=false;
      emit("close-pressed");
    };

    const save = () => {
      index=editedItem.value.idOwner;
      //check required fields
      emit("save-pressed", {
        item: editedItem,
        index: index,
        formData: formData,
        selectedTags: selectedTags,
        newImages: newImages,
        uploadedImages: uploadedImages
      });
    };

    const next = () => {
      step += 1;
    };

    const prev = () => {
      step -= 1;
    };

    const handleImageInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target.files) return;

      selectedImages.value = Array.from(target.files);
      selectedImages.value.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          shownImages.value.push({ name: file.name, url: reader.result as string });
        };
        uploadedImages.value.push(file);
        reader.readAsDataURL(file);
      });
    };

    const saveImages=()=>{
      for (let image of uploadedImages.value) {
        formData.append("images", image);
      }
      newImages.value=true;
    }
    

    const downloadImages = async () => {
      // Implementation for downloading images can be added here
    };

    return{
      allTags,
      allEquips,
      allTypes,
      allBoroughs,
      allStructures,
      allCategories,
      selectedTags,
      editedItem,
      step,
      yesOrNo,
      selectedImages,
      shownImages,
      uploadedImages,
      //functions
      close,
      save,
      next,
      prev,
      handleImageInput,
      saveImages,
      downloadImages,
    }
  },
})
</script>

<template>
    <div>
      <v-stepper v-model="step" non-linear>
        <v-stepper-header>
          <v-stepper-item color="blue">Osnovni podaci</v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item color="blue">Oznake</v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item color="blue">Slike</v-stepper-item>
        </v-stepper-header>
  
        <v-stepper-window>
          <!-- STEP 1 -->
          <v-stepper-window-item value="1">
            <v-card>
              <v-card-text>
                <v-row dense>
                  <!-- Prvi red-->
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Ime vlasnika"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="3" sm="6"
                    ><v-select
                      v-model="editedItem.property.category"
                      label="Kategorija"
                      :items="allCategories"
                      item-title="value"
                      item-value="id"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.property.borough.boroughName"
                      label="Opština"
                      :items="allBoroughs"
                      item-title="boroughName"
                      item-value="id"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.property.price"
                      label="Cena €"
                    ></v-text-field>
                  </v-col>
                  <!-- Drugi red-->
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Telefon"
                    ></v-text-field></v-col
                  ><v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.property.type.typeName"
                      label="Tip"
                      :items="allTypes"
                      item-title="typeName"
                      item-value="idType"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.street"
                      label="Ulica"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1" sm="6">
                    <v-text-field
                      v-model="editedItem.number"
                      label="Broj"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" sm="6">
                    <v-select
                      v-model="editedItem.property.deposit"
                      label="Depozit"
                      :items="yesOrNo"
                      item-title="value"
                      item-value="id"
                    ></v-select>
                  </v-col>
                  <!-- Treci red-->
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.property.structure.structureType"
                      label="Struktura"
                      :items="allStructures"
                      item-title="structureType"
                      item-value="idStructure"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.property.floor"
                      label="Sprat"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.property.bathrooms"
                      label="Kupatila"
                    ></v-text-field>
                  </v-col>
                  <!--Cetvrti red-->
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.contract"
                      label="Ugovor"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.property.equipment.equipmentType"
                      label="Nameštenost"
                      :items="allEquips"
                      item-title="equipmentType"
                      item-value="id"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="2" sm="6">
                    <v-text-field
                      v-model="editedItem.property.rooms"
                      label="Prostorije"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" sm="6">
                    <v-text-field
                      v-model="editedItem.property.squareFootage"
                      label="Kvadratura (m²)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" sm="6">
                    <v-text-field
                      v-model="editedItem.property.heating"
                      label="Grejanje"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.property.title"
                      label="Naslov"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6"> </v-col>
                  <v-col cols="12" md="7" sm="12">
                    <v-textarea
                      v-model="editedItem.property.description"
                      label="Opis"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="5" sm="12">
                    <v-textarea
                      v-model="editedItem.property.description"
                      label="Dodatne informacije"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-action>
                <v-row
                  ><v-col
                    ><v-btn variant="flat" @click="prev" :disabled="true"
                      >Prethodno</v-btn
                    ></v-col
                  >
                  <v-col class="text-center">
                    <v-btn variant="flat" @click="close">Odustani</v-btn></v-col
                  >
                  <v-col class="text-right"
                    ><v-btn
                      class="text-white"
                      color="blue-darken-4"
                      variant="flat"
                      @click="next"
                      >Sledeće</v-btn
                    ></v-col
                  ></v-row
                >
              </v-card-action>
            </v-card>
          </v-stepper-window-item>
          <!-- STEP 2 -->
          <v-stepper-window-item value="2">
            <v-card>
              <v-card-text>
                <div v-if="allTags">
                  <v-row>
                    <v-col
                      cols="12"
                      md="2"
                      sm="3"
                      v-for="tag in allTags"
                      :key="tag.idTag"
                      ><v-checkbox
                        :label="tag.tagName"
                        v-model="selectedTags"
                        :value="tag.idTag"
                        color="primary"
                      ></v-checkbox
                    ></v-col>
                  </v-row>
                </div>
              </v-card-text>
              <v-card-action>
                <v-row
                  ><v-col class="text-left"
                    ><v-btn variant="flat" @click="prev">Prethodno</v-btn></v-col
                  >
                  <v-col class="text-center">
                    <v-btn variant="flat" @click="close">Odustani</v-btn></v-col
                  >
                  <v-col class="text-right"
                    ><v-btn
                      class="text-white"
                      color="blue-darken-4"
                      variant="flat"
                      @click="next"
                      >Sledeće</v-btn
                    ></v-col
                  ></v-row
                >
              </v-card-action>
            </v-card>
          </v-stepper-window-item>
          <!-- STEP 3 -->
          <v-stepper-window-item value="3">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col v-for="(file, index) in shownImages" :key="index">
                    <v-img
                      :lazy-src="file.url"
                      :src="file.url"
                      aspect-ratio="1"
                      class="bg-grey-lighten-2"
                      cover
                    >
                      <template v-slot:placeholder>
                        <v-row
                          align="center"
                          class="fill-height ma-0"
                          justify="center"
                        >
                        </v-row>
                      </template>
                    </v-img>
                  </v-col>
                </v-row>
                <v-spacer></v-spacer>
                <v-file-input multiple @change="handleImageInput"></v-file-input>
                <v-btn @click="saveImages">Upload Images</v-btn>
              </v-card-text>
              <v-card-action>
                <v-row
                  ><v-col
                    ><v-btn variant="flat" @click="prev">Prethodno</v-btn></v-col
                  >
                  <v-col class="text-center">
                    <v-btn variant="flat" @click="close">Odustani</v-btn></v-col
                  >
                  <v-col class="text-right"
                    ><v-btn
                      class="text-white"
                      color="blue-darken-4"
                      variant="flat"
                      @click="save"
                      >Sačuvaj</v-btn
                    ></v-col
                  ></v-row
                >
              </v-card-action>
            </v-card>
          </v-stepper-window-item>
        </v-stepper-window>
      </v-stepper>
    </div>
  </template>