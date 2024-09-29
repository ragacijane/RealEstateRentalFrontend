<script lang="ts">
import { defineComponent, ref } from 'vue'

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

    const applySort = () => {
      emit('sort-changed', selectedSortMethod.value)
    }

    const closeDialog = () => {
      emit('close-dialog')
    }

    return {
      selectedSortMethod,
      applySort,
      closeDialog
    }
  }
})
</script>
<template>
  <v-container fluid>
    <div class="card-wrapper">
      <v-card class="pa-4 scrollable-card" elevation="20" width="600px">
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
          <v-radio label="Cena - Rastuce" value="priceAsc" color="primary"></v-radio>
          <v-radio label="Cena - Opadajuce" value="priceDesc" color="primary"></v-radio>
          <v-radio label="Kvadratura - Rastuce" value="sqFtAsc" color="primary"></v-radio>
          <v-radio label="Kvadratura - Opadajuce" value="sqFtDesc" color="primary"></v-radio>
        </v-radio-group>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="applySort">Primeni</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>
<style scoped>
.background-container {
  position: relative;
  width: 100vw;
  height: calc(100vh - 68px); /* Adjust according to the header height */
  overflow: hidden;
}
.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 68px);
}
.scrollable-card {
  max-height: 400px; /* Set a maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
