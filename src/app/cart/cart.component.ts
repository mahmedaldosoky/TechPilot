import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCartData();
  }

  loadCartData(): void {
    const currentUserId = JSON.parse(localStorage.getItem('user')!)['id'];
    const endpoint = `${environment.apiUrl}/users/${currentUserId}/cart`;

    this.http.get(endpoint).subscribe((data: any) => {
      this.cartData = data.cart;
    });
  }

  calculateTotalPayment(): number {
    let totalPayment = 0;

    // Iterate through cart items and calculate total
    for (const item of this.cartData) {
      totalPayment += item.quantity * item.product.price;
    }

    return totalPayment;
  }

  // increaseQuantity(item: any, currentQuantity: any): void {
  //   const payload = {
  //     UserId: JSON.parse(localStorage.getItem('user')!)['id'],
  //     ProductId: item.product.id,
  //     Quantity: item.quantity + 1,
  //   };

  //   console.log(payload);

  //   const addToCartEndpoint = 'https://localhost:7229/api/Products/AddToCart';

  //   this.http.post(addToCartEndpoint, payload).subscribe(
  //     () => {
  //       // If the API call is successful, update the local cartData
  //       this.loadCartData();
  //     },
  //     (error) => {
  //       this.loadCartData();

  //       console.error('Error increasing quantity:', error);
  //     }
  //   );
  // }

  // decreaseQuantity(item: any): void {
  //   // Implement logic to decrease the quantity of the selected item
  //   // Similar to increaseQuantity, make an API call to update the quantity on the server
  //   // and then update the local cartData
  //   console.log('Decrease quantity:', item);
  // }

  removeFromCart(item: any): void {
    const request = {
      userId: JSON.parse(localStorage.getItem('user')!)['id'],  // Replace with the actual user ID
      productId: item.product.id
    };

    // Make a POST request to the server API to remove the item from the cart
    this.http.post(`${environment.apiUrl}/Products/RemoveFromCart`, request).subscribe(
      response => {
        console.log('Product removed from the cart successfully', response);
        // You may want to refresh the cart data or update the view here
      },
      error => {
        console.error('Error removing product from the cart', error);
        // Handle error appropriately
      }
    );

    location.reload();
  }

}
