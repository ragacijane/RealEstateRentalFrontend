<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTheme } from 'vuetify'

export default defineComponent({
  name: 'SortDialog',
  props: {
    currentSort: {
      type: String,
      required: true
    }
  },
  emits: ['sort-changed', 'close-dialog'],
  setup(props, { emit }) {
    const selectedSortMethod = ref<string>(props.currentSort)
    const theme = useTheme()
    const applySort = () => {
      emit('sort-changed', selectedSortMethod.value)
    }

    const closeDialog = () => {
      emit('close-dialog')
    }

    return {
      selectedSortMethod,
      applySort,
      closeDialog,
      theme
    }
  }
})
</script>
<template>
  <div class="d-flex align-center justify-center">
    <v-card
      :class="
        theme.current.value.dark ? 'pa-4 dark-background scrollable-card' : 'pa-4 scrollable-card'
      "
      elevation="20"
    >
      <p class="font-weight-medium text-h5 s">&nbsp;</p>
      <v-btn
        icon
        @click="closeDialog"
        class="close-btn"
        aria-label="Close"
        variant="flat"
        color="primary"
        size="small"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-radio-group v-model="selectedSortMethod">
        <v-radio
          label="Cena - Rastuće"
          value="priceAsc"
          :color="theme.current.value.dark ? 'white' : 'primary'"
        ></v-radio>
        <v-radio
          label="Cena - Opadajuće"
          value="priceDesc"
          :color="theme.current.value.dark ? 'white' : 'primary'"
        ></v-radio>
        <v-radio
          label="Kvadratura - Rastuće"
          value="sqFtAsc"
          :color="theme.current.value.dark ? 'white' : 'primary'"
        ></v-radio>
        <v-radio
          label="Kvadratura - Opadajuće"
          value="sqFtDesc"
          :color="theme.current.value.dark ? 'white' : 'primary'"
        ></v-radio>
      </v-radio-group>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" color="primary" @click="applySort">Primeni</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>
<style scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 68px);
}

.scrollable-card {
  width: 400px;
  max-height: 400px; /* Set a maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
}

.dark-background {
  background: linear-gradient(45deg, black 0%, rgb(56, 56, 56) 50%, black 100%) !important;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
