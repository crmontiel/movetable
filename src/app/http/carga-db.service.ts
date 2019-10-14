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
          titulo: "Prueba data",
          id: "",
          style: {
            top: '73px',
            left: '209px'
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
            }
          ]
        },
        {
          titulo: "Prueba 2",
          id: "",
          style: {
            top: '277px',
            left: '563px'
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
        {
          t1: 'fk0Descripcion1',
          t2: 'fk1id0',
          px: null
        }
      ]
    }

  }
}
