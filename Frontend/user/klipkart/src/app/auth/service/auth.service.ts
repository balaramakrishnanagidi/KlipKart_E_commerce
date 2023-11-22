import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = sessionStorage.getItem('user_token');

  private isAuthenticatedValue = false;

  isAuthenticated(): boolean {
    if(this.token != null){
      this.isAuthenticatedValue = true;
    }
    return this.isAuthenticatedValue;
  }


  

}
