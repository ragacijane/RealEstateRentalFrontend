<script lang="ts">
import { customerHeadersList } from '@/constants/constant'
import type { Customer } from '@/typesAndUtils/types'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CustomerTable',
  setup() {
    const customers = ref<Customer[]>([
      {
        idCustomer: 1,
        firstName: 'Marko',
        secondName: 'Janković',
        phoneNumber: '+381601234567',
        description: 'Redovan kupac, interesuje se za popuste'
      },
      {
        idCustomer: 2,
        firstName: 'Ana',
        secondName: 'Petrović',
        phoneNumber: '+381601112233',
        description: 'Kupuje uglavnom poklone za porodicu'
      },
      {
        idCustomer: 3,
        firstName: 'Nikola',
        secondName: 'Stojanović',
        phoneNumber: '+381602223344',
        description: 'Preferira online narudžbine'
      },
      {
        idCustomer: 4,
        firstName: 'Ivana',
        secondName: 'Lukić',
        phoneNumber: '+381603334455',
        description: 'Povremeni kupac, uglavnom vikendom'
      },
      {
        idCustomer: 5,
        firstName: 'Jelena',
        secondName: 'Milovanović',
        phoneNumber: '+381604445566',
        description: 'Interesuje se za novitete u ponudi'
      },
      {
        idCustomer: 6,
        firstName: 'Petar',
        secondName: 'Vuković',
        phoneNumber: '+381605556677',
        description: 'Često kupuje veće količine proizvoda'
      },
      {
        idCustomer: 7,
        firstName: 'Marija',
        secondName: 'Đorđević',
        phoneNumber: '+381606667788',
        description: 'Preferira lične konsultacije pre kupovine'
      },
      {
        idCustomer: 8,
        firstName: 'Stefan',
        secondName: 'Kostić',
        phoneNumber: '+381607778899',
        description: 'Nov i potencijalni stalni kupac'
      },
      {
        idCustomer: 9,
        firstName: 'Tamara',
        secondName: 'Nikolić',
        phoneNumber: '+381608889900',
        description: 'Kupuje samo proizvode u promociji'
      },
      {
        idCustomer: 10,
        firstName: 'Aleksandar',
        secondName: 'Ristić',
        phoneNumber: '+381609990011',
        description: 'Redovan kupac sa preferencijom premium proizvoda'
      },
      {
        idCustomer: 11,
        firstName: 'Bojan',
        secondName: 'Ristić',
        phoneNumber: '+381609990321',
        description: 'Redovan kupac sa preferencijom premium proizvoda'
      }
    ])
    const search = ref<string>('')

    return {
      search,
      customers,
      headers: customerHeadersList
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
      show-expand
      hover
      item-value="idCustomer"
    >
      <template v-slot:top>
        <v-text-field
          clearable
          v-model="search"
          type="string"
          hide-spin-buttons
          label="Pretraži"
          class="search-field"
        />
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
.custom-table {
  max-width: 1200px; /* ili koliko želiš */
  width: 100%; /* da se skaluje unutar max-width */
}
.search-field {
  max-width: 600px;
  width: 100%;
  margin-top: 8px;
  margin-left: 8px;
}
</style>
