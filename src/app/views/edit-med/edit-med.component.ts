import { Component } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Medicamento from 'src/app/interfaces/medicamento.interface';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import Swal from 'sweetalert2';
import Toast from 'sweetalert2'



@Component({
  selector: 'app-edit-med',
  templateUrl: './edit-med.component.html',
  styleUrls: ['./edit-med.component.css']
})
export class EditMedComponent {

 editMedicamentoForm: FormGroup;
 medicamento: Medicamento;
 image!: File;
 selectedImage: SafeUrl | undefined;

 id: string = this.route.snapshot.params['id'];
  sanitizer: any;

  constructor(
    private medicamentoService: MedicamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private storage: Storage
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
          Toast.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se ha podido obtener la informacion del medicamento',
            showConfirmButton: false,
            timer: 1500
          });
        }Swal.close();
        },
        error: () => {
          Toast.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se ha podido obtener la informacion del medicamento',
            showConfirmButton: false,
            timer: 1500
          });
          Swal.close();
        },
      });
  }


  async onSubmit() {
    console.log(this.editMedicamentoForm.value)
    const response = await this.medicamentoService.updateMedicamento(this.editMedicamentoForm.value, this.id);
    console.log(response);
    this.toastr.success('El medicamento se ha actualizado correctamente', 'Éxito');
    this.editMedicamentoForm.reset();
    this.router.navigate(['/all-meds']);
  }

  onFileChange($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

    
    uploadBytes(imgRef, file)
    .then(async response => {
        console.log(response);
        const url = await getDownloadURL(imgRef);
        this.editMedicamentoForm.value.imagen = url;
        console.log(url);
      })
    .catch(error => console.log(error));
  }
}
