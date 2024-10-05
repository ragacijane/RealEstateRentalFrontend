<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTheme } from 'vuetify'
import apoloneImage from '@/assets/colorLogoTextHor.png'

export default defineComponent({
  name: 'TheHeader',
  components: {},
  setup() {
    const light = ref<boolean>(true)
    const theme = useTheme()

    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
      light.value = theme.global.current.value.dark ? false : true
    }

    return {
      light,
      // functions
      toggleTheme,
      apoloneImage
    }
  }
})
</script>

<template>
  <v-row class="align-start justify-center custom-row-bg" style="height: 92px">
    <v-col cols="3" offset="5"
      ><img :src="apoloneImage" alt="Apolone Logo" style="height: 80px" />
    </v-col>
    <v-col cols="1" offset="3">
      <v-icon
        :icon="light ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        size="default"
        class="pa-5 ma-5 text-white"
        @click="toggleTheme"
      />
    </v-col>
  </v-row>
</template>
<style scoped>
.custom-row-bg {
  background-color: #400636; /* Custom background color */
}
</style>
