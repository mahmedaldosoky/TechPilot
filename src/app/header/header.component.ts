import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchTerm: string = '';
  searchResults: Product[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  navigateToSearch() {
    this.router.navigate(['search', this.searchTerm]);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  onSearch() {
    if (this.searchTerm) {
      this.productService.searchProducts(this.searchTerm).subscribe(
        (results) => {
          console.log(results);

          this.searchResults = results;
        },
        (error) => {
          console.error('Error searching products', error);
        }
      );
    } else {
      // Handle case when search term is empty
      this.searchResults = [];
    }
  }
}
