import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
    standalone: true,
    imports: [FormsModule, RouterLink]
})
export class SignupComponent implements OnInit{

  signupObj: any = {
    'name': '',
    'email': '',
    'password': '',
    'confirm_password': ''
  }

  constructor(private api: ApiService,
    private router: Router) { }


    ngOnInit(): void {
      sessionStorage.clear();
    }

  create_user(){
    this.api.create_user(this.signupObj).subscribe(response => {
      if (response.success) {
        alert(response.message);
        this.router.navigateByUrl('/dashboard');
      } else {
        alert(response.message);
      }
    });
  }
}
