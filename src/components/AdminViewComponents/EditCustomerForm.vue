<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import type { Customer } from '@/typesAndUtils/types'
import { fetchCustomerById } from '@/services/adminService'

function getEmptyCustomer(): Customer {
  return {
    idCustomer: 0,
    firstName: '',
    secondName: '',
    email: '',
    phoneNumber: '',
    clientType: '',

    demand: '',
    offers: '',
    showed: '',
    pros: '',
    cons: '',
    contract: '',
    description: '',
    isActive: true
  }
}

export default defineComponent({
  name: 'EditCustomerForm',
  props: {
    customerId: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    const editedCustomer = ref<Customer>(getEmptyCustomer())
    const loading = ref(false)

    const loadCustomer = async () => {
      if (!props.customerId) {
        editedCustomer.value = getEmptyCustomer()
        return
      }

      loading.value = true
      try {
        const data = await fetchCustomerById(String(props.customerId))
        editedCustomer.value = { ...data }
      } finally {
        loading.value = false
      }
    }

    onMounted(loadCustomer)

    watch(
      () => props.customerId,
      () => {
        loadCustomer()
      }
    )

    const getData = (): Customer => {
      return editedCustomer.value
    }

    return {
      editedCustomer,
      loading,
      getData
    }
  }
})
</script>

<template>
  <v-sheet>
    <!-- možeš da prikažeš loader ako želiš -->
    <!-- <v-progress-linear v-if="loading" indeterminate /> -->

    <v-row dense>
      <v-col cols="12" md="4">
        <v-text-field v-model="editedCustomer.firstName" label="Ime" required />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="editedCustomer.secondName" label="Prezime" required />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="editedCustomer.email" label="Email" required />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="editedCustomer.phoneNumber" label="Telefon" required />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="editedCustomer.clientType" label="Tip klijenta" required />
      </v-col>

      <v-col cols="12" md="4"> </v-col>

      <v-col cols="12" md="4">
        <v-textarea v-model="editedCustomer.demand" label="Zahtev" required />
      </v-col>

      <v-col cols="12" md="4">
        <v-textarea v-model="editedCustomer.offers" label="Ponuda" required />
      </v-col>

      <v-col cols="12" md="4">
        <v-textarea v-model="editedCustomer.showed" label="Pokazano" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-textarea v-model="editedCustomer.pros" label="Zašto DA" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-textarea v-model="editedCustomer.cons" label="Zašto NE" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-textarea v-model="editedCustomer.contract" label="Ugovor" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-textarea v-model="editedCustomer.description" label="Napomena" required />
      </v-col>
    </v-row>
  </v-sheet>
</template>
