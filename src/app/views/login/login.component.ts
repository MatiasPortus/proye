import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value)
    this.loginService.login(this.loginForm.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/app-home']);
      })
      .catch(error => console.log(error));
  }

  onClick() {
    this.loginService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.router.navigate(['/app-home']);
      })
      .catch(error => console.log(error))
  }
}
