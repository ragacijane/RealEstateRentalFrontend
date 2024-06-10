export interface FetchedPictures {
  name: string
}

export interface OwnerItemBodyRequest {
  name: string
  email: string
  phone: string
  contract: string
  street: string
  number: string
  moreInfo: string
  /////////////////////
  typeId: number
  structureId: number
  rooms: number
  squareFootage: number
  bathrooms: number
  heating: string
  equipmentId: number
  boroughId: number
  floor: number
  active: number
  visible: number
  deposit: number
  price: number
  category: number
  title: string
  description: string | null
  selectedTags: number[]
}

export interface Borough {
  id: number
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
  id: number
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
  floor: number
  bathrooms: number
  equipment: Equipment
  rooms: number
  squareFootage: number
  heating: string
  active: number
  visible: number
  title: string
  description: string | null
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
