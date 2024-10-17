import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: any;
  userID = localStorage.getItem('userId');
  quantity: number = 1;  // Default quantity

  userCartItems: any;
  // user: any;

  // userCartItemsCount:any;
  
  // Payment form fields
  // showPaymentForm = false;
  // showSuccessAnimation = false;
  // selectedPaymentMethod = 'COD';
  // cardNumber: string = '';
  // expiryDate: string = '';
  // cvv: string = '';
  // successMessage: string = '';
  // paymentButtonText = 'Order';  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService, 
    private http: HttpClient,
    private r:Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let productid = params.get('id');
      this.productService.getData().subscribe(data => {
        this.product = data.find((p: { productId: number; }) => p.productId == Number(productid));
        // console.log(this.product);
      });
    });


    this.cartService.getCartByUserID().subscribe((data) => {
      this.userCartItems = data;
      console.log(this.userCartItems);
     })
  }

  

  addToCart() 
  {
 
      const cartItem = { 
        productId: this.product.productId,
        quantity: this.quantity,
        totalPrice: this.product.price * this.quantity,
      };

        this.http.post(`http://localhost:8094/cart/create/${this.userID}`, cartItem).subscribe(
          response => {
            console.log('Added to cart:', response);
            alert('Added to Cart Successfully');
          },
          error => {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart');
          }
        );
   }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
        this.quantity--;
    }
  }

  getTotalQuantity(): number {
    return this.userCartItems.items.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
  }

  logOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    this.r.navigate(['']);
  }
}
