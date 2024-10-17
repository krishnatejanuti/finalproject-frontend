import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-user-cart-items',
  templateUrl: './user-cart-items.component.html',
  styleUrls: ['./user-cart-items.component.css']
})
export class UserCartItemsComponent implements OnInit {
  userCartItems: any;
  quantity: any;

  UserId = localStorage.getItem('userId') || '';
 
constructor(
  private cartService: CartService,
  private http: HttpClient
){}
  
  ngOnInit(): void {

      if (this.UserId) {
        this.getCartItemsByUserId(this.UserId);
      }
    
  }


  // Method to fetch cart items by userId
  getCartItemsByUserId(userId: string | number): void {
    const url = `http://localhost:8094/cart/getByUserId/${this.UserId}`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.userCartItems = response;
        console.log('Cart items:', this.userCartItems);
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  getTotalQuantity(): number {
    return this.userCartItems.items.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
  }

  increaseQuantity(item: any) {
    item.quantity++;
    // this.updateTotalPrice(item);
    console.log(item);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      // this.updateTotalPrice(item);
      console.log(item);
    }
  }
}
