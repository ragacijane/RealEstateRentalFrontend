export interface LoginForm {
  username: string
  password: string
}

export interface Pictures {
  id?: number
  pictureName: string
  picturePath: string
  thumbnailPath: string
}

export interface HandleSaveItem {
  item: Property
  index: number
  selectedTags: number[]
  picturesFormData: FormData
}

export interface PicturesBody {
  deletedPhotos: string[]
  newImages: File[]
  sequenceArray: string[]
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
export interface SearchQueryParams {
  idTy: number | null | undefined
  idBors: number[] | null | undefined
  sqMin: string | null | undefined
  sqMax: string | null | undefined
  cat: number | null | undefined
  idSt: number | null | undefined
  idEq: number | null | undefined
  prMin: string | null | undefined
  prMax: string | null | undefined
  page: number
  size: number
  sort: string
  ascending: boolean
}

export interface ItemBody {
  item: Property
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
  structureName: string
}

export interface Tag {
  idTag: number
  tagName: string
}

export interface Equipment {
  idEquipment: number
  equipmentName: string
}

export interface PropertyProjected {
  idProperty: number
  category: number
  borough: Borough
  price: string
  type: Types
  deposit: number
  structure: Structure
  floor: string
  bathrooms: string
  equipment: Equipment
  rooms: string
  squareFootage: string
  heating: string
  active: number
  visible: number
  title: string
  description: string
  thumbnail: string
}

export interface Property {
  name: string
  phone: string
  street: string
  number: string
  email: string
  contract: string
  moreInfo: string

  idProperty: number
  category: number
  borough: Borough
  price: string
  type: Types
  deposit: number
  structure: Structure
  floor: string
  bathrooms: string
  equipment: Equipment
  rooms: string
  squareFootage: string
  heating: string
  active: number
  visible: number
  title: string
  description: string
  thumbnail: string
}
