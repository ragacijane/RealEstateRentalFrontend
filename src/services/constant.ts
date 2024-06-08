export const BACKEND_URL = "http://localhost:8081";
interface TableHeader{
  tittle: any,
  key: any,
  align: any,
  sortable: any
}
export const headersList: Array<TableHeader>=  [
      {
        title: "",
        key: "data-table-expand",
      },
      {
        title: "ID",
        align: "start",
        key: "property.idProperty",
      },
      {
        title: "Kategorija",
        align: "start",
        key: "category",
      },
      {
        title: "Tip",
        align: "start",
        key: "property.type.typeName",
      },
      {
        title: "Struktura",
        align: "start",
        key: "property.structure.structureType",
      },
      {
        title: "Opština",
        align: "start",
        key: "property.borough.boroughName",
      },
      {
        title: "Ulica",
        align: "start",
        key: "street",
      },
      {
        title: "Nameštenost",
        align: "start",
        key: "property.equipment.equipmentType",
      },
      {
        title: "Površina",
        align: "start",
        key: "property.squareFootage",
      },
      {
        title: "Cena",
        align: "start",
        key: "property.price",
      },
      {
        title: "Opcije",
        align: "center",
        key: "edit",
        sortable: false,
      },
    ];
  