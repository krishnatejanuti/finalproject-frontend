import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any[] = [];

  UserRole = localStorage.getItem('userRole');

  constructor(
    private orderService:OrdersService,
  ) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data:any) =>
      {
        this.orders = data.sort((a: any, b: any) => b.orderId - a.orderId);
        console.log(this.orders);
      } 
    )
  }

  getOrderStatus(status: string): string {
    if (this.UserRole === 'admin' && status === 'ARRIVING') {
      return 'SENDING';
    }
    return status;
  }

  editStatus(order:any){
    order.status = 'DELIVERED';

    this.orderService.putOrder(order.status,order.orderId).subscribe(
      (data)=> {
        alert('status updated successfully');
      }
    )
  }
}
