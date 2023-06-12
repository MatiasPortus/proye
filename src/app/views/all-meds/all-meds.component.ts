import { Component } from '@angular/core';
import Medicamento from 'src/app/interfaces/medicamento.interface';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-all-meds',
  templateUrl: './all-meds.component.html',
  styleUrls: ['./all-meds.component.css']
})
export class AllMedsComponent {

  medicamentos: Medicamento[];
  medicamentosFiltrados: Medicamento[];

  constructor(
    private medicamentoService: MedicamentoService
  ) {
    this.medicamentos = this.medicamentosFiltrados
  }

  ngOnInit(): void {
    this.medicamentoService.getAllMedicamentos().subscribe(medicamentos => {
      this.medicamentosFiltrados  = medicamentos;
    })
  }

  async onClickDelete(medicamento: Medicamento) {
    Swal.fire({
      title:  `¿Eliminar ${medicamento.nombre}?`,
      text: ` Esta acción es irreversible y el medicamento será eliminado permanentemente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      // If the user confirms, the candidate will be deleted
      if (result.isConfirmed) {
        const response = await this.medicamentoService.deleteMedicamento(medicamento);
        console.log(response);
      }
    });

  }

  onInputChange2(value: string) {
    if (value.trim() !== '') {
      // Filtra los medicamentos según el valor del input
      this.medicamentosFiltrados = this.medicamentos.filter(
        (medicamento) =>
          medicamento.nombre.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.medicamentosFiltrados = this.medicamentos; // Si el input está vacío, muestra todos los medicamentos.
    }
  }

  onInputChange(event: any) {
    const target = event.target as HTMLInputElement; // Asegurarse de que el objetivo del evento sea un elemento de entrada
    const value = target.value; // Acceder a la propiedad 'value'
    if (value.trim() !== '') {
      this.medicamentosFiltrados = this.medicamentos.filter(
        (medicamento) =>
          medicamento.nombre.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.medicamentosFiltrados = this.medicamentos;
    }
  }
  
}
