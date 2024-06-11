<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTheme } from 'vuetify'

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
      toggleTheme
    }
  }
})
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="10" sm="10"> <h1>The Header</h1> </v-col>
      <v-col cols="12" md="2" sm="2" class="justify-sm-end">
        <v-icon v-if="light" icon="mdi-star-outline" size="default" @click="toggleTheme"></v-icon>
        <v-icon v-if="!light" icon="mdi-star" size="default" @click="toggleTheme"></v-icon
      ></v-col>
    </v-row>
  </div>
</template>
