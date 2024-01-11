// product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      state(
        'in',
        style({ opacity: 1, backgroundColor: '#2e9264', color: '#ffffff' })
      ),
      transition(':enter', [
        style({ opacity: 0, backgroundColor: '#2e9264', color: '#ffffff' }),
        animate(500), // Adjust the duration as needed
      ]),
    ]),
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Use ActivatedRoute to get the current route
    this.route.url.subscribe((urlSegments) => {
      const currentRoute = urlSegments.join('/');

      // Check if the current route matches the expected format
      if (currentRoute.startsWith('search/')) {
        // Extract searchTerm from the route
        const searchTerm = currentRoute.replace('search/', '');

        // Call the searchProducts method instead of getProducts
        this.productService.searchProducts(searchTerm).subscribe(
          (data: Product[]) => {
            this.products = data;
          },
          (error) => {
            console.error('Error fetching products', error);
          }
        );
      } else {
        // Call the getProducts method for other routes
        this.productService.getProducts().subscribe(
          (data: Product[]) => {
            console.log(data);
            if (currentRoute.startsWith('category/')) {
              const categoryName = currentRoute.replace('category/', '');
              console.log(categoryName);
              var filteredData = data.filter(function (obj) {
                return (
                  obj.category.toLowerCase().replace(' ', '-') === categoryName
                );
              });

              this.products = filteredData;
            } else {
              this.products = data;
            }
          },
          (error) => {
            console.error('Error fetching products', error);
          }
        );
      }
    });
  }
}
