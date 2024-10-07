<script setup lang="ts"></script>

<template>
  <v-container fluid min-height="100vh" class="d-flex align-center justify-center mt-0">
    <v-card width="900px" elevation="20">
      <v-card-text>
        <v-row no-gutters class="sm:ml-5">
          <v-col cols="0" md="2" />
          <v-col cols="12" md="8" class="pt-5 d-flex justify-center">
            <p class="text-h6">
              Za više informacija, potencijalnu saradnju i bilo kakve nedoumice, možete nas
              kontaktirati putem email-a ili telefonom.
            </p>
          </v-col>
          <v-col cols="0" md="2" />

          <v-col cols="12" class="pt-5">
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
          <v-col cols="12" sm="6" class="pt-5">
            <v-row>
              <v-col cols="12" class="d-flex justify-center"
                ><v-icon class="pr-6">mdi-phone-outline</v-icon> <strong>TELEFONI</strong>
              </v-col>
              <v-col cols="12" class="d-flex justify-center"> 066/27-27-47 </v-col>
              <v-col cols="12" class="d-flex justify-center"> 066/27-27-97 </v-col>
              <v-col cols="12" class="d-flex justify-center"> 064/50-87-995 </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6" class="pt-5">
            <v-row>
              <v-col cols="12" class="d-flex justify-center"
                ><v-icon class="pr-6">mdi-email-outline</v-icon><strong>E-MAIL</strong>
              </v-col>
              <v-col cols="12" class="d-flex justify-center"> office@apolonekretnine.rs </v-col>
              <v-col cols="12" class="d-flex justify-center"> nikola@apolonekretnine.rs </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="pt-5 pb-5">
            <v-row>
              <v-col cols="12" class="d-flex justify-center"> <strong>MREŽE</strong> </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-btn icon="mdi-instagram" color="white" elevation="20" class="mr-5" />
                <v-btn icon="mdi-linkedin" color="white" elevation="20" class="ml-5" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped>
.wrapper.dark-body .v-card {
  background: linear-gradient(45deg, black 0%, rgb(56, 56, 56) 50%, black 100%) !important;
}
</style>
