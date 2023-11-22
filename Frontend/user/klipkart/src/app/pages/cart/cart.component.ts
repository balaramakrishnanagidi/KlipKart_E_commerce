import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    standalone: true,
    imports: [NgFor, FormsModule]
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  cartData: any = {};

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.fetch_cart_items();
  }

  fetch_cart_items() {
   this.api.fetch_cart_items().subscribe(response => {
    this.cartData = response;
    this.cartItems = response.cartItems;
    console.log('cartData: ', this.cartData);
    console.log('cartItems: ', this.cartItems);
  });
  }

  updateCartQuantity(item: any) {
    // Call your API to update the cart quantity
    const updatedQuantity = item.quantity;
    console.log(item)

    // Assuming your API endpoint is updateCartQuantity and takes a payload like { itemId: 'itemId', quantity: 'quantity' }
    this.api.updateCartQuantity({ itemId: item.product._id, quantity: updatedQuantity }).subscribe(
      response => {
        // Handle the API response if needed
        console.log('Cart quantity updated successfully:', response);
      },
      error => {
        // Handle the API error if needed
        console.error('Error updating cart quantity:', error);
      }
    );
  }
}
