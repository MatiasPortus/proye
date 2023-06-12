import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Medicamento from 'src/app/interfaces/medicamento.interface';
import { MedicamentoService } from 'src/app/services/medicamento.service';import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-med',
  templateUrl: './edit-med.component.html',
  styleUrls: ['./edit-med.component.css']
})
export class EditMedComponent {

 editMedicamentoForm: FormGroup;
 medicamento: Medicamento;
 id: string = this.route.snapshot.params['id'];

  constructor(
    private medicamentoService: MedicamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.editMedicamentoForm = new FormGroup({
      nombre: new FormControl(),
      laboratorio: new FormControl(),
      formato: new FormControl(),
      dosis: new FormControl(),
      imagen: new FormControl(),
      precio: new FormControl(),
      stock: new FormControl(),
    })
  }

  ngOnInit(): void {
    Swal.showLoading();
    this.getMedicamento();
    console.log(this.route.snapshot.params['edit-med']);
    console.log(this.medicamento);
  }

  getMedicamento() {
    this.medicamentoService
      .getMedicamentoById(this.route.snapshot.params['id'])
      .subscribe({
        next: (resp) => {
          console.log(resp);
          if (resp){
          //setting the candidate data on the update form
          this.editMedicamentoForm.setValue({
            nombre: resp.nombre,
            laboratorio: resp.laboratorio,
            formato: resp.formato,
            dosis: resp.dosis,
            imagen: resp.imagen,
            precio: resp.precio,
            stock: resp.stock
          });
          this.medicamento = resp;
          
        } else{
          this.toastr.error(
            'No se ha podido recuperar la información del medicamento'
          );
        }Swal.close();
        },
        error: () => {
          this.toastr.error(
            'No se ha podido recuperar la información delmedicamento'
          );
          Swal.close();
        },
      });
  }


  async onSubmit() {
    console.log(this.editMedicamentoForm.value)
    const response = await this.medicamentoService.updateMedicamento(this.editMedicamentoForm.value, this.id);
    console.log(response);
    this.editMedicamentoForm.reset();
    this.router.navigate(['/all-meds']);
  }
}
