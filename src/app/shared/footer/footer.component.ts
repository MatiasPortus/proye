import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  

  constructor(
    public loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
}
