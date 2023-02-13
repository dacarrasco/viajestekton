export enum DocumentosEnum {
    DNI = "DNI",
    CarnetExtranjeria = "CE",
    Pasaporte = "Pasaporte",
  }
  
  export interface IPasajero {
    name: string;
    lastName: string;
    nacionalidad: string;
    tipoDocumento: DocumentosEnum;
    numeroDocumento: string;
  }