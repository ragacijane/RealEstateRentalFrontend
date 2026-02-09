<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import EditCustomerForm from './EditCustomerForm.vue' // prilagodi putanju
import type { Customer } from '@/typesAndUtils/types'

export default defineComponent({
  name: 'EditCustomerDialog',
  components: { EditCustomerForm },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    customerId: {
      type: Number,
      required: false
    }
  },
  emits: ['update:modelValue', 'save-pressed', 'close-pressed'],
  setup(props, { emit }) {
    const formRef = ref<any>(null)
    const savePressed = ref(false)

    const updateDialogHeight = () => {
      const viewportHeight = window.innerHeight
      let dialogMaxHeight = '90vh'
      if (viewportHeight >= 1600) dialogMaxHeight = '60vh'
      else if (viewportHeight >= 1200) dialogMaxHeight = '70vh'
      document.documentElement.style.setProperty('--dialog-max-height', dialogMaxHeight)
    }

    onMounted(() => {
      updateDialogHeight()
      window.addEventListener('resize', updateDialogHeight)
    })

    watch(
      () => props.modelValue,
      (open) => {
        if (open) updateDialogHeight()
      }
    )

    const closeDialog = () => {
      emit('update:modelValue', false)
      emit('close-pressed')
      savePressed.value = false
    }

    const save = async () => {
      if (!formRef.value) return
      savePressed.value = true
      try {
        const customer: Customer = formRef.value.getData()

        // Parent odlučuje da li je create ili update (na osnovu customerId)
        emit('save-pressed', {
          customer,
          customerId: props.customerId
        })

        emit('update:modelValue', false)
      } finally {
        savePressed.value = false
      }
    }

    return {
      formRef,
      savePressed,
      closeDialog,
      save
    }
  }
})
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
  >
    <v-card class="dialog-scrollable">
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ customerId ? 'Izmena klijenta' : 'Novi klijent' }}</span>
      </v-card-title>

      <v-card-text>
        <div v-if="savePressed" class="text-center py-8">
          <v-progress-circular size="120" color="primary" indeterminate />
          <h2 class="mt-4">Molimo sačekajte 😊</h2>
        </div>

        <EditCustomerForm v-else ref="formRef" :customer-id="customerId" />
      </v-card-text>

      <v-card-actions class="px-4 pb-4">
        <v-spacer />
        <v-btn variant="flat" @click="closeDialog" :disabled="savePressed">Odustani</v-btn>
        <v-btn
          color="blue-darken-4"
          class="text-white"
          variant="flat"
          @click="save"
          :disabled="savePressed"
        >
          Sačuvaj
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.dialog-scrollable {
  max-height: var(--dialog-max-height, 80vh);
  overflow-y: auto;
}
</style>
