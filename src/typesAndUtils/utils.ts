import type { OwnerItem, OwnerItemBodyRequest } from "./types";

export function createOwnerItemBodyRequest(item: OwnerItem,selectedTags: number[]): OwnerItemBodyRequest {
  return {
    name: item.name,
    phone: item.phone,
    street: item.street,
    number: item.number,
    email: item.email,
    contract: item.contract,
    moreInfo: item.moreInfo,
    category: item.property.category,
    boroughId: item.property.borough.id,
    price: item.property.price,
    typeId: item.property.type.idType,
    deposit: item.property.deposit,
    structureId: item.property.structure.idStructure,
    floor: item.property.floor,
    bathrooms: item.property.bathrooms,
    equipmentId: item.property.equipment.id,
    rooms: item.property.rooms,
    squareFootage: item.property.squareFootage,
    heating: item.property.heating,
    active: item.property.active,
    visible: item.property.visible,
    title: item.property.title,
    description: item.property.description,
    selectedTags: selectedTags
  };
}


export const getEmptyItem = (): OwnerItem => {
  const emptyItem = {
    idOwner: 0,
    name: "",
    phone: "",
    street: "",
    number: "",
    email: "",
    contract: "",
    moreInfo: "",
    property: {
      idProperty: 0,
      category: 0,
      type: {
        idType: 0,
        typeName: "",
      },
      structure: {
        idStructure: 0,
        structureType: "",
      },
      rooms: 0,
      squareFootage: 0,
      bathrooms: 0,
      heating: "",
      equipment: {
        equipmentType: "",
        id: 0,
      },
      borough: {
        boroughName: "",
        id: 0,
      },
      floor: 0,
      active: 0,
      visible: 0,
      deposit: 0,
      price: 0,
      title: "",
      description: "",
    },
  };
  return emptyItem;
};