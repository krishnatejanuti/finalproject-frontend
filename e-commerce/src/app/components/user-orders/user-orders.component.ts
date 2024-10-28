import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  userID:any = localStorage.getItem('userId') || '';
  userOrders:any[] = [];
  userCartItems: any;

  constructor(
    private http: HttpClient,
    private orderService:OrdersService,
    private cartService: CartService,
    private r:Router) { }

  ngOnInit(): void {
    this.orderService.getOrdersByUserId(this.userID).subscribe(
      (data) => {
        this.userOrders = data; // Handle the response data
        console.log("userOrders: ");
        console.log(this.userOrders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );

    this.getCartItemsByUserId(this.userID);
  }

  getCartItemsByUserId(userId: string | number): void {
    const url = `http://localhost:8094/cart/getByUserId/${this.userID}`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.userCartItems = response;
        // console.log('Cart items:', this.userCartItems);
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  getTotalQuantity(): number {
    return this.userCartItems.items.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
  }

  editStatus(order:any){
    order.status = 'Cancelled';

    this.orderService.putOrder(order.status,order.orderId).subscribe(
      (data)=> {
        alert('order cancelled successfully');
      }
    )
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

