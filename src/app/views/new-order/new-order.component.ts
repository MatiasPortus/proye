import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Medicamento from 'src/app/interfaces/medicamento.interface';
import { MedicamentoService } from 'src/app/services/medicamento.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent {

  medicamentos: Medicamento[];
  cantidadInput: FormGroup;
  
  totalPrice: number = 0;

  medicamentosOrder: {med:Medicamento, cantidad:number}[] = [];

  constructor(
    private medicamentoService: MedicamentoService
  ) {
  }
  
  ngOnInit(): void {
    this.medicamentoService.getAllMedicamentos().subscribe(medicamentos => {
      this.medicamentos = medicamentos;
    })

    this.cantidadInput = new FormGroup({
      cantidad: new FormControl()
    });
  }

  addToCart(med: Medicamento) {
    const cantidad = this.cantidadInput.get('cantidad')?.value;
    console.log(cantidad);
    console.log(med);
    this.medicamentosOrder.push({ med, cantidad});
  }

  getTotalPrice(): number {
    for (const cartItem of this.medicamentosOrder) {
      console.log('totalPrice '+this.totalPrice);
      console.log('precio '+cartItem.med.precio);
      console.log('cantidad '+cartItem.cantidad);
      let price = cartItem.med.precio.toString();
      let cantidad = cartItem.cantidad.toString();

      console.log('price '+price)
      console.log('parseFloat(price) '+parseFloat(price))

      this.totalPrice += parseFloat(price) * parseFloat(cantidad);
      console.log('nuevo totalPrice '+this.totalPrice)
    }
    console.log(this.totalPrice);
    return this.totalPrice;
  }

  limpiarCarro() {
    this.medicamentosOrder = [];
    this.totalPrice = 0;
  }
}
