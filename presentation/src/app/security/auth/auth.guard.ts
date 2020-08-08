import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    // Classe responsável por bloquear o acesso caso o usuário não esteja logado

    constructor(
        private userService: UserService, 
        private router: Router
    ){}

    //verifica de existe um token(usuário logado), caso exista envia o usuário para a tela de login
    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        if(!this.userService.isLogged()){
            this.router.navigate(['']);
            return false;
        }
        
        return true;
    } 
        
}