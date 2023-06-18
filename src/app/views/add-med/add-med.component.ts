import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import Swal from 'sweetalert2';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-add-med',
  templateUrl: './add-med.component.html',
  styleUrls: ['./add-med.component.css']
})
export class AddMedComponent {

  addMedicamentoForm: FormGroup;

  constructor(
    private medicamentoService: MedicamentoService,
    private router: Router,
    private toastr: ToastrService,
    private storage : Storage
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
    this.toastr.success('El medicamento se ha añadido correctamente', 'Éxito');
    console.log(response);
    this.addMedicamentoForm.reset();
    this.router.navigate(['/app-home']);
  }

  onFileUpload($event : any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

    
    uploadBytes(imgRef, file)
    .then(async response => {
        console.log(response);
        const url = await getDownloadURL(imgRef);
        this.addMedicamentoForm.value.imagen = url;
        console.log(url);
      })
    .catch(error => console.log(error));
  }
}
