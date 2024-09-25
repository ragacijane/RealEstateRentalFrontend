<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTheme } from 'vuetify'
import apoloneImage from '@/assets/colorLogoHor.png'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TheHeader',
  setup() {
    const light = ref<boolean>(true)
    const theme = useTheme()
    const router = useRouter()

    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
      light.value = theme.global.current.value.dark ? false : true
    }

    return {
      light,
      apoloneImage,
      router,
      // functions
      toggleTheme
    }
  }
})
</script>

<template>
  <v-container fluid class="pa-0" justify-start>
    <v-row align="center" class="custom-row-bg" no-gutters>
      <v-col cols="5">
        <v-row justify="start" no-gutters>
          <v-col cols="1" />
          <v-col v-if="$vuetify.display.smAndDown" cols="1"
            ><v-app-bar-nav-icon class="text-white" />
          </v-col>
          <v-col v-if="$vuetify.display.mdAndUp" cols="3">
            <v-btn class="text-white" variant="text" @click="() => router.push('/pretraga?cat=0')">
              IZDAVANJE
            </v-btn>
          </v-col>
          <v-col v-if="$vuetify.display.mdAndUp" cols="3">
            <v-btn class="text-white" variant="text" @click="() => router.push('/pretraga?cat=1')">
              PRODAJA
            </v-btn>
          </v-col>
          <v-col v-if="$vuetify.display.mdAndUp" cols="3">
            <v-btn class="text-white" variant="text" @click="() => router.push('/pretraga?cat=2')">
              STAN NA DAN
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" class="d-flex align-center justify-center">
        <router-link to="/" class="d-flex">
          <img :src="apoloneImage" alt="Apolone Logo" style="height: 68px" />
        </router-link>
      </v-col>
      <v-col cols="5">
        <v-row justify="end" no-gutters>
          <v-col v-if="$vuetify.display.mdAndUp" cols="2"></v-col>
          <v-col cols="4">
            <v-btn
              v-if="$vuetify.display.mdAndUp"
              class="text-white"
              variant="text"
              @click="() => router.push('/o-nama')"
              >O NAMA</v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn
              v-if="$vuetify.display.mdAndUp"
              class="text-white"
              variant="text"
              @click="() => router.push('/kontakt')"
            >
              KONTAKT
            </v-btn>
          </v-col>
          <v-col class="d-flex align-center justify-end">
            <v-icon
              :icon="light ? 'mdi-weather-night' : 'mdi-weather-sunny'"
              size="default"
              class="text-white sm:pr-5"
              @click="toggleTheme"
            />
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.custom-row-bg {
  background-color: #400636; /* Custom background color */
  width: 100vw;
}
</style>
