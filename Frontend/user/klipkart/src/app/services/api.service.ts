import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  constructor(private http: HttpClient) { }

  private cartUpdatedSubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    const storedCartCount = sessionStorage.getItem('cart_count');
    if (storedCartCount) {
      this.cartUpdatedSubject.next();
    }
  }

  private baseUrl = 'http://192.168.0.158:2025';
  private authToken = sessionStorage.getItem('user_token');

  // post  
  user_login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user_login`, user);
  }
  create_user(new_user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/new_user`, new_user);
  }
  add_to_cart(productId: string): Observable<any> {
    const cart_item = { productId, quantity: 1 };

    const header = this.authToken
      ? new HttpHeaders({ 'Authorization': `${this.authToken}` })
      : new HttpHeaders();

    return this.http.post(`${this.baseUrl}/add_to_cart`, cart_item, { headers: header });
  }

  
  // get
  fetch_banners(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all_banners`);
  }
  fetch_products(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all_products`);
  }
  fetch_cart_items(): Observable<any> {
    const header = this.authToken
      ? new HttpHeaders({ 'Authorization': `${this.authToken}` })
      : new HttpHeaders();

    return this.http.get(`${this.baseUrl}/get_cart_items`, { headers: header });
  }

// put

updateCartQuantity(item: any): Observable<any> {
  const updateQty = {productId: item.productId, quantity: item.quantity}
  return this.http.put(`${this.baseUrl}/get_cart_items`, updateQty);
}

}
