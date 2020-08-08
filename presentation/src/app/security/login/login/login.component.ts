import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { error } from 'protractor';
import Swal from 'sweetalert2';
import { ClienteService } from 'src/app/services/cliente.service';
import { TokenService } from '../../token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private clienteService: ClienteService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      usuario: ['',
        [
          Validators.required,
          Validators.pattern(/^[a-z-_.]+@+[a-z-]+\.[a-z]+\.?([a-z]+)?$/)
        ]
      ],
      senha: ['', Validators.required]
    })
  }

  login() {
    // Obtém usuário e senha informados
    const usuario = this.loginForm.get('usuario').value;
    const senha = this.loginForm.get('senha').value;

    // Tenta realizar a autenticação
    this.authService
      .autenticar(usuario, senha)
      .subscribe((response) => {

        // Limpa o cache
        this.tokenService.deleteCarrinho();
        this.tokenService.deleteCarrinhoPayload();

        // Busca o ID do Usuário
        this.clienteService.getDetails().subscribe(data => {

          this.tokenService.setUserId(data.username);
          this.router.navigate([''], {});
        })



      }, error => Swal.fire('Usuário ou senha inválidos!')
      );

  }

}
