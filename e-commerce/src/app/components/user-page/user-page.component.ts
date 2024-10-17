import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit 
 {
  myData: any;
  filteredProducts: any;
  userID = localStorage.getItem('userId');
  searchTerm: string = '';

  cartItems: any;

  UserId = localStorage.getItem('userId') || '';

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private cartService: CartService,  // Inject CartService to fetch user's cart items
    private categoryService: CategoryService,
    private router: Router  // Inject Router to redirect to different routes
  ) {}

  ngOnInit(): void {
    this.productService.getData().subscribe(
      (data) => {
        this.myData = data;
        console.log(this.myData);
        this.filteredProducts = this.myData; // Initially show all products

        // Iterate through each product to add categoryDetails
        this.myData.forEach((product:any)=> {
          this.categoryService.getCategoryByID(product.categoryIds[0]).subscribe(
            (category:any) => {
              product.categoryDetails = category;
              console.log(this.myData);
            }
          )
        })
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );

    console.log(this.myData);

    // this.cartService.getCartByUserID().subscribe((data) => {
    //   this.userCartItems = data;
    //   console.log(this.userCartItems);
    //  })

     if (this.UserId) {
      this.getCartItemsByUserId(this.UserId);
    }

     
  }

  filterProductsByCategory(categoryID: number): void {
    let products = this.myData;

    if (categoryID !== 0) {
      products = products.filter((product: any) => product.categoryIds[0] === categoryID);
    }

    this.filteredProducts = this.applySearch(products);
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredProducts = this.applySearch(this.myData);
  }

  applySearch(products: any[]): any[] {
    return products.filter(product => 
      product.productName.toLowerCase().includes(this.searchTerm) ||
      product.categoryDetails.categoryName.toLowerCase().includes(this.searchTerm)
    );
  }

  onSort(event: any): void {
    const sortValue = event.target.value;

    if (sortValue === 'name') {
      this.filteredProducts.sort((a: any, b: any) => 
        a.productName.localeCompare(b.productName)
      );
    }

    // Apply other sorting options here if needed
  
  }

  getCartItemsByUserId(userId: string | number): void {
    const url = `http://localhost:8094/cart/getByUserId/${this.UserId}`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.cartItems = response;
        console.log('Cart items:', this.cartItems);
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  getTotalQuantity(): number {
    return this.cartItems.items.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
  }

  logOut(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
