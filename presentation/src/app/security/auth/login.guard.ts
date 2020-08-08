import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';
import { User } from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    // Classe responsável por não deixar ir para a tela de login caso o usuário já esteja logago

    user: User;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    //verifica de existe um token(usuário logado), caso exista não deixa ir para a tela de login
    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (this.userService.isLogged()) {
            this.router.navigate(['painel']);
            return false;
        }
        return true;
    }

}