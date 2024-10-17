import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ProductComponent } from './components/product/product.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminCategorysComponent } from './components/admin-categorys/admin-categorys.component';
import { UsersComponent } from './components/users/users.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { UserCartItemsComponent } from './components/user-cart-items/user-cart-items.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', component:HomeComponent},
  {path:'user', component: UserPageComponent},
  {path:'admin', component:AdminPageComponent},
  {path:'admin/products', component:AdminProductsComponent},
  {path:'admin/categorys', component:AdminCategorysComponent},
  {path:'admin/orders', component:AdminOrdersComponent},
  {path:'admin/users', component:UsersComponent},
  {path:'user/cartItems/:id', component:UserCartItemsComponent},
  { path: 'product/:id', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
