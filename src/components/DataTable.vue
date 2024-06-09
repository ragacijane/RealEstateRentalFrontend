<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import DataTableRowExpanded from './DataTableRowExpanded.vue';
import DataTableRowEditCreate from './DataTableRowEditCreate.vue';
import { headersList } from '@/constants/constant';
import { createOwnerItemBodyRequest, getEmptyItem } from '@/typesAndUtils/utils';
import { useAdminContext } from '@/contexts/adminContext';
import { createProperty, updateProperty, uploadImages } from '@/services/adminService';

export default defineComponent({
    name: 'DataTAble',
    components:{
      DataTableRowEditCreate,
      DataTableRowExpanded,
    },
    setup(){
      var dialog=false;
      var defaultItem=getEmptyItem();
      const {allProperties, setAllProperties} = useAdminContext();

      return{
        dialog,
        defaultItem,
        headers: headersList,
        properties: allProperties,
        setAllProperties,
      }
    },
    watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods:{
    editItem(item: any) {
      this.defaultItem = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },
    handleClose() {
      console.log("close pressed");
      this.close();
    },
    handleSave(data: any) {
      console.log("save pressed");
      const ownerItemBody=createOwnerItemBodyRequest(data.item,data.selectedTags)

      if(data.index){
        const itemIndex = this.properties.findIndex((item: any) => item.idOwner === data.index);
        if (itemIndex !== -1) {
          this.properties[itemIndex] = data.item;
          updateProperty(itemIndex,ownerItemBody)       
          if(data.newImages)
            uploadImages(data.index,data.formData);
          }
      }
      else{
        const newItem = createProperty(ownerItemBody)
        this.properties.push(newItem)
        if(data.newImages)
          uploadImages(newItem,data.formData)
      }

      this.setAllProperties(this.properties)

      this.close();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.defaultItem = Object.assign({}, getEmptyItem());
      });
    },
    changeStatusActive(item: any) {
      item.property.active == 0
        ? (item.property.active = 1)
        : (item.property.active = 0);
    },
    changeStatusVisible(item: any) {
      item.property.visible == 0
        ? (item.property.visible = 1)
        : (item.property.visible = 0);
    },
  }
})
</script>

<template>
    <div v-if="properties">
      <v-data-table
        :headers="headers"
        :items="properties"
        show-expand
        hover
        item-value="property.idProperty"
      >
        <!-- EXPAND    -->
        <template v-slot:expanded-row="{ item }">
          <td :colspan="headers.length">
            <DataTableRowExpanded :propertyItem="item" />
          </td>
        </template>
        <!-- Category -->
        <template v-slot:[`item.category`]="{ item }">
          <div v-if="!item.property?.category">Iznajmljivanje</div>
          <div v-else>Prodaja</div>
        </template>
        <!-- EDIT    -->
        <template v-slot:[`item.edit`]="{ item }">
          <v-row>
            <v-col>
              <div v-if="item.property?.active">
                <v-icon
                  color="light-green-darken-1"
                  icon="mdi-check-circle"
                  size="default"
                  @click="changeStatusActive(item)"
                ></v-icon>
              </div>
              <div v-else>
                <v-icon
                  color="red-lighten-2"
                  icon="mdi-close-circle"
                  size="default"
                  @click="changeStatusActive(item)"
                ></v-icon>
              </div>
            </v-col>
            <v-col>
              <div v-if="item.property?.visible">
                <v-icon
                  color="primary"
                  icon="mdi-circle"
                  size="default"
                  @click="changeStatusVisible(item)"
                ></v-icon>
              </div>
              <div v-else>
                <v-icon
                  color="indigo"
                  icon="mdi-radiobox-blank"
                  size="default"
                  @click="changeStatusVisible(item)"
                ></v-icon>
              </div>
            </v-col>
            <v-col>
              <v-icon class="me-2" size="default" @click="editItem(item)">
                mdi-pencil
              </v-icon>
            </v-col>
          </v-row>
        </template>
        <!-- Price-->
        <template v-slot:[`item.property.price`]="{ item }">
          <v-chip color="blue" class="font-weight-black">
            {{ item.property?.price }} €
          </v-chip>
        </template>
        <!-- squareFootage-->
        <template v-slot:[`item.property.squareFootage`]="{ item }">
          <v-chip color="green" class="font-weight-black">
            {{ item.property?.squareFootage }} m²
          </v-chip>
        </template>
        <!-- id-->
        <template v-slot:[`item.property.idProperty`]="{ item }">
          <v-chip color="gray" class="font-weight-black">
            {{ item.property?.idProperty }}
          </v-chip>
        </template>
        <!-- NEW ITEM -->
        <template v-slot:top>
          <v-toolbar>
            <v-dialog v-model="dialog" persistent>
              <template v-slot:activator="{ props }">
                <v-btn class="mb-2" color="primary" dark v-bind="props">
                  Novi oglas
                </v-btn>
              </template>
              <DataTableRowEditCreate
                :defaultItem="defaultItem"
                @close-pressed="handleClose"
                @save-pressed="handleSave"
              />
            </v-dialog>
          </v-toolbar>
        </template>
      </v-data-table>
    </div>
  </template>