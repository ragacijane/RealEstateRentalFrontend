import type {
  Property,
  ItemBody,
  PicturesBody,
  SearchPropertyParams,
  SearchQueryParams
} from './types'

export const resizeImage = (file: File): Promise<{ file: File; dataUrl: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string

      img.onload = () => {
        const originalWidth = img.width
        const originalHeight = img.height
        let newWidth = originalWidth
        let newHeight = originalHeight

        // Resize only if larger than 1500
        if (originalWidth > 1500 || originalHeight > 1500) {
          const aspectRatio = originalWidth / originalHeight
          if (aspectRatio > 1) {
            // Wider than tall
            newWidth = 1500
            newHeight = 1500 / aspectRatio
          } else {
            // Taller than wide or square
            newHeight = 1500
            newWidth = 1500 * aspectRatio
          }
        }

        // Create a canvas to draw the resized image
        const canvas = document.createElement('canvas')
        canvas.width = newWidth
        canvas.height = newHeight
        const ctx = canvas.getContext('2d')

        if (ctx) {
          ctx.drawImage(img, 0, 0, newWidth, newHeight)
        }

        // Generate the data URL
        const resizedDataUrl = canvas.toDataURL(file.type)

        // Convert the data URL back to a File object
        const resizedFile = dataUrlToFile(resizedDataUrl, file.name)

        // Resolve with both the resized File and data URL
        resolve({ file: resizedFile, dataUrl: resizedDataUrl })
      }
    }

    reader.readAsDataURL(file)
  })
}

// Helper function to convert a data URL to a File object
const dataUrlToFile = (dataUrl: string, fileName: string): File => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], fileName, { type: mime })
}

export const createFormData = (body: PicturesBody) => {
  const formData = new FormData()
  if (body.newImages.length > 0) {
    body.newImages.forEach((image) => {
      formData.append('newImages', image)
    })
  } else {
    formData.append('newImages', '')
  }

  if (body.deletedPhotos.length > 0) {
    body.deletedPhotos.forEach((photo) => {
      formData.append('deletedPhotos', photo)
    })
  } else {
    formData.append('deletedPhotos', '')
  }

  if (body.sequenceArray.length > 0) {
    body.sequenceArray.forEach((photo) => {
      formData.append('sequenceArray', photo)
    })
  } else {
    formData.append('sequenceArray', '')
  }
  return formData
}

export const getEmptyPicturesBody = (): PicturesBody => {
  const emptyItem = {
    sequenceArray: [],
    deletedPhotos: [],
    newImages: []
  }
  return emptyItem
}

export const getEmptyParams = (): SearchPropertyParams => {
  const emptyItem = {
    ID: null,
    type: null,
    phoneNumber: null,
    borough: null,
    squareFootageMin: null,
    squareFootageMax: null,
    category: null,
    structure: null,
    equipment: null,
    street: null,
    priceMin: null,
    priceMax: null
  }
  return emptyItem
}

export const getEmptyItem = (): Property => {
  const emptyItem = {
    idProperty: 0,
    name: '',
    phone: '',
    street: '',
    number: '',
    email: '',
    contract: '',
    moreInfo: '',
    category: 0,
    type: {
      idType: 0,
      typeName: ''
    },
    structure: {
      idStructure: 0,
      structureName: ''
    },
    rooms: '',
    squareFootage: '',
    bathrooms: '',
    heating: '',
    equipment: {
      equipmentName: '',
      idEquipment: 0
    },
    borough: {
      boroughName: '',
      idBorough: 0
    },
    floor: '',
    active: 0,
    visible: 0,
    deposit: 0,
    price: '',
    title: '',
    description: '',
    thumbnail: ''
  }
  return emptyItem
}

export const createQueryParams = (filters: SearchQueryParams) => {
  const queryParams = {
    idTy: filters.idTy ?? null,
    idBors: filters.idBors?.length ? filters.idBors.join(',') : null,
    sqMin: filters.sqMin || null,
    sqMax: filters.sqMax || null,
    cat: filters.cat ?? null,
    idSt: filters.idSt ?? null,
    idEq: filters.idEq ?? null,
    prMin: filters.prMin || null,
    prMax: filters.prMax || null
  }

  // Remove null values from the queryParams object
  const filteredQueryParams = (Object.keys(queryParams) as Array<keyof typeof queryParams>)
    .filter((key) => queryParams[key] !== null && queryParams[key] !== undefined)
    .reduce(
      (acc, key) => {
        const value = queryParams[key]
        if (value !== null && value !== undefined) {
          acc[key] = value as string | number // Type assertion to avoid the error
        }
        return acc
      },
      {} as Record<string, string | number>
    )
  return filteredQueryParams
}
