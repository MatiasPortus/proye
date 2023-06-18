import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faCoffee = faCoffee;

  constructor(
    public loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  onLogout() {
    this.loginService.logout()
      .then(() => {
        this.router.navigate(['/home']);
        console.log('Logged out');
      })
      .catch((error: any) => console.log(error));
  }
}
