import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { DetailComponent } from './detail/detail.component';
import { ProductComponent } from './product/product.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'product', component:ProductComponent},
  { path: 'product-detail/:id', component: DetailComponent },
  { path: 'checkout', component: ThanhtoanComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
