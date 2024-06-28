<script lang="ts">
import { allCategories, yesOrNo } from '@/constants/constant'
import { fetchTagsFromProperty } from '@/services/dataService'
import { useDataStore } from '@/store/dataStore'
import { type PicturesBody, type OwnerItem } from '@/typesAndUtils/types'
import { defineComponent, onMounted, ref, type PropType } from 'vue'
import EditPicturesForm from './DataTableRowEditForms/EditPicturesForm.vue'
import EditDataForm from './DataTableRowEditForms/EditDataForm.vue'
import { getEmptyPicturesBody } from '@/typesAndUtils/utils'

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

    onMounted(async () => {
      index.value = editedItem.value.idOwner
      if (index.value > 0) {
        selectedTags.value = await fetchTagsFromProperty(index.value)
      }
    })

    const close = () => {
      index.value = -1
      emit('close-pressed')
    }

    const save = () => {
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

    const downloadImages = async () => {
      // Implementation for downloading images can be added here
    }

    return {
      allTags,
      allCategories,
      selectedTags,
      editedItem,
      step,
      yesOrNo,
      editDataForm,
      //functions
      close,
      save,
      next,
      prev,
      saveImages,
      downloadImages
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

      <v-stepper-window>
        <!-- STEP 1 -->
        <v-stepper-window-item value="1">
          <v-card>
            <v-card-text>
              <EditDataForm ref="editDataForm" :inputItem="editedItem" />
            </v-card-text>
            <v-card-action>
              <v-row
                ><v-col
                  ><v-btn variant="flat" @click="prev" :disabled="true">Prethodno</v-btn></v-col
                >
                <v-col class="text-center">
                  <v-btn variant="flat" @click="close">Odustani</v-btn></v-col
                >
                <v-col class="text-right"
                  ><v-btn class="text-white" color="blue-darken-4" variant="flat" @click="next"
                    >Sledeće</v-btn
                  ></v-col
                ></v-row
              >
            </v-card-action>
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
            <v-card-action>
              <v-row
                ><v-col class="text-left"
                  ><v-btn variant="flat" @click="prev">Prethodno</v-btn></v-col
                >
                <v-col class="text-center">
                  <v-btn variant="flat" @click="close">Odustani</v-btn></v-col
                >
                <v-col class="text-right"
                  ><v-btn class="text-white" color="blue-darken-4" variant="flat" @click="next"
                    >Sledeće</v-btn
                  ></v-col
                ></v-row
              >
            </v-card-action>
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
            <v-card-action>
              <v-row
                ><v-col><v-btn variant="flat" @click="prev">Prethodno</v-btn></v-col>
                <v-col class="text-center">
                  <v-btn variant="flat" @click="close">Odustani</v-btn></v-col
                >
                <v-col class="text-right"
                  ><v-btn class="text-white" color="blue-darken-4" variant="flat" @click="save"
                    >Sačuvaj</v-btn
                  ></v-col
                ></v-row
              >
            </v-card-action>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </div>
</template>
