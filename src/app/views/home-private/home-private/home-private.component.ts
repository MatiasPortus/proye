import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home-private',
  templateUrl: './home-private.component.html',
  styleUrls: ['./home-private.component.css']
})
export class HomePrivateComponent {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.loginService.logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error: any) => console.log(error));
  }

}
