import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Medicamento from 'src/app/interfaces/medicamento.interface';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import Swal from 'sweetalert2';
import Toast from 'sweetalert2';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent {

  faCart = faCartShopping;
  medicamentos: Medicamento[];
  cantidadInput: FormGroup;
  medicamentoSeleccionado: Medicamento;

  totalPrice: number = 0;

  medicamentosOrder: { med: Medicamento, cantidad: number }[] = [];

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
    this.medicamentosOrder.push({ med, cantidad });
    this.cantidadInput.reset();
  }

  limpiarCarro() {
    this.medicamentosOrder = [];
    this.totalPrice = 0;
    Toast.fire({
      icon: 'success',
      title: 'Carro vaciado',
      showConfirmButton: false,
      timer: 1000
    });
  }

  verCarro() {
    let htmlContent = '';
    this.totalPrice = 0;
    for (const cartItem of this.medicamentosOrder) {
      console.log('totalPrice ' + this.totalPrice);
      console.log('precio ' + cartItem.med.precio);
      console.log('cantidad ' + cartItem.cantidad);
      let price = cartItem.med.precio.toString();
      let cantidad = cartItem.cantidad.toString();

      console.log('price ' + price)
      console.log('parseFloat(price) ' + parseFloat(price))

      this.totalPrice += parseFloat(price) * parseFloat(cantidad);
      console.log('nuevo totalPrice ' + this.totalPrice)

      let nuevoStock = cartItem.med.stock - cartItem.cantidad;
      console.log('nuevoStock ' + nuevoStock);

      htmlContent += `<p>${cartItem.med.nombre} &nbsp (${cartItem.cantidad}uds)   &nbsp ${cartItem.med.precio}€/unidad</p>`;
      Swal.fire({
        title: `Ticket:`,
        html: htmlContent + `<h2 class="fw-bold">Total: ` + this.totalPrice + `€</h2>`,
        showCancelButton: true,
        confirmButtonText: 'Finalizar pedido',
        cancelButtonText: 'Seguir comprando',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const medicamento = { ...cartItem.med, stock: nuevoStock };
          this.medicamentoService.updateMedicamento(medicamento, cartItem.med.id)
            .then(() => {
              console.log('Stock actualizado para el medicamento ' + cartItem.med.id + ': ' + nuevoStock);
            })
            .catch((error) => {
              console.error('Error al actualizar el stock del medicamento ' + cartItem.med.id + ':', error);
            });
          this.medicamentosOrder = [];
          this.totalPrice = 0;
          Toast.fire({
            icon: 'success',
            title: 'Pedido realizado',
            text: 'Se ha actualizado el stock de medicamentos',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });

    }
    console.log(this.totalPrice);
    return this.totalPrice;
  }
}
