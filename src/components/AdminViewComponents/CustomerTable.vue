<script lang="ts">
import { customerHeadersList } from '@/constants/constant'
import { toggleActive } from '@/services/adminService'
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
        email: 'marko.jankovic@gmail.com',
        phoneNumber: '+381601234567',
        clientType: 'kupac',
        demand: 'Traži proizvode sa popustom i akcijama.',
        offers: 'Poslat katalog sa aktuelnim popustima.',
        showed: 'Zainteresovan za nove kolekcije.',
        pros: 'Lojalan kupac, često se vraća.',
        cons: 'Osetljiv na cenu.',
        contract: '',
        description: 'Redovan kupac, interesuje se za popuste',
        isActive: true
      },
      {
        idCustomer: 2,
        firstName: 'Ana',
        secondName: 'Petrović',
        email: 'ana.petrovic@gmail.com',
        phoneNumber: '+381601112233',
        clientType: 'kupac',
        demand: 'Traži poklone za porodicu i prijatelje.',
        offers: 'Predloženi gift paketi.',
        showed: 'Zainteresovana za sezonske ponude.',
        pros: 'Kupuje u većim količinama tokom praznika.',
        cons: 'Kupuje povremeno.',
        contract: '',
        description: 'Kupuje uglavnom poklone za porodicu',
        isActive: true
      },
      {
        idCustomer: 3,
        firstName: 'Nikola',
        secondName: 'Stojanović',
        email: 'nikola.stojanovic@gmail.com',
        phoneNumber: '+381602223344',
        clientType: 'kupac',
        demand: 'Preferira online kupovinu i brzu isporuku.',
        offers: 'Poslata ponuda za online popust.',
        showed: 'Zainteresovan za digitalne akcije.',
        pros: 'Lako se konvertuje online.',
        cons: 'Retko dolazi lično.',
        contract: '',
        description: 'Preferira online narudžbine',
        isActive: true
      },
      {
        idCustomer: 4,
        firstName: 'Ivana',
        secondName: 'Lukić',
        email: 'ivana.lukic@gmail.com',
        phoneNumber: '+381603334455',
        clientType: 'kupac',
        demand: 'Kupovina vikendom.',
        offers: 'Poslat vikend popust.',
        showed: 'Zainteresovana za akcije.',
        pros: 'Kupuje redovno vikendom.',
        cons: 'Nije aktivna radnim danima.',
        contract: '',
        description: 'Povremeni kupac, uglavnom vikendom',
        isActive: true
      },
      {
        idCustomer: 5,
        firstName: 'Jelena',
        secondName: 'Milovanović',
        email: 'jelena.milovanovic@gmail.com',
        phoneNumber: '+381604445566',
        clientType: 'kupac',
        demand: 'Interesuje se za nove proizvode.',
        offers: 'Poslata najnovija ponuda.',
        showed: 'Pregledala nove proizvode.',
        pros: 'Rana usvajateljica novih proizvoda.',
        cons: 'Brzo menja interesovanja.',
        contract: '',
        description: 'Interesuje se za novitete u ponudi',
        isActive: false
      },
      {
        idCustomer: 6,
        firstName: 'Petar',
        secondName: 'Vuković',
        email: 'petar.vukovic@gmail.com',
        phoneNumber: '+381605556677',
        clientType: 'kupac',
        demand: 'Traži količinske popuste.',
        offers: 'Poslata ponuda za veleprodaju.',
        showed: 'Zainteresovan za velike narudžbine.',
        pros: 'Veliki obim kupovine.',
        cons: 'Traži niže cene.',
        contract: '',
        description: 'Često kupuje veće količine proizvoda',
        isActive: true
      },
      {
        idCustomer: 7,
        firstName: 'Marija',
        secondName: 'Đorđević',
        email: 'marija.djordjevic@gmail.com',
        phoneNumber: '+381606667788',
        clientType: 'kupac',
        demand: 'Traži savete pre kupovine.',
        offers: 'Zakazane konsultacije.',
        showed: 'Zainteresovana za personalizovanu ponudu.',
        pros: 'Velika verovatnoća kupovine nakon konsultacija.',
        cons: 'Proces traje duže.',
        contract: '',
        description: 'Preferira lične konsultacije pre kupovine',
        isActive: true
      },
      {
        idCustomer: 8,
        firstName: 'Stefan',
        secondName: 'Kostić',
        email: 'stefan.kostic@gmail.com',
        phoneNumber: '+381607778899',
        clientType: 'kupac',
        demand: 'Istražuje ponudu.',
        offers: 'Poslat uvodni popust.',
        showed: 'Pokazuje interesovanje.',
        pros: 'Novi potencijalni stalni kupac.',
        cons: 'Još nije kupio.',
        contract: '',
        description: 'Nov i potencijalni stalni kupac',
        isActive: true
      },
      {
        idCustomer: 9,
        firstName: 'Tamara',
        secondName: 'Nikolić',
        email: 'tamara.nikolic@gmail.com',
        phoneNumber: '+381608889900',
        clientType: 'kupac',
        demand: 'Kupuje samo proizvode na akciji.',
        offers: 'Obaveštenja o promocijama.',
        showed: 'Pregleda popuste.',
        pros: 'Brzo reaguje na akcije.',
        cons: 'Niska marža.',
        contract: '',
        description: 'Kupuje samo proizvode u promociji',
        isActive: true
      },
      {
        idCustomer: 10,
        firstName: 'Aleksandar',
        secondName: 'Ristić',
        email: 'aleksandar.ristic@gmail.com',
        phoneNumber: '+381609990011',
        clientType: 'kupac',
        demand: 'Traži premium proizvode.',
        offers: 'Poslata VIP ponuda.',
        showed: 'Zainteresovan za luksuzne artikle.',
        pros: 'Velika potrošnja.',
        cons: 'Visoka očekivanja.',
        contract: '',
        description: 'Redovan kupac sa preferencijom premium proizvoda',
        isActive: true
      },
      {
        idCustomer: 11,
        firstName: 'Bojan',
        secondName: 'Ristić',
        email: 'bojan.ristic@gmail.com',
        phoneNumber: '+381609990321',
        clientType: 'kupac',
        demand: 'Traži premium proizvode.',
        offers: 'Poslata VIP ponuda.',
        showed: 'Zainteresovan za luksuzne artikle.',
        pros: 'Lojalan premium kupac.',
        cons: 'Zahteva poseban tretman.',
        contract: '',
        description: 'Redovan kupac sa preferencijom premium proizvoda',
        isActive: true
      }
    ])
    const activeDisabled = ref<boolean>(false)

    const search = ref<string>('')

    const changeStatusActive = async (item: Customer) => {
      activeDisabled.value = true
      // const success = await toggleActive(item.idCustomer)
      // if (success) item.isActive ? (item.isActive = false) : (item.isActive = true)
      activeDisabled.value = false
    }

    return {
      search,
      customers,
      activeDisabled,
      headers: customerHeadersList,
      changeStatusActive
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
      <template v-slot:[`item.edit`]="{ item }">
        <v-row>
          <v-col>
            <v-icon
              :color="item?.isActive ? 'light-green-darken-1' : 'red-lighten-2'"
              :icon="item?.isActive ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"
              size="x-large"
              class="me-2"
              :disabled="activeDisabled"
              @click="changeStatusActive(item)"
            ></v-icon>
          </v-col>
        </v-row>
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
