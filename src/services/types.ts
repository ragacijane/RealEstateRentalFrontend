export interface Borough {
    id: number;
    boroughName: string;
  }
  
  export interface Type {
    idType: number;
    typeName: string;
  }
  
  export interface Structure {
    idStructure: number;
    structureType: string;
  }
  
  export interface Equipment {
    id: number;
    equipmentType: string;
  }
  
  // Define the Property interface with nested structures
  export interface Property {
    idProperty: number;
    category: number;
    borough: Borough;
    price: number;
    type: Type;
    deposit: number;
    structure: Structure;
    floor: number;
    bathrooms: number;
    equipment: Equipment;
    rooms: number;
    squareFootage: number;
    heating: string;
    title: string;
    description: string;
  }
  
  // Define the PropertyItem interface with the Property interface included
  export interface OwnerItem {
    idOwner: number;
    name: string;
    phone: string;
    street: string;
    number: string;
    email: string;
    contract: string;
    moreInfo: string;
    property: Property;
  }