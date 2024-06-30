<script lang="ts">
import { updateImages } from '@/services/adminService'
import { fetchImages } from '@/services/dataService'
import type { PicturesBody } from '@/typesAndUtils/types'
import { createFormData, getEmptyPicturesBody, getImageNameFromPath } from '@/typesAndUtils/utils'
import { defineComponent, onMounted, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'EditPicturesForm',
  props: {
    propertyId: {
      type: Number as PropType<number>,
      required: true
    },
    thumbnail: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props, { emit }) {
    const images = ref<string[]>([])
    const model = ref<number>(-1)
    const body = ref<PicturesBody>(getEmptyPicturesBody(''))
    const oldLength = ref<number>(0)
    const thumbnailIndex = ref<number>(-1)
    const dialog = ref<boolean>(false)
    const selectedImage = ref<string>('')
    const deletionMode = ref<boolean>(false)

    onMounted(async () => {
      if (props.propertyId > 0) {
        images.value = await fetchImages(props.propertyId)
      }
      if (images.value.length > 0) {
        for (let i = 0; i < images.value.length; i++) {
          if (props.thumbnail == getImageNameFromPath(images.value[i])) {
            thumbnailIndex.value = i
            break
          }
        }
        body.value.thumbnailPhoto = props.thumbnail
        model.value = thumbnailIndex.value
        oldLength.value = images.value.length
      }
    })

    const handleFileInputChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files) {
        handleFiles(target.files)
      }
    }

    const handleFiles = (fileList: FileList) => {
      // Convert FileList to array and assign to ref
      const currFiles = ref<File[]>([])
      currFiles.value = Array.from(fileList)
      currFiles.value.forEach((file) => {
        const reader = new FileReader()

        reader.onload = () => images.value.push(reader.result as string)

        reader.readAsDataURL(file)
        body.value.newImages.push(file)
      })
      if (thumbnailIndex.value === -1) {
        model.value = 0
        setThumbnailIndex(0)
        body.value.isThumbInNew = 'true'
      }
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
        const [check, rest] = images.value[index].split(':')
        const imageToDelete = getImageNameFromPath(images.value[index])
        images.value.splice(index, 1)

        if (check == 'data') {
          const deletingIndex = index - oldLength.value
          body.value.newImages.splice(deletingIndex, 1)
        } else {
          oldLength.value -= 1
          body.value.deletedPhotos.push(imageToDelete)
        }
        if (images.value.length > 0) {
          index == thumbnailIndex.value
            ? setThumbnailIndex(0)
            : index < thumbnailIndex.value
              ? setThumbnailIndex(thumbnailIndex.value - 1)
              : null
        } else {
          model.value = -1
          setThumbnailIndex(-1)
        }
        model.value = thumbnailIndex.value
      }
      update()
    }

    const setThumbnailIndex = (index: number) => {
      thumbnailIndex.value = index
      if (index > -1) {
        if (index >= oldLength.value) {
          body.value.thumbnailPhoto = body.value.newImages[index - oldLength.value].name
          body.value.isThumbInNew = 'true'
        } else {
          body.value.thumbnailPhoto = getImageNameFromPath(images.value[index])
          body.value.isThumbInNew = 'false'
        }
      } else {
        body.value.isThumbInNew = 'false'
        body.value.thumbnailPhoto = ''
      }
      update()
    }

    const update = () => {
      emit('updated-pictures', {
        picturesFormData: createFormData(body.value)
      })
    }

    const openDialog = (image: string, index: number) => {
      model.value = index
      selectedImage.value = image
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
      thumbnailIndex,
      dialog,
      selectedImage,
      deletionMode,
      //functions
      handleFileInputChange,
      openFileInput,
      deletePhoto,
      setThumbnailIndex,
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
      <v-btn icon class="mx-2" @click="setThumbnailIndex(model ?? -1)">
        <v-icon color="default">mdi-home</v-icon>
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
        <div @dblclick="openDialog(image, index)" @click="select">
          <div class="icon-above-card">
            <v-icon v-if="deletionMode" @click="deletePhoto(index)" class="delete-icon"
              >mdi-delete</v-icon
            >
            <v-icon v-else-if="index == thumbnailIndex" color="primary">mdi-home</v-icon>
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
              <v-img :src="image" alt="Image" class="image-item" />
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

        <v-img :src="images[model]" alt="Selected Image" class="full-image" />

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
