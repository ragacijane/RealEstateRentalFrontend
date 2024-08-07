<script lang="ts">
import { allCategories, yesOrNo } from '@/constants/constant'
import { fetchTagsFromProperty } from '@/services/dataService'
import { useDataStore } from '@/store/dataStore'
import { type OwnerItem } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, type PropType } from 'vue'
import EditPicturesForm from './DataTableRowEditForms/EditPicturesForm.vue'
import EditDataForm from './DataTableRowEditForms/EditDataForm.vue'

export default defineComponent({
  name: 'DataTableRowEditComponent',
  components: {
    EditPicturesForm,
    EditDataForm
  },
  props: {
    defaultItem: {
      type: Object as PropType<OwnerItem>,
      required: true
    }
  },

  setup(props, { emit }) {
    const dataStore = useDataStore()
    const { allTags } = dataStore
    const step = ref<number>(0)
    const index = ref<number>(-1)
    const selectedTags = ref<number[]>([])
    const editedItem = ref<OwnerItem>(props.defaultItem)
    const picturesFormData = ref<FormData | null>(null)
    const editDataForm = ref<any>(null)
    const savePressed = ref<boolean>(false)

    onMounted(async () => {
      index.value = editedItem.value.idOwner
      if (index.value > 0) {
        selectedTags.value = await fetchTagsFromProperty(index.value)
      }
      updateDialogHeight()
      window.addEventListener('resize', updateDialogHeight)
    })

    const updateDialogHeight = () => {
      const viewportHeight = window.innerHeight
      let dialogMaxHeight = '80vh' // Default value
      if (viewportHeight >= 1600) {
        dialogMaxHeight = '60vh'
      } else if (viewportHeight >= 1200) {
        dialogMaxHeight = '70vh'
      }
      document.documentElement.style.setProperty('--dialog-max-height', dialogMaxHeight)
    }

    const closeDialog = () => {
      index.value = -1
      emit('close-pressed')
    }

    const save = () => {
      savePressed.value = true
      //check required fields
      emit('save-pressed', {
        item: editedItem.value,
        index: index.value,
        selectedTags: selectedTags.value,
        picturesFormData: picturesFormData.value
      })
    }

    const next = () => {
      if (step.value === 0) {
        if (editDataForm) {
          const updatedItem = editDataForm.value.getData()
          editedItem.value = updatedItem
        }
      }
      step.value += 1
    }

    const prev = () => {
      step.value -= 1
    }

    const saveImages = async (data: any) => {
      picturesFormData.value = data.picturesFormData
    }

    return {
      allTags,
      allCategories,
      selectedTags,
      editedItem,
      step,
      yesOrNo,
      editDataForm,
      savePressed,
      //functions
      closeDialog,
      save,
      next,
      prev,
      saveImages
    }
  }
})
</script>

<template>
  <div>
    <v-stepper v-model="step" non-linear>
      <v-stepper-header>
        <v-stepper-item color="blue">Osnovni podaci</v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item color="blue">Oznake</v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item color="blue">Slike</v-stepper-item>
      </v-stepper-header>
      <v-card class="dialog-scrollable">
        <v-stepper-window>
          <!-- STEP 1 -->
          <v-stepper-window-item value="1">
            <v-card>
              <v-card-text>
                <EditDataForm ref="editDataForm" :inputItem="editedItem" />
              </v-card-text>
              <v-card-actions>
                <v-row
                  ><v-col
                    ><v-btn variant="flat" @click="prev" :disabled="true">Prethodno</v-btn></v-col
                  >
                  <v-col class="text-center">
                    <v-btn variant="flat" @click="closeDialog">Odustani</v-btn></v-col
                  >
                  <v-col class="text-right"
                    ><v-btn class="text-white" color="blue-darken-4" variant="flat" @click="next"
                      >Sledeće</v-btn
                    ></v-col
                  ></v-row
                >
              </v-card-actions>
            </v-card>
          </v-stepper-window-item>
          <!-- STEP 2 -->
          <v-stepper-window-item value="2">
            <v-card>
              <v-card-text>
                <div v-if="allTags">
                  <v-row>
                    <v-col cols="12" md="2" sm="3" v-for="tag in allTags" :key="tag.idTag"
                      ><v-checkbox
                        :label="tag.tagName"
                        v-model="selectedTags"
                        :value="tag.idTag"
                        color="primary"
                      ></v-checkbox
                    ></v-col>
                  </v-row>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-row
                  ><v-col class="text-left"
                    ><v-btn variant="flat" @click="prev">Prethodno</v-btn></v-col
                  >
                  <v-col class="text-center">
                    <v-btn variant="flat" @click="closeDialog">Odustani</v-btn></v-col
                  >
                  <v-col class="text-right"
                    ><v-btn class="text-white" color="blue-darken-4" variant="flat" @click="next"
                      >Sledeće</v-btn
                    ></v-col
                  ></v-row
                >
              </v-card-actions>
            </v-card>
          </v-stepper-window-item>
          <!-- STEP 3 -->
          <v-stepper-window-item value="3">
            <v-card>
              <v-card-text>
                <EditPicturesForm
                  :propertyId="editedItem.idOwner"
                  :thumbnail="editedItem.property.thumbnail"
                  @updated-pictures="saveImages"
                />
              </v-card-text>
              <v-card-actions>
                <v-row
                  ><v-col><v-btn variant="flat" @click="prev">Prethodno</v-btn></v-col>
                  <v-col class="text-center">
                    <v-btn variant="flat" @click="closeDialog">Odustani</v-btn></v-col
                  >
                  <v-col class="text-right"
                    ><v-btn
                      class="text-white"
                      color="blue-darken-4"
                      variant="flat"
                      @click="save"
                      :disabled="savePressed"
                      >Sačuvaj</v-btn
                    ></v-col
                  ></v-row
                >
              </v-card-actions>
            </v-card>
          </v-stepper-window-item>
        </v-stepper-window>
      </v-card>
    </v-stepper>
  </div>
</template>

<style scoped>
.dialog-scrollable {
  max-height: var(--dialog-max-height, 80vh);
  overflow-y: auto;
}
</style>
