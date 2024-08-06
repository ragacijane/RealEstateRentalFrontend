export interface LoginForm {
  username: string
  password: string
}

export interface PictureDto {
  pictureUrl: string
  pictureName: string
}

export interface HandleSaveItem {
  item: OwnerItem
  index: number
  selectedTags: number[]
  picturesFormData: FormData
}

export interface PicturesBody {
  isThumbInNew: string
  thumbnailPhoto: string
  deletedPhotos: string[]
  newImages: File[]
}

export interface SearchPropertyParams {
  ID: string | null
  type: Types | null | undefined
  phoneNumber: string | null | undefined
  borough: Borough[] | null | undefined
  squareFootageMin: string | null | undefined
  squareFootageMax: string | null | undefined
  category: number | null | undefined
  structure: Structure | null | undefined
  equipment: Equipment | null | undefined
  street: string | null | undefined
  priceMin: string | null | undefined
  priceMax: string | null | undefined
}

export interface ItemBody {
  item: OwnerItem
  tagIds: string
}

export interface Borough {
  idBorough: number
  boroughName: string
}

export interface Types {
  idType: number
  typeName: string
}

export interface Structure {
  idStructure: number
  structureType: string
}

export interface Tag {
  idTag: number
  tagName: string
}

export interface Equipment {
  idEquipment: number
  equipmentType: string
}

export interface Property {
  idProperty: number
  category: number
  borough: Borough
  price: number
  type: Types
  deposit: number
  structure: Structure
  floor: string
  bathrooms: number
  equipment: Equipment
  rooms: number
  squareFootage: number
  heating: string
  active: number
  visible: number
  title: string
  description: string | null
  thumbnail: string
}

export interface OwnerItem {
  idOwner: number
  name: string
  phone: string
  street: string
  number: string
  email: string
  contract: string
  moreInfo: string
  property: Property
}
