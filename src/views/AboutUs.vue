<script setup lang="ts">
import apoloneImage from '@/assets/colorLogoTextHor.svg'
</script>

<template>
  <v-container
    fluid
    min-height="100vh"
    class="d-flex align-start justify-center mt-0 mt-sm-5 mt-md-10 pt-md-10"
  >
    <v-card width="900px" elevation="20" class="mr-0">
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" class="pt-5 d-flex align-center justify-center text-center">
            <p class="text-h5">
              <strong>DOBRODOŠLI...</strong>
            </p>
          </v-col>
          <v-col cols="12" class="pt-5 d-flex align-center justify-center text-center">
            <p class="text-body-1">
              ..na zvanični sajt agencije Apolo nekretnine doo! Naš tim ambicioznih i profesionalnih
              agenata je posvećen pružanju visokokvalitetnih usluga koje Vam pomažu da pronađete
              odgovarajuću kancelariju, dom iz snova ili isplativu investiciju.
            </p>
          </v-col>
          <v-col cols="12" class="pt-5 d-flex align-center justify-center text-center">
            <p class="text-body-1">
              <strong>Naša misija </strong> je da proces kupovine, prodaje ili iznajmljivanje
              nekretnine, učinimo jednostavnim i lakim, pružajući Vam personalizovanu podršku i
              savetovanje u svakom koraku procesa.
            </p>
          </v-col>
          <v-col cols="12" class="pt-5 d-flex align-center justify-center text-center">
            <p class="text-body-1">
              <strong> Verujemo</strong> u transparentnost, integritet i profesionalnost, a naša
              vizija je da budemo lideri na tržištu nekretnina u regionu, a i šire.
            </p>
          </v-col>
          <v-col cols="12" class="pt-5 d-flex align-center justify-center text-center">
            <p class="text-h6">
              <strong> Zašto izabrati Apolo nekretnine doo?</strong>
            </p>
          </v-col>
          <v-col cols="12" class="pt-5 d-flex align-center justify-center">
            <p class="text-body-1">
              Naš tim se sastoji od iskusnih agenata koji veoma dobro poznaju lokalno tržište.
              Pratimo najnovije trendove i tržišne uslove kako bismo Vam pružili najtačnije
              informacije i savete. Vi kao klijent ste nama na prvom mestu, jer mi postojimo
              isključivo zbog Vas.
            </p>
          </v-col>
          <v-col cols="12" class="pt-5 d-flex align-center justify-center text-center">
            <p class="text-h6">
              <strong> Sigurno ka novom poslovnom i stambenom prostoru!</strong>
            </p>
          </v-col>
          <v-col cols="12" class="pt-5 d-flex align-center justify-center">
            <v-img :src="apoloneImage" height="100px" contain />
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
