import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    standalone: true,
    imports: [NgFor]
})
export class ProductsComponent implements OnInit {

  products: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetch_products();
  }

  fetch_products() {
    this.api.fetch_products().subscribe(response => {
    this.products = response.products;
    // console.log(this.products)
    }, error => {
      console.log(error.message);
    })
  }

  add_to_cart(productId: string){
    this.api.add_to_cart(productId).subscribe( response => {
    }, error => {
      console.log(error.message);
    });
  }

}
