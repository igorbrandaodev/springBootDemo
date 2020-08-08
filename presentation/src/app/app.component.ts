import { Component, OnInit } from '@angular/core';
import { TokenService } from './security/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Loja';

  constructor(private tokenService: TokenService) { }
  ngOnInit() {
    this.tokenService.deleteCarrinho();
    this.tokenService.deleteCarrinhoPayload();
  }
}
