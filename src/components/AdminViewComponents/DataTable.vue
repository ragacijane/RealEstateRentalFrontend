<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { getEmptyItem } from '@/typesAndUtils/utils'
import { headersList } from '@/constants/constant'
import {
  createProperty,
  toggleActive,
  toggleVisible,
  updateImages,
  updateProperty
} from '@/services/adminService'
import DataTableRowEditComponent from './DataTableRowEditComponent.vue'
import DataTableRowExpanded from './DataTableRowExpanded.vue'
import type { HandleSaveItem, OwnerItem, ItemBody } from '@/typesAndUtils/types'
import { useAdminStore } from '@/store/adminStore'
import DataTableSearch from './DataTableSearch.vue'

export default defineComponent({
  name: 'DataTable',
  components: {
    DataTableRowEditComponent,
    DataTableRowExpanded,
    DataTableSearch
  },
  setup() {
    const adminStore = useAdminStore()
    const dialog = ref<boolean>(false)
    const defaultItem = ref<OwnerItem>(Object.assign({}, getEmptyItem()))
    const filteredProperties = ref<OwnerItem[]>([])
    const allProperties = ref<OwnerItem[]>([])
    const setAllProperties = adminStore.setAllProperties
    const isLoading = ref<boolean>(true)
    const activeDisabled = ref<boolean>(false)
    const visibleDisabled = ref<boolean>(false)

    onMounted(() => {
      filteredProperties.value = adminStore.allProperties
      allProperties.value = adminStore.allProperties
      isLoading.value = adminStore.isLoading
    })
    watch(
      () => adminStore.allProperties,
      (newVal) => {
        filteredProperties.value = newVal
        allProperties.value = newVal
      },
      { immediate: true }
    )

    watch(
      () => adminStore.isLoading,
      (newVal) => {
        isLoading.value = newVal
      },
      { immediate: true }
    )

    const handleFilter = (data: any) => {
      filteredProperties.value = data.filteredProperties
    }

    const editItem = (item: any) => {
      defaultItem.value = item
      dialog.value = true
    }

    const handleClose = () => {
      closeDialog()
    }

    const handleSave = async (data: HandleSaveItem) => {
      const item: ItemBody = { item: data.item, tagIds: data.selectedTags.join(',') }
      if (data.index) {
        const itemIndex = allProperties.value.findIndex((item: any) => item.idOwner == data.index)
        if (itemIndex !== -1) {
          if (data.picturesFormData) {
            data.item.property.thumbnail = await updateImages(data.index, data.picturesFormData)
          }
          allProperties.value[itemIndex] = data.item
          await updateProperty(item)
        }
      } else {
        const newItem = await createProperty(item)
        if (newItem) {
          if (data.picturesFormData) {
            newItem.property.thumbnail = await updateImages(newItem.idOwner, data.picturesFormData)
          }
          allProperties.value.push(newItem)
        }
      }

      setAllProperties(allProperties.value)
      filteredProperties.value = adminStore.allProperties
      closeDialog()
    }

    const closeDialog = () => {
      dialog.value = false
      defaultItem.value = Object.assign({}, getEmptyItem())
    }

    const changeStatusActive = async (item: any) => {
      activeDisabled.value = true
      const success = await toggleActive(item.idOwner)
      if (success)
        item.property.active === 0 ? (item.property.active = 1) : (item.property.active = 0)
      activeDisabled.value = false
    }

    const changeStatusVisible = async (item: any) => {
      visibleDisabled.value = true
      const success = await toggleVisible(item.idOwner)
      if (success)
        item.property.visible === 0 ? (item.property.visible = 1) : (item.property.visible = 0)
      visibleDisabled.value = false
    }

    return {
      dialog,
      defaultItem,
      headers: headersList,
      filteredProperties,
      allProperties,
      isLoading,
      activeDisabled,
      visibleDisabled,
      // functions
      setAllProperties,
      handleFilter,
      editItem,
      handleClose,
      handleSave,
      changeStatusActive,
      changeStatusVisible,
      closeDialog
    }
  },
  watch: {
    dialog(val) {
      val || this.closeDialog()
    }
  }
})
</script>

<template>
  <DataTableSearch @filter="handleFilter" />
  <v-data-table
    :headers="headers"
    :items="filteredProperties"
    show-expand
    hover
    item-value="idOwner"
    :loading="isLoading"
  >
    <!-- LOADING -->
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
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
    <!-- ACTION    -->
    <template v-slot:[`item.edit`]="{ item }">
      <v-row>
        <v-col>
          <v-icon
            :color="item.property?.active ? 'light-green-darken-1' : 'red-lighten-2'"
            :icon="item.property?.active ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"
            size="default"
            class="me-2"
            :disabled="activeDisabled"
            @click="changeStatusActive(item)"
          ></v-icon>
          <v-icon
            color="primary"
            :icon="item.property?.visible ? 'mdi-eye' : 'mdi-eye-off'"
            size="default"
            class="me-2"
            :disabled="visibleDisabled"
            @click="changeStatusVisible(item)"
          ></v-icon>
          <v-icon class="me-2" size="default" @click="editItem(item)"> mdi-pencil </v-icon>
        </v-col>
      </v-row>
    </template>
    <!-- Price-->
    <template v-slot:[`item.property.price`]="{ item }">
      <v-chip color="blue" class="font-weight-black"> {{ item.property?.price }} € </v-chip>
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
            <v-btn color="primary" v-bind="props"> Novi oglas </v-btn>
          </template>
          <DataTableRowEditComponent
            :defaultItem="defaultItem"
            @close-pressed="handleClose"
            @save-pressed="handleSave"
          />
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
