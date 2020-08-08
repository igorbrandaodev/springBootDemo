import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const URL_API = environment.ApiUrl;

export class InterceptorMetaOptions {
    constructor(
        public skipIncerceptor: boolean = false,
        public skipJson: boolean = false,
        public skipAuthorization: boolean = false,
        public Accept: String = ''
    ) { }
}

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    // Classe responsável por interceptar todas as requisições e verificar se o token está expirado
    // Caso esteja, enviar para a tela de não autorizado, senão atualiza o token no servidor

    isRefreshingToken: boolean = false;

    constructor(
        private tokenService: TokenService,
        private router: Router,
        private userService: UserService,
        private http: HttpClient
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.tokenService.hasToken()) {
            const token = this.tokenService.getToken();

            //clonando a requisição e setando o header com o token
            if (token) {
                req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            }


            // Verifica se é arquivo
            if (req.reportProgress != true) {
                
                if (!req.headers.has('Content-Type')) {
                    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
                }

                req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
            }

        }

        //verificando erros do retorno 401 (não autotizado) para fazer ou não uma nova requisição
        return next.handle(req).pipe(catchError((error) => {

            if (error.status == 401 && error.statusText == "OK") {

                this.tokenService.deleteToken();
                throw error;

                /*
                var userId = this.userService.getUser().unique_name;
                var refreshToken = this.tokenService.getRefreshToken()

                //refazendo a requisição para o refresh token
                return this.http.post(URL_API + '/login',
                    { userId, refreshToken, grantType: 'refresh_token', },//body
                    { observe: 'response' })

                    //mesclando as requisições e emitindo apenas uma no final
                    .pipe(flatMap(res => {
                        let responseModel = (<ResponseModel>res.body.valueOf());

                        //caso o token retornado seja difirente undefined, significa que o token secundario ainda é valido
                        if (responseModel.accessToken != undefined) {

                            this.userService.setToken(responseModel.accessToken);
                            this.userService.setRefreshToken(responseModel.refreshToken);

                            //criando e emitindo uma nova requisição requisição com os dados do token atualizado
                            const cloneReq = req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + responseModel.accessToken) });
                            return next.handle(cloneReq);

                        } else {
                            this.router.navigate(['/not-authorized']);
                            this.tokenService.deleteToken();
                        }

                    }));

                */
            } else {
                throw error;
            }
        }));
    }
}
