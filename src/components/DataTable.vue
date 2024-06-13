<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { createOwnerItemBodyRequest, getEmptyItem } from '@/typesAndUtils/utils'
import { headersList } from '@/constants/constant'
import { createProperty, updateProperty, uploadImages } from '@/services/adminService'
import DataTableRowEditCreate from './DataTableRowEditCreate.vue'
import DataTableRowExpanded from './DataTableRowExpanded.vue'
import type { OwnerItem } from '@/typesAndUtils/types'
import { useAdminStore } from '@/store/adminStore'
import DataTableSearch from './DataTableSearch.vue'

export default defineComponent({
  name: 'DataTable',
  components: {
    DataTableRowEditCreate,
    DataTableRowExpanded,
    DataTableSearch
  },
  setup() {
    const adminStore = useAdminStore()
    const dialog = ref<boolean>(false)
    const defaultItem = ref<OwnerItem>(getEmptyItem())
    const filteredProperties = ref<OwnerItem[]>([])
    const allProperties = adminStore.allProperties
    const setAllProperties = adminStore.setAllProperties
    onMounted(async () => {
      await adminStore.fetchAndSetProperties()
      filteredProperties.value = adminStore.allProperties
    })
    const handleFilter = (data: any) => {
      filteredProperties.value = data.filteredProperties
    }

    const editItem = (item: any) => {
      defaultItem.value = item
      dialog.value = true
    }

    const handleClose = () => {
      console.log('close pressed')
      close()
    }

    const handleSave = async (data: any) => {
      console.log('save pressed')
      const ownerItemBody = createOwnerItemBodyRequest(data.item, data.selectedTags)

      if (data.index) {
        const itemIndex = allProperties.findIndex((item: any) => item.idOwner === data.index)
        if (itemIndex !== -1) {
          allProperties[itemIndex] = data.item
          updateProperty(itemIndex, ownerItemBody)
          if (data.newImages) uploadImages(data.index, data.formData)
        }
      } else {
        const newItem = await createProperty(ownerItemBody)
        if (newItem) {
          allProperties.push(newItem)
          if (data.newImages) uploadImages(newItem.idOwner, data.formData)
        }
      }

      setAllProperties(allProperties)

      close()
    }

    const close = () => {
      dialog.value = false
      defaultItem.value = Object.assign({}, getEmptyItem())
    }

    const changeStatusActive = (item: any) => {
      item.property.active === 0 ? (item.property.active = 1) : (item.property.active = 0)
    }

    const changeStatusVisible = (item: any) => {
      item.property.visible === 0 ? (item.property.visible = 1) : (item.property.visible = 0)
    }

    return {
      dialog,
      defaultItem,
      headers: headersList,
      filteredProperties,
      allProperties,
      setAllProperties,
      // functions
      handleFilter,
      editItem,
      handleClose,
      handleSave,
      changeStatusActive,
      changeStatusVisible
    }
  },
  watch: {
    dialog(val) {
      val || close()
    }
  }
})
</script>

<template>
  <div v-if="allProperties">
    <DataTableSearch @filter="handleFilter" />
    <v-data-table
      :headers="headers"
      :items="filteredProperties"
      show-expand
      hover
      class="my-data-table pa-4"
      item-value="idOwner"
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
            <v-icon
              v-if="item.property?.active"
              color="light-green-darken-1"
              icon="mdi-check-circle"
              size="default"
              class="me-2"
              @click="changeStatusActive(item)"
            ></v-icon>
            <v-icon
              v-if="!item.property?.active"
              color="red-lighten-2"
              icon="mdi-close-circle"
              size="default"
              class="me-2"
              @click="changeStatusActive(item)"
            ></v-icon>
            <v-icon
              v-if="item.property?.visible"
              color="primary"
              icon="mdi-circle"
              size="default"
              class="me-2"
              @click="changeStatusVisible(item)"
            ></v-icon>
            <v-icon
              v-if="!item.property?.visible"
              color="indigo"
              icon="mdi-radiobox-blank"
              size="default"
              class="me-2"
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
              <v-btn class="mb-2" color="primary" dark v-bind="props"> Novi oglas </v-btn>
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

<style scoped>
:deep(.v-data-table thead th) {
  font-weight: bold !important;
  font-size: 16px !important;
  padding-left: 0px !important;
  padding-right: 1px !important;
  /* background-color: ; */
}
:deep(.v-data-table tbody td) {
  padding-left: 1px !important;
  padding-right: 0px !important;
}
:deep(.v-data-table tbody tr:hover) {
  background-color: #cdcdcd4f !important; /* Change to your desired hover color */
}
:deep(.v-data-table) {
  text-overflow: ellipsis !important;
  overflow: hidden !important; /* Hide both vertical and horizontal scrollbars */
}
:deep(.v-data-table thead th:nth-child(1)) {
  text-align: end !important; /* Align second column header to the center */
}
:deep(.v-data-table thead td:nth-child(1)) {
  text-align: start !important; /* Align second column header to the center */
}
</style>
<!-- :deep(.v-data-table thead th:nth-child(2)) {
  text-align: center; /* Align second column header to the center */
} -->
