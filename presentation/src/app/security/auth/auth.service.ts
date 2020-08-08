import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { TokenResponse } from '../../models/token';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URL_API = environment.ApiUrl;

// Define o cabeçalho da chamada
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }



    // Faz uma requisição para a API enviando os dados
    autenticar(usuario: string, senha: string): Observable<any> {

        let params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('username', usuario);
        params.append('password', senha);

        const headers = {
            'Authorization': 'Basic ' + btoa('presentation:4ngul4rfr4m3w0rk'),
            'Content-type': 'application/x-www-form-urlencoded'
        }

        //this.http.post(URL_API + 'oauth/token', params.toString(), { headers });

        return this.http
            .post(URL_API + 'oauth/token', params.toString(), { headers })
            .pipe(tap(response => {
                
                let token = response;

                // Obtém o retorno
                if (token.access_token) {
                    // Salva o token
                    this.userService.setToken(token.access_token);
                }
            }));
    }


    // Faz uma requisição para a API enviando os dados
    login(): Observable<any> {

        return this.http.get(URL_API + 'login');
    }

    // Obtém o retorno
    /*
   
    */

    // Faz uma requisição para a API da SiteMercado enviando os dados
    autenticacaoSiteMercado(userID: string, accessKey: string) {

        // Define o cabeçalho da chamada
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json, charset=utf-8',
                'Authorization': 'Basic MTIzNDU2Nzg5MDowOTg3NjU0MzIx'
            })
        }

        return this.http
            .post('https://dev.sitemercado.com.br/api/login',
                { "Username": userID, "Password": accessKey },
                { headers: httpOptions.headers, observe: "response" })
            .pipe(tap(res => {
                return res.body.valueOf();
            }));
    }


}
