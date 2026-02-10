<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { customerHeadersList } from '@/constants/constant'
import type { Customer, GetCustomersResponse } from '@/typesAndUtils/types'
import {
  createCustomer,
  fetchCustomers,
  toggleActive,
  toggleCustomerActive,
  updateCustomer
} from '@/services/adminService'
import EditCustomerDialog from './EditCustomerDialog.vue'

type SortBy = { key: string; order?: 'asc' | 'desc' }

export default defineComponent({
  name: 'CustomerTable',
  components: { EditCustomerDialog },
  setup() {
    const customers = ref<Customer[]>([])
    const totalCount = ref(0)

    const firstName = ref<string>('')
    const secondName = ref<string>('')
    const phoneNumber = ref<string>('')

    const loading = ref(false)

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

        const res = (await fetchCustomers({
          page: page.value - 1,
          size: itemsPerPage.value,
          sort: sortKey,
          ascending: sortOrder !== 'desc',
          firstName: firstName.value || undefined,
          secondName: secondName.value || undefined,
          phoneNumber: phoneNumber.value || undefined
        })) as GetCustomersResponse
        customers.value = res.customers ?? []
        totalCount.value = res.totalCount ?? 0
      } finally {
        loading.value = false
      }
    }

    const changeStatusActive = async (item: Customer) => {
      await toggleCustomerActive(item.idCustomer)
      await loadCustomers()
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

    const handleSave = async (payload: { customer: Customer; customerId?: number }) => {
      if (!payload.customerId) {
        await createCustomer(payload.customer)
      } else {
        await updateCustomer(payload.customer)
      }
      await loadCustomers()
      handleClose()
    }

    onMounted(loadCustomers)

    // kad menjaš page/size/sort -> reload
    watch([page, itemsPerPage, sortBy], loadCustomers)

    // debounce search
    let debounceTimer: number | undefined
    watch([firstName, secondName, phoneNumber], () => {
      window.clearTimeout(debounceTimer)

      debounceTimer = window.setTimeout(() => {
        page.value = 1
        loadCustomers()
      }, 300)
    })

    return {
      customers,
      totalCount,
      headers: customerHeadersList,

      loading,

      search,
      page,
      itemsPerPage,
      sortBy,

      dialog,
      selectedCustomerId,

      firstName,
      secondName,
      phoneNumber,

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
  <v-container class="max-width-600">
    <v-row dense>
      <v-col cols="12" md="4">
        <v-text-field v-model="firstName" label="Ime" required />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="secondName" label="Prezime" required />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="phoneNumber" label="Telefon" required />
      </v-col>
    </v-row>
  </v-container>
  <v-container class="d-flex justify-center">
    <v-data-table-server
      class="custom-table"
      :items="customers"
      :items-length="totalCount"
      :headers="headers"
      :loading="loading"
      show-expand
      hover
      item-value="idCustomer"
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
    >
      <template #top>
        <v-toolbar>
          <v-btn color="primary" @click="openCreate">Novi korisnik</v-btn>
        </v-toolbar>
      </template>

      <template #[`item.edit`]="{ item }">
        <v-icon
          :color="item?.isActive ? 'light-green-darken-1' : 'red-lighten-2'"
          :icon="item?.isActive ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"
          size="x-large"
          class="me-2"
          @click="changeStatusActive(item)"
        />
        <v-icon class="me-2" size="default" @click="editItem(item)">mdi-pencil</v-icon>
      </template>
    </v-data-table-server>

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
.max-width-600 {
  max-width: 1000px;
}
</style>
