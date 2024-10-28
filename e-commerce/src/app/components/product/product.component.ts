import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: any;
  userID:any = localStorage.getItem('userId');
  userAddress:any;
  quantity: number = 1;  // Default quantity

  userCartItems: any;
  // user: any;

  // userCartItemsCount:any;
  
  showPaymentForm = false;
  showSuccessAnimation = false;
  selectedPaymentMethod = 'COD';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  successMessage: string = '';
  paymentButtonText = 'Order';  // Default button text


  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private productService: ProductService,
    private orderService: OrdersService,
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

     this.userService.getUserById(this.userID).subscribe((data) => {
      this.userAddress = data.address;
      console.log("Address");
      console.log(this.userAddress);
      
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
            this.getTotalQuantity();
            this.r.navigate(['/user/cartItems/' + this.userID]);
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

  placeOrder(){
    let body:any = {
      cartId:this.userCartItems.cartId,
      userId: this.userID,
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
        }, 2000); // 2 seconds delay

        // Implement logic for credit card payment
        let body:any = {
          userID :this.userID,
          amount: this.product.price * this.quantity
        }

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
    if(this.userID){
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
