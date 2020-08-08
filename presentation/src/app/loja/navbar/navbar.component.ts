import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../security/token/token.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: any;

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

    this.token = this.tokenService.getToken();
  }

  ngDoCheck(): void {

    this.token = this.tokenService.getToken();
  }

  logout() {
    this.tokenService.deleteToken();
  }

}
