<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { customerHeadersList } from '@/constants/constant'
import type { Customer } from '@/typesAndUtils/types'
import { fetchCustomers, toggleActive } from '@/services/adminService'
import EditCustomerDialog from './EditCustomerDialog.vue'

type SortBy = { key: string; order?: 'asc' | 'desc' }

export default defineComponent({
  name: 'CustomerTable',
  components: { EditCustomerDialog },
  setup() {
    const customers = ref<Customer[]>([])
    const loading = ref(false)
    const activeDisabled = ref(false)

    const search = ref('')
    const page = ref(1)
    const itemsPerPage = ref(10)
    const sortBy = ref<SortBy[]>([{ key: 'idCustomer', order: 'asc' }])

    const dialog = ref(false)
    const selectedCustomerId = ref<number | undefined>(undefined)

    const loadCustomers = async () => {
      loading.value = true
      try {
        const sortKey = sortBy.value?.[0]?.key ?? 'idCustomer'
        const sortOrder = sortBy.value?.[0]?.order ?? 'asc'

        const data = await fetchCustomers({
          page: page.value - 1,
          size: itemsPerPage.value,
          sort: sortKey,
          ascending: sortOrder !== 'desc',
          firstName: search.value || undefined
        })

        customers.value = data
      } finally {
        loading.value = false
      }
    }

    const changeStatusActive = async (item: Customer) => {
      if (activeDisabled.value) return
      activeDisabled.value = true
      try {
        const success = await toggleActive(item.idCustomer)
        if (success) item.isActive = !item.isActive
      } finally {
        activeDisabled.value = false
      }
    }

    const openCreate = () => {
      selectedCustomerId.value = undefined
      dialog.value = true
    }

    const editItem = (item: Customer) => {
      selectedCustomerId.value = item.idCustomer
      dialog.value = true
    }

    const handleClose = () => {
      dialog.value = false
      selectedCustomerId.value = undefined
    }

    const handleSave = async () => {
      // ovde pozovi update/create u parentu ili u wrapperu kako već radiš
      // posle save osveži tabelu
      await loadCustomers()
      handleClose()
    }

    onMounted(loadCustomers)

    watch([page, itemsPerPage, sortBy], () => loadCustomers())

    let t: number | undefined
    watch(search, () => {
      window.clearTimeout(t)
      t = window.setTimeout(() => {
        page.value = 1
        loadCustomers()
      }, 300)
    })

    return {
      customers,
      headers: customerHeadersList,

      loading,
      activeDisabled,

      search,
      page,
      itemsPerPage,
      sortBy,

      dialog,
      selectedCustomerId,

      changeStatusActive,
      editItem,
      handleClose,
      handleSave,
      openCreate
    }
  }
})
</script>

<template>
  <v-container class="d-flex justify-center">
    <v-data-table
      class="custom-table"
      :items="customers"
      :headers="headers"
      :loading="loading"
      show-expand
      hover
      item-value="idCustomer"
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
    >
      <template v-slot:top>
        <v-toolbar>
          <v-btn color="primary" @click="openCreate">Novi korisnik</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.edit`]="{ item }">
        <v-icon
          :color="item?.isActive ? 'light-green-darken-1' : 'red-lighten-2'"
          :icon="item?.isActive ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"
          size="x-large"
          class="me-2"
          :disabled="activeDisabled"
          @click="changeStatusActive(item)"
        />
        <v-icon class="me-2" size="default" @click="editItem(item)">mdi-pencil</v-icon>
      </template>
    </v-data-table>

    <!-- Dialog se otvara samo na edit -->
    <EditCustomerDialog
      v-model="dialog"
      :customer-id="selectedCustomerId"
      @close-pressed="handleClose"
      @save-pressed="handleSave"
    />
  </v-container>
</template>

<style scoped>
.custom-table {
  max-width: 1200px;
  width: 100%;
}
</style>
