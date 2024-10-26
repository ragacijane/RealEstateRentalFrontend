<script lang="ts">
import { fetchImages } from '@/services/dataService'
import type { Pictures, PicturesBody } from '@/typesAndUtils/types'
import { createFormData, getEmptyPicturesBody } from '@/typesAndUtils/utils'
import { defineComponent, onMounted, ref, type PropType } from 'vue'
import draggable from 'vuedraggable'

export default defineComponent({
  name: 'EditPicturesForm',
  components: {
    draggable
  },
  props: {
    propertyId: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup(props, { emit }) {
    const images = ref<Pictures[]>([])
    const body = ref<PicturesBody>(getEmptyPicturesBody())
    const model = ref<number>(-1)
    const oldLength = ref<number>(0)
    const dialog = ref<boolean>(false)
    const deletionMode = ref<boolean>(false)

    onMounted(async () => {
      if (props.propertyId > 0) {
        images.value = await fetchImages(props.propertyId)
      }
      if (images.value.length > 0) {
        oldLength.value = images.value.length
      }
    })

    const handleFileInputChange = async (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files) {
        await handleFiles(target.files)
      }
    }

    const handleFiles = async (fileList: FileList) => {
      const currFiles = Array.from(fileList)

      const fileReadPromises = currFiles.map((file) => {
        return new Promise<void>((resolve) => {
          const reader = new FileReader()

          reader.onload = () => {
            images.value.push({
              picturePath: reader.result as string,
              pictureName: file.name,
              thumbnailPath: ''
            })
            body.value.newImages.push(file)
            resolve()
          }

          reader.readAsDataURL(file)
        })
      })
      await Promise.all(fileReadPromises)
      update()
    }

    const openFileInput = () => {
      const fileInput = document.getElementById('file-input')
      if (fileInput) {
        fileInput.click()
      }
    }

    const deletePhoto = (index: number) => {
      if (index > -1) {
        const [check, rest] = images.value[index].picturePath.split(':')
        const imageToDelete = images.value[index].pictureName
        images.value.splice(index, 1)

        if (check == 'data') {
          const deletingIndex = index - oldLength.value
          body.value.newImages.splice(deletingIndex, 1)
        } else {
          oldLength.value -= 1
          body.value.deletedPhotos.push(imageToDelete)
        }
      }
      update()
    }

    const update = () => {
      body.value.sequenceArray = []
      for (const image of images.value) {
        body.value.sequenceArray.push(image.pictureName)
      }
      emit('updated-pictures', {
        picturesFormData: createFormData(body.value)
      })
    }

    const openDialog = (index: number) => {
      model.value = index
      dialog.value = true
    }

    const nextImage = () => {
      if (model.value < images.value.length - 1) {
        model.value++
      } else {
        model.value = 0
      }
    }

    const prevImage = () => {
      if (model.value > 0) {
        model.value--
      } else {
        model.value = images.value.length - 1
      }
    }
    const toggleDeletionMode = () => {
      deletionMode.value = !deletionMode.value
    }
    return {
      images,
      model,
      body,
      dialog,
      deletionMode,
      //functions
      handleFileInputChange,
      openFileInput,
      deletePhoto,
      openDialog,
      nextImage,
      prevImage,
      toggleDeletionMode
    }
  }
})
</script>

<template>
  <v-sheet class="mx-auto" elevation="8" max-width="1100">
    <v-icon></v-icon>
    <div class="d-flex align-center justify-center">
      <input
        type="file"
        id="file-input"
        style="display: none"
        accept="image/*"
        multiple
        @change="handleFileInputChange"
      />
      <v-btn icon class="mx-2" @click="openFileInput">
        <v-icon>mdi-camera</v-icon>
      </v-btn>
      <v-btn
        icon
        class="mx-2"
        @click="toggleDeletionMode"
        :color="deletionMode ? 'red' : 'default'"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
    <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
      <v-slide-group-item
        v-for="(image, index) in images"
        :key="index"
        v-slot="{ isSelected, select }"
      >
        <div
          @dblclick="(event: MouseEvent) => openDialog(index)"
          @click="(event: MouseEvent) => select(!isSelected)"
        >
          <div class="icon-above-card">
            <v-icon v-if="deletionMode" @click="deletePhoto(index)" class="delete-icon"
              >mdi-delete</v-icon
            >
            <v-icon v-else></v-icon>
          </div>

          <v-card
            color="grey-lighten-1"
            class="ma-4"
            height="350"
            width="270"
            :class="{ 'border-primary': isSelected }"
          >
            <div class="d-flex fill-height align-center justify-center">
              <v-img :src="image.picturePath" alt="Image" class="image-item" />
            </div>
          </v-card>
        </div>
      </v-slide-group-item>
    </v-slide-group>
    <v-dialog v-model="dialog" max-width="100%" height="100%">
      <v-card class="full-screen-card">
        <v-btn icon class="nav-button close" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-btn icon class="nav-button prev" @click="prevImage">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-img :src="images[model].picturePath" alt="Selected Image" class="full-image" />

        <v-btn icon class="nav-button next" @click="nextImage">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<style scoped>
.full-screen-card {
  width: 97vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.image-item {
  width: 150px;
  height: auto;
  margin: 10px;
}
.image-item-big {
  width: 300px;
  height: auto;
  margin: 10px;
}
.border-primary {
  border: 4px solid blue !important;
}
.absolute-center {
  position: absolute;
  top: 90%; /* Adjust as needed to position the icon vertically */
  left: 50%;
  transform: translate(-50%, -50%);
}
.icon-above-card {
  position: relative;
  text-align: center; /* Center the icon horizontally */
  margin-bottom: 10px; /* Adjust the margin as needed */
}

.icon-above-card > .v-card {
  margin-top: 10px; /* Add space between the icon and the card */
}
.full-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
.prev {
  left: 10px;
}
.next {
  right: 20px;
}
.close {
  top: 10px;
  right: 20px;
  transform: none;
  position: absolute;
  z-index: 10;
}
.delete-icon {
  transition: color 0.3s;
}
.delete-icon:hover {
  color: red; /* Change this to the desired hover color */
}
</style>
