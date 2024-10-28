import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-cart-items',
  templateUrl: './user-cart-items.component.html',
  styleUrls: ['./user-cart-items.component.css']
})
export class UserCartItemsComponent implements OnInit {
  userCartItems: any;
  overallTotalPrice: number = 0;
  userAddress:any;
  quantity: any;

  UserId:any = localStorage.getItem('userId') || '';

  showPaymentForm = false;
  showSuccessAnimation = false;
  selectedPaymentMethod = 'COD';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  successMessage: string = '';
  paymentButtonText = 'Order';  // Default button text
 
constructor(
  private userService: UsersService,
  private productService: ProductService,
  private orderService: OrdersService,
  private cartService: CartService,
  private http: HttpClient,
  private r:Router
){}
  
  ngOnInit(): void {

      if (this.UserId) {
        this.getCartItemsByUserId(this.UserId);

        this.userService.getUserById(this.UserId).subscribe((data) => {
          this.userAddress = data.address;
          console.log("Address");
          console.log(this.userAddress);
          
         })
      } 
  }


  // Method to fetch cart items by userId
  getCartItemsByUserId(userId: string | number): void {
    const url = `http://localhost:8094/cart/getByUserId/${this.UserId}`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.userCartItems = response;
        console.log('Cart items:', this.userCartItems);
        this.calculateOverallTotalPrice();
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  removeFromCart(id: any){
    this.cartService.removeItem(id).subscribe(
      (data)=>{
        this.getCartItemsByUserId(this.UserId);
      }
    )
  }

  getTotalQuantity(): number {
    return this.userCartItems.items.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.calculateOverallTotalPrice();
    // this.updateTotalPrice(item);
    console.log(item);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateOverallTotalPrice();
      // this.updateTotalPrice(item);
      console.log(item);
    }
  }

  // calculateOverallTotalPrice() {
  //   this.overallTotalPrice = this.userCartItems.totalAmount;
  // }

  calculateOverallTotalPrice() {
    if (this.userCartItems && this.userCartItems.items) {
      this.overallTotalPrice = this.userCartItems.items.reduce((total: number, item: { price: number; quantity: number; }) => {
        return total + (item.price * item.quantity);
      }, 0);
    }
  }
  
  placeOrder(){
    let body:any = {
      cartId:this.userCartItems.cartId,
      userId: this.UserId,
      utrNumber: "UTR12345678",
      deliveryAddress: this.userAddress
    }

      this.orderService.postOrder(body).subscribe(
        (data)=> {
          console.log('order placed',data);
        }
      )
    }


  processPayment() {
    if (this.selectedPaymentMethod === 'COD') {
      this.showPaymentForm = false;
      this.showSuccessAnimation = true;
      this.successMessage = 'Placing the Order...';
      // alert('hell')
      // Hide success animation after a delay
      setTimeout(() => {
        this.showSuccessAnimation = false;
      }, 3000);

      // Simulate payment processing delay
    setTimeout(() => {
      this.successMessage = 'Order placed successfully!';
      this.getCartItemsByUserId(this.UserId);
    }, 2000); // 2 seconds delay
      // Implement logic for COD
      this.placeOrder();
    } else if (this.selectedPaymentMethod === 'CreditCard') {
      if (this.cardNumber && this.expiryDate && this.cvv) {
        this.showPaymentForm = false;
        this.showSuccessAnimation = true;
        this.successMessage = 'Processing Payment...';
        // Hide success animation after a delay
        setTimeout(() => {
          this.showSuccessAnimation = false;
        }, 3000);

        setTimeout(() => {
          this.successMessage = 'Order placed successfully!';
          this.getCartItemsByUserId(this.UserId);
        }, 2000); // 2 seconds delay

        this.placeOrder();
        // Implement logic for credit card payment
        // let body:any = {
        //   userID :this.UserId,
        //   amount: this.product.price * this.quantity
        // }

        // placing the order only when successful post request to payments table
        // this.paymentService.postPayment(body).subscribe(
        //   (data) => {
        //     this.placeOrder();
        //   }
        // )

      } else {
        alert('Please fill in all credit card details');
      }
    }
}

  openPaymentForm() {
    if(this.UserId){
      this.showPaymentForm = true;
    } else {
      alert('please login to buy the product!');
    } 
  }

  closePaymentForm() {
    this.showPaymentForm = false;
  }

  updateButtonText() {
    this.paymentButtonText = this.selectedPaymentMethod === 'COD' ? 'Order' : 'Make Payment';
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
