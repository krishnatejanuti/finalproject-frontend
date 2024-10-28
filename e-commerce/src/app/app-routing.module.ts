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
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AuthGuard } from './auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', component:HomeComponent},
  {path:'user', component: UserPageComponent,canActivate:[AuthGuard],data: { role: 'user' }},
  {path:'admin', component:AdminPageComponent,canActivate:[AuthGuard],data: { role: 'admin' }},
  {path:'admin/products', component:AdminProductsComponent,canActivate:[AuthGuard],data: { role: 'admin' }},
  {path:'admin/categorys', component:AdminCategorysComponent,canActivate:[AuthGuard],data: { role: 'admin' }},
  {path:'admin/orders', component:AdminOrdersComponent,canActivate:[AuthGuard],data: { role: 'admin' }},
  {path:'admin/users', component:UsersComponent,canActivate:[AuthGuard],data: { role: 'admin' }},
  {path:'user/orders/:id', component:UserOrdersComponent,canActivate:[AuthGuard],data: { role: 'user' }},
  {path:'user/cartItems/:id', component:UserCartItemsComponent,canActivate:[AuthGuard],data: { role: 'user' }},
  { path: 'product/:id', component: ProductComponent},
  { path: 'unauthorized', component: UnauthorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
