import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProdutosComponent } from './loja/produtos/produtos.component';
import { CarrinhoComponent } from './loja/carrinho/carrinho.component';
import { PedidosComponent } from './loja/pedidos/pedidos.component';
import { NavbarComponent } from './loja/navbar/navbar.component';
import { RequestInterceptor } from './security/auth/request.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdutosComponent,
    CarrinhoComponent,
    PedidosComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: ProdutosComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'carrinho', component: CarrinhoComponent, pathMatch: 'full' },
      { path: 'pedidos', component: PedidosComponent, pathMatch: 'full' }
  ]),
    FontAwesomeModule
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
