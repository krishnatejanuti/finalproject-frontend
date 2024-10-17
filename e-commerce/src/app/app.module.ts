import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ProductComponent } from './components/product/product.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminCategorysComponent } from './components/admin-categorys/admin-categorys.component';
import { UsersComponent } from './components/users/users.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { UserCartItemsComponent } from './components/user-cart-items/user-cart-items.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminPageComponent,
    UserPageComponent,
    ProductComponent,
    AdminProductsComponent,
    AdminCategorysComponent,
    UsersComponent,
    AdminOrdersComponent,
    UserCartItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
