import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FormsModule, RouterLink]
})
export class LoginComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  loginObj: any = {
    "email": '',
    "password": ''
  }

  ngOnInit(): void {

  }

  user_login() {
    if(this.loginObj.email === '' || this.loginObj.password === ''){
      this.toastr.warning('Both fields are required!');
    }
    else {
      this.api.user_login(this.loginObj).subscribe(
        (response) => {
          if (response.success) {
            console.log(response.message);
            this.router.navigateByUrl('/dashboard');
            sessionStorage.setItem('user_token', response.data.user_token);
          } else {
            this.toastr.error(response.message, 'Login Failed');
          }
        },
        (error) => {
          console.log(error);
          if (error.status === 400) {
            // Assuming your API returns error messages in the response body
            const errorMessage = error.error.message || 'Invalid credentials';
            this.toastr.error(errorMessage, 'Login Failed');
          } else {
            this.toastr.error('An unexpected error occurred', 'Login Failed');
          }
        }
      );
    }
  };
}
