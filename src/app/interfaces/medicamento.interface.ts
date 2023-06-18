import { FormControl } from "@angular/forms";

export default interface Medicamento {
  id: string;
  nombre: string;
  laboratorio: string;
  formato: string;
  dosis: string;
  imagen: string;
  precio: number;
  stock: number;
}

/* export interface Medicamento {
  id?: string;
  nombre: string;
  laboratorio: string;
  formato: string;
  dosis: string;
  imagen: new FormControl();
  precio: string;
  stock: number;
}
 */