export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// export const BACKEND_URL = 'https://test-rental-1e845c8834a8.herokuapp.com'
export const allCategories = [
  { id: 0, value: 'Iznajmljivanje' },
  { id: 1, value: 'Prodaja' },
  { id: 2, value: 'Stan na dan' }
]

export const yesOrNo = [
  { id: 0, value: 'NE' },
  { id: 1, value: 'DA' }
]

interface TableHeader {
  title: any
  key: any
  align?: any
  sortable?: any
}

export const headersList: Array<TableHeader> = [
  {
    title: '',
    key: 'data-table-expand'
  },
  {
    title: 'ID',
    align: 'start',
    key: 'property.idProperty'
  },
  {
    title: 'Kategorija',
    align: 'center',
    key: 'category',
    sortable: false
  },
  {
    title: 'Tip',
    align: 'center',
    key: 'property.type.typeName',
    sortable: false
  },
  {
    title: 'Struktura',
    align: 'start',
    key: 'property.structure.structureType',
    sortable: false
  },
  {
    title: 'Opština',
    align: 'center',
    key: 'property.borough.boroughName',
    sortable: false
  },
  {
    title: 'Ulica',
    align: 'center',
    key: 'street',
    sortable: false
  },
  {
    title: 'Nameštenost',
    align: 'start',
    key: 'property.equipment.equipmentType',
    sortable: false
  },
  {
    title: 'Površina',
    align: 'center',
    key: 'property.squareFootage'
  },
  {
    title: 'Cena',
    align: 'center',
    key: 'property.price'
  },
  {
    title: 'Opcije',
    align: 'center',
    key: 'edit',
    sortable: false
  }
]
