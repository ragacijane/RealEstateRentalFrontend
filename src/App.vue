<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/UserViewComponents/TheHeader.vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
</script>

<template>
  <div :class="theme.global.current.value.dark ? 'wrapper dark-body' : 'wrapper light-body'">
    <TheHeader />
    <RouterView />
  </div>
</template>
<style>
.dark-body {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.452) 0%, rgb(95, 95, 95) 55%, black 100%);
  min-height: 100vh;
  margin: 0;
}
.light-body {
  background: linear-gradient(135deg, white 0%, silver 55%, white 100%);
  min-height: 100vh;
  margin: 0;
}

.wrapper {
  position: relative;
  z-index: 1;
}
body,
* {
  font-family: 'Red Hat Display', sans-serif !important;
}
</style>
