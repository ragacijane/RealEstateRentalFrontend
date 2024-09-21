<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTheme } from 'vuetify'
import apoloneImage from '@/assets/colorLogoHor.png'

export default defineComponent({
  name: 'TheHeader',
  components: {},
  setup() {
    const light = ref<boolean>(true)
    const theme = useTheme()
    const items = [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
      light.value = theme.global.current.value.dark ? false : true
    }

    return {
      light,
      items,
      apoloneImage,
      // functions
      toggleTheme
    }
  }
})
</script>

<template>
  <v-row align="center" class="custom-row-bg">
    <v-col cols="5">
      <v-row justify="start">
        <v-col cols="1" />
        <v-col v-if="$vuetify.display.smAndDown" cols="1"
          ><v-app-bar-nav-icon class="text-white" />
        </v-col>
        <v-col v-if="$vuetify.display.mdAndUp" cols="3">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn class="text-white" variant="text" v-bind="props"> IZDAVANJE </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col v-if="$vuetify.display.mdAndUp" cols="3"
          ><v-menu>
            <template v-slot:activator="{ props }">
              <v-btn class="text-white" variant="text" v-bind="props"> PRODAJA </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu></v-col
        >
        <v-col v-if="$vuetify.display.mdAndUp" cols="3">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn class="text-white" variant="text" v-bind="props"> STAN NA DAN </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" class="d-flex align-center justify-center">
      <img :src="apoloneImage" alt="Apolone Logo" style="height: 68px" />
    </v-col>
    <v-col cols="5">
      <v-row justify="end">
        <v-col v-if="$vuetify.display.mdAndUp" cols="2"></v-col>
        <v-col cols="4">
          <v-btn v-if="$vuetify.display.mdAndUp" class="text-white" variant="text">O NAMA</v-btn>
        </v-col>
        <v-col cols="3">
          <v-menu v-if="$vuetify.display.mdAndUp">
            <template v-slot:activator="{ props }">
              <v-btn class="text-white" variant="text" v-bind="props"> KONTAKT </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col class="d-flex align-center justify-end">
          <v-icon
            :icon="light ? 'mdi-weather-night' : 'mdi-weather-sunny'"
            size="default"
            class="text-white sm:pr-5"
            @click="toggleTheme"
          />
        </v-col>
        <v-col cols="1" v-if="$vuetify.display.xlAndUp"></v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
.custom-row-bg {
  background-color: #400636; /* Custom background color */
}
</style>
