import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Medicamento from 'src/app/interfaces/medicamento.interface';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import Swal from 'sweetalert2';
import Toast from 'sweetalert2'

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent {
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


  addStock(med: Medicamento) {
    Swal.fire({
      title: `¿Está seguro?`,
      text: ` Esta acción es irreversible y modificará el stock permanentemente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Añadir',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const cantidad = this.cantidadInput.get('cantidad')?.value;
        console.log(cantidad);
        console.log(med);
        this.cantidadInput.reset();
        if (cantidad > 0) {
          let oldStock = med.stock.toString();
          let newStock = parseInt(oldStock) + cantidad;

          const medicamento = { ...med, stock: newStock };
          this.medicamentoService.updateMedicamento(medicamento, med.id)
            .then(() => {
              Toast.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'El medicamento se ha actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
              });
            })
            .catch((error) => {
              Toast.fire({
                icon: 'error',
                title: 'Error',
                text: 'El medicamento no ha podido ser actualizado',
                showConfirmButton: false,
                timer: 1500
              });
              console.log(error);
            });
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Error',
            text: 'El medicamento no ha podido ser actualizado',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });

  }
}
