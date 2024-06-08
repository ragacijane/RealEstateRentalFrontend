<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DataTAble',
    components:{},
    setup(){},
})
</script>

<template>
    <div v-if="properties">
      <v-data-table
        :headers="headers"
        :items="data"
        show-expand
        hover
        item-value="property.idProperty"
      >
        <!-- EXPAND    -->
        <template v-slot:expanded-row="{ item }">
          <td :colspan="headers.length">
            <ExpandedRow :propertyItem="item" />
          </td>
        </template>
        <!-- Category -->
        <template v-slot:[`item.category`]="{ item }">
          <div v-if="!item.property.category">Iznajmljivanje</div>
          <div v-else>Prodaja</div>
        </template>
        <!-- EDIT    -->
        <template v-slot:[`item.edit`]="{ item }">
          <v-row>
            <v-col>
              <div v-if="item.property.active">
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
              <div v-if="item.property.visible">
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
            {{ item.property.price }} €
          </v-chip>
        </template>
        <!-- squareFootage-->
        <template v-slot:[`item.property.squareFootage`]="{ item }">
          <v-chip color="green" class="font-weight-black">
            {{ item.property.squareFootage }} m²
          </v-chip>
        </template>
        <!-- id-->
        <template v-slot:[`item.property.idProperty`]="{ item }">
          <v-chip color="gray" class="font-weight-black">
            {{ item.property.idProperty }}
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
              <EditProperty
                :defaultItem="defaultItem"
                @close-pressed="handleClose"
                @save-pressed="handleSave"
              />
            </v-dialog>
          </v-toolbar>
        </template>
        <!-- NO DATA 
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>-->
      </v-data-table>
    </div>
  </template>