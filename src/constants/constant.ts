export const BACKEND_URL = 'http://localhost:8081'

export const allCategories = [
  { id: 0, value: 'Iznajmljivanje' },
  { id: 1, value: 'Prodaja' }
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
    align: 'center',
    key: 'property.idProperty'
  },
  {
    title: 'Kategorija',
    align: 'start',
    key: 'category',
    sortable: false
  },
  {
    title: 'Tip',
    align: 'start',
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
    align: 'start',
    key: 'property.borough.boroughName',
    sortable: false
  },
  {
    title: 'Ulica',
    align: 'start',
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
    align: 'start',
    key: 'property.squareFootage'
  },
  {
    title: 'Cena',
    align: 'start',
    key: 'property.price'
  },
  {
    title: 'Opcije',
    align: 'start',
    key: 'edit',
    sortable: false
  }
]
