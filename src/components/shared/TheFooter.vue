<script lang="ts">
import { defineComponent } from 'vue'
import apoloneImage from '@/assets/colorLogoTextHor.png'

export default defineComponent({
  name: 'TheFooter',
  components: {},
  setup() {
    return {
      apoloneImage
    }
  }
})
</script>

<template>
  <v-footer class="d-flex flex-column align-center justify-center" color="primary">
    <div class="flex-column">
      <v-row no-gutters class="pb-5">
        <v-col cols="12" sm="6" md="3" class="pt-5">
          <v-row>
            <v-col cols="12" class="d-flex justify-center"
              ><v-icon class="pr-6">mdi-phone-outline</v-icon> <strong>TELEFONI</strong>
            </v-col>
            <v-col cols="12" class="d-flex justify-center"
              ><a :href="`tel:066/27-27-47`" class="phone-link">066/27-27-47</a>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <a :href="`tel:066/27-27-97 `" class="phone-link">066/27-27-97 </a>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="pt-5">
          <v-row>
            <v-col cols="12" class="d-flex justify-center"
              ><v-icon class="pr-6">mdi-email-outline</v-icon><strong>E-MAIL</strong>
            </v-col>
            <v-col cols="12" class="d-flex justify-center"> office@apolonekretnine.rs </v-col>
            <v-col cols="12" class="d-flex justify-center"> nikola@apolonekretnine.rs </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="pt-5">
          <v-row>
            <v-col cols="12" class="d-flex justify-center"
              ><v-icon class="pr-6">mdi-clock-outline</v-icon><strong>RADNO VREME</strong>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              Ponedeljak - Petak: 09:00 - 19:00</v-col
            >
            <v-col cols="12" class="d-flex justify-center"> Subota: 09:00 - 15:00 </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="2" class="pt-5">
          <v-row>
            <v-col cols="12" class="d-flex justify-center"> <strong>MREŽE</strong> </v-col>
            <v-col cols="12" class="d-flex justify-space-around">
              <v-btn
                icon="mdi-instagram"
                href="https://www.instagram.com/apolo.nekretnine?igsh=MTRxZ2FhaDMxZHAxOQ=="
                target="_blank"
                rel="noopener noreferrer"
                color="white"
                elevation="20"
              />
              <v-btn
                href="https://www.linkedin.com/in/apolo-nekretnine/"
                target="_blank"
                rel="noopener noreferrer"
                icon="mdi-linkedin"
                color="white"
                elevation="20"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider></v-divider>
    </div>

    <div class="pt-5 text-center">
      <v-img :src="apoloneImage" height="80" contain style="z-index: 10" />
      <div class="pt-5"><strong>Obilićev venac 18 Beograd</strong></div>
      <div class="pt-5">
        <strong>Copyright © - {{ new Date().getFullYear() }} </strong>- Sva prava su zadržana!
      </div>
    </div>
  </v-footer>
</template>
<style scoped>
.phone-link {
  color: white; /* Set text color to white */
  text-decoration: none; /* Remove underline */
}
</style>
