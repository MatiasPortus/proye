import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;


  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService,) {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit():void {

  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.loginService.register(this.registerForm.value)
      .then(response => {
        
        console.log(response);
        this.toastr.success('Registrado con exito');
        this.router.navigate(['login']);
      })
      .catch(error => 
        console.log(error));
  }

  
}
