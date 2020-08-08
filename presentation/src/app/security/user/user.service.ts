import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { TokenService } from '../token/token.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private tokenService: TokenService) {
        this.tokenService.hasToken();
    }

    setToken(token: string): void {
        this.tokenService.setToken(token);
    }

    isLogged(): boolean {
        return this.tokenService.hasToken();
    }

    logout() {
        this.tokenService.deleteToken();
    }

}
