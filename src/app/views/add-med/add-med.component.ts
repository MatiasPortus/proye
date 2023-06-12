import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicamentoService } from 'src/app/services/medicamento.service';

@Component({
  selector: 'app-add-med',
  templateUrl: './add-med.component.html',
  styleUrls: ['./add-med.component.css']
})
export class AddMedComponent {

  addMedicamentoForm: FormGroup;

  constructor(
    private medicamentoService: MedicamentoService,
    private router: Router
  ) {
    this.addMedicamentoForm = new FormGroup({
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
  }

  async onSubmit() {
    console.log(this.addMedicamentoForm.value)
    const response = await this.medicamentoService.addMedicamento(this.addMedicamentoForm.value);
    console.log(response);
    this.addMedicamentoForm.reset();
    this.router.navigate(['/home']);
  }
}
