import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { TokenStorageService } from './services/token-storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { SliderComponent } from './slider/slider.component';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { DetailComponent } from './detail/detail.component';
import { ProductComponent } from './product/product.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    CartComponent,
    SliderComponent,
    DetailComponent,
    ProductComponent,
    ThanhtoanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    ReactiveFormsModule,  
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [
    CartService,
    ProductsService,
    TokenStorageService,
    provideHttpClient(withFetch()) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
