// product-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(500)]),
    ]),
  ],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  quantity: number = 1; // Declare and initialize the quantity variable
  showError: boolean = false; // Variable to control error message visibility

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private httpClient: HttpClient, // Add HttpClient to the constructor
    private router: Router // Add Router to the constructor
  ) {}

  increaseQuantity() {
    this.quantity++;
  }

  // Function to decrease the quantity
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addToCart() {
    if (!JSON.parse(localStorage.getItem('user')!)) {
      this.router.navigate(['/login']);
    }

    if (this.isInteger(this.quantity)) {
      // Reset error state
      this.showError = false;

      // Make an HTTP request to add the product to the cart
      const addToCartUrl = `${environment.apiUrl}/Products/AddToCart`;
      const userId = JSON.parse(localStorage.getItem('user')!)['id']; // Replace with the actual user ID
      const productId = this.product?.id;

      if (productId) {
        const payload = {
          UserId: userId,
          ProductId: productId,
          Quantity: this.quantity,
        };

        // Make the HTTP POST request
        this.httpClient.post(addToCartUrl, payload).subscribe(
          (response: any) => {
            console.log('Product added to cart successfully:', response);
          },
          (error: any) => {
            // fake error so anyway redirect to cart 
            this.router.navigate(['/cart']);

            // console.error('Error adding product to cart:', error.status);

            // You can handle errors here, e.g., show an error message
          }
        );
      }
    } else {
      // Show error message
      this.showError = true;
    }
  }

  // Validation function to check if a number is an integer
  private isInteger(value: number): boolean {
    return Number.isInteger(value);
  }

  ngOnInit() {
    const productId = parseInt(
      this.route.snapshot.paramMap.get('id') || '',
      10
    );

    if (!isNaN(productId)) {
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.product = products.find((p) => p.id === productId);
      });
    } else {
      // Handle invalid productId (e.g., redirect to an error page)
      console.error('Invalid product ID');
    }
  }

  getStars(rating: number): number[] {
    const roundedRating = Math.round(rating);
    return Array.from({ length: roundedRating }, (_, index) => index + 1);
  }
}
