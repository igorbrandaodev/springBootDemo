import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { TokenService } from 'src/app/security/token/token.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  clienteId: number;
  texto: string;
  pedidos: any[];
  pedido: any;

  constructor(
    private pedidoService: PedidoService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

    this.clienteId = Number(this.tokenService.getUserId());

    this.buscar();
  }

  // Busca dados na base
  public buscar() {
    this.pedidoService.getAll().subscribe(result => {

      // Preenche a lista de produtos
      if (result.length > 0) {
        this.pedidos = result;

        this.pedidos.forEach(element => {
          element.dataCadastro = new Date(element.dataCadastro).toDateString();
        });
        // Filtra somente os pedidos do cliente logado
        this.pedidos = this.pedidos.filter(x => x.cliente.id === this.clienteId);
      }

    }, error => {

      if (error.status = 401) {
        this.texto = 'É necessário se autenticar visualizar o Histórico de Pedidos!';
      }
    });

  }

}
