<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { getEmptyItem } from '@/typesAndUtils/utils'
import { allCategories, headersList } from '@/constants/constant'
import {
  createProperty,
  toggleActive,
  toggleVisible,
  updateImages,
  updateProperty
} from '@/services/adminService'
import DataTableRowEditComponent from './DataTableRowEditComponent.vue'
import DataTableRowExpanded from './DataTableRowExpanded.vue'
import type { HandleSaveItem, Property, ItemBody } from '@/typesAndUtils/types'
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
    const defaultItem = ref<Property>(Object.assign({}, getEmptyItem()))
    const filteredProperties = ref<Property[]>([])
    const allProperties = ref<Property[]>([])
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
            data.item.thumbnail = await updateImages(data.index, data.picturesFormData)
          }
          await updateProperty(item)
        }
      } else {
        const newItemId = await createProperty(item)
        if (newItemId > 0) {
          if (data.picturesFormData) {
            const newthumbnail = await updateImages(newItemId, data.picturesFormData)
          }
        }
      }
      await adminStore.fetchAndSetProperties()
      setAllProperties(adminStore.allProperties)
      filteredProperties.value = adminStore.allProperties
      closeDialog()
    }

    const closeDialog = () => {
      dialog.value = false
      defaultItem.value = Object.assign({}, getEmptyItem())
    }

    const changeStatusActive = async (item: Property) => {
      activeDisabled.value = true
      const success = await toggleActive(item.idProperty)
      if (success) item.active === 0 ? (item.active = 1) : (item.active = 0)
      activeDisabled.value = false
    }

    const changeStatusVisible = async (item: Property) => {
      visibleDisabled.value = true
      const success = await toggleVisible(item.idProperty)
      if (success) item.visible === 0 ? (item.visible = 1) : (item.visible = 0)
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
      allCategories,
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
      {{ allCategories[item.category].value }}
    </template>
    <!-- ACTION    -->
    <template v-slot:[`item.edit`]="{ item }">
      <v-row>
        <v-col>
          <v-icon
            :color="item?.active ? 'light-green-darken-1' : 'red-lighten-2'"
            :icon="item?.active ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"
            size="default"
            class="me-2"
            :disabled="activeDisabled"
            @click="changeStatusActive(item)"
          ></v-icon>
          <v-icon
            color="blue-darken-2"
            :icon="item?.visible ? 'mdi-eye' : 'mdi-eye-off'"
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
    <template v-slot:[`item.price`]="{ item }">
      <v-chip color="blue" class="font-weight-black"> {{ item?.price }} € </v-chip>
    </template>
    <!-- squareFootage-->
    <template v-slot:[`item.squareFootage`]="{ item }">
      <v-chip color="green" class="font-weight-black"> {{ item?.squareFootage }} m² </v-chip>
    </template>
    <!-- id-->
    <template v-slot:[`item.idProperty`]="{ item }">
      <v-chip color="gray" class="font-weight-black">
        {{ item?.idProperty }}
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
