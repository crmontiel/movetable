import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargaDbService {

  constructor() { }


  cargaDb() {
    return {
      tablas: [
        {
          titulo: "Tabla 1",
          id: "",
          style: {
            top: '140px',
            left: '573px'
          },
          camps: [
            {
              id: "",
              pk: true,
              nombre: "id",
              type: "integer"
            },
            {
              id: "",
              pk: false,
              nombre: "Descripcion",
              type: "varchar"
            },
            {
              id: "",
              pk: false,
              nombre: "id_tabla3",
              type: "varchar"
            }
          ]
        },
        {
          titulo: "Tabla 2",
          id: "",
          style: {
            top: '111px',
            left: '1114px'
          },
          camps: [
            {
              id: "",
              pk: true,
              nombre: "id",
              type: "integer"
            },
            {
              id: "",
              pk: false,
              nombre: "Descripcion",
              type: "varchar"
            },
            {
              id: "",
              pk: false,
              nombre: "fecha",
              type: "date"
            }
          ]
        },
        {
          titulo: "Tabla 3",
          id: "",
          style: {
            top: '388px',
            left: '643px'
          },
          camps: [
            {
              id: "",
              pk: true,
              nombre: "id",
              type: "integer"
            },
            {
              id: "",
              pk: false,
              nombre: "Descripcion",
              type: "varchar"
            },
            {
              id: "",
              pk: false,
              nombre: "fecha",
              type: "date"
            }
          ]
        }
      ],
      fk: [
        // {
        //   t1: 'fk0Descripcion1',
        //   t2: 'fk1id0',
        //   px: null
        // },
        {
          t1: 'fk0id_tabla32',
          t2: 'fk2id0',
          px: null
        }
      ]
    }

  }
}
