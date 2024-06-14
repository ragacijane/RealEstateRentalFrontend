import type { OwnerItem, OwnerItemBodyRequest, SearchPropertyParams } from './types'

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

export function createOwnerItemBodyRequest(
  item: OwnerItem,
  selectedTags: number[]
): OwnerItemBodyRequest {
  return {
    name: item.name,
    email: item.email,
    phone: item.phone,
    contract: item.contract,
    street: item.street,
    number: item.number,
    moreInfo: item.moreInfo,
    ///
    typeId: item.property.type.idType,
    structureId: item.property.structure.idStructure,
    rooms: item.property.rooms,
    squareFootage: item.property.squareFootage,
    bathrooms: item.property.bathrooms,
    heating: item.property.heating,
    equipmentId: item.property.equipment.id,
    boroughId: item.property.borough.id,
    floor: item.property.floor,
    active: item.property.active,
    visible: item.property.visible,
    deposit: item.property.deposit,
    price: item.property.price,
    category: item.property.category,
    title: item.property.title,
    description: item.property.description,
    selectedTags: selectedTags
  }
}

export const getEmptyItem = (): OwnerItem => {
  const emptyItem = {
    idOwner: 0,
    name: '',
    phone: '',
    street: '',
    number: '',
    email: '',
    contract: '',
    moreInfo: '',
    property: {
      idProperty: 0,
      category: 0,
      type: {
        idType: 0,
        typeName: ''
      },
      structure: {
        idStructure: 0,
        structureType: ''
      },
      rooms: 0,
      squareFootage: 0,
      bathrooms: 0,
      heating: '',
      equipment: {
        equipmentType: '',
        id: 0
      },
      borough: {
        boroughName: '',
        id: 0
      },
      floor: '',
      active: 0,
      visible: 0,
      deposit: 0,
      price: 0,
      title: '',
      description: ''
    }
  }
  return emptyItem
}
