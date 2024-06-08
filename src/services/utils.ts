import { BACKEND_URL } from "./constant";
import type { OwnerItem } from "./types";

export async function uploadImages(id: number,body: any){
    let url = BACKEND_URL+`/upload/`+id;
    data = post<Any>(url,body);
  };

  // utils.ts

export const getEmptyItem = (): OwnerItem => {
  const emptyItem = {
    idOwner: 0,
    name: null,
    phone: null,
    street: null,
    number: null,
    email: null,
    contract: null,
    moreInfo: null,
    property: {
      idProperty: 0,
      category: 0,
      type: {
        idType: null,
        typeName: null,
      },
      structure: {
        idStructure: null,
        structureType: null,
      },
      rooms: null,
      squareFootage: null,
      bathrooms: null,
      heating: null,
      equipment: {
        equipmentType: null,
        id: null,
      },
      borough: {
        boroughName: null,
        id: null,
      },
      floor: null,
      active: null,
      visible: null,
      category: null,
      deposit: null,
      price: null,
      title: null,
      description: null,
    },
  };
  return emptyItem;
};
