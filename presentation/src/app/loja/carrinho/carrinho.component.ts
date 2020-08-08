import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { TokenService } from 'src/app/security/token/token.service';
import { Carrinho } from 'src/app/models/carrinho';
import { PedidoService } from 'src/app/services/pedido.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  @Output() carrinhoCadastrado = new EventEmitter<any>();

  carrinhoPayLoad: Carrinho;
  clienteId: number;
  texto: string;
  carrinhos: any[];
  carrinho: any;
  token: any;

  constructor(
    private CarrinhoService: CarrinhoService,
    private tokenService: TokenService,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.clienteId = Number(this.tokenService.getUserId());
    this.carrinho = JSON.parse(this.tokenService.getCarrinho());
    this.token = this.tokenService.getToken();

    this.buscar();
  }

  // Busca dados na base
  public buscar() {
    this.CarrinhoService.getAll().subscribe(result => {

      // Preenche a lista de produtos
      if (result.length > 0) {
        this.carrinhos = result;

        // Filtra somente os carrinhos do cliente logad
        this.carrinhos = this.carrinhos.filter(x => x.cliente.id === this.clienteId);

        // Salva em cache
        this.tokenService.setCarrinho(this.carrinhos[0]);
      } 

    }, error => {

      if (error.status = 401) {
        this.texto = 'É necessário se autenticar para adicionar produtos ao carrinho!';
      }
    });

  }

  adicionar(produto: Produto) {

    this.carrinhoPayLoad = JSON.parse(this.tokenService.getCarrinhoPayload());

    if (this.token) {
      //Swal.fire(JSON.stringify(produto));
      if (produto.estoque.quantidade <= 0)
        Swal.fire('Produto sem estoque!');
      else {

        // Cria o payload do carrinho
        this.carrinhoPayLoad.cliente = this.clienteId;
        this.carrinhoPayLoad.produtos.push(produto.id);

        // Cadastra o carrinho no componente filho
        this.cadastrar(this.carrinhoPayLoad);

        // Salve em cache
        this.tokenService.setCarrinhoPayload(this.carrinhoPayLoad);

      }
    }

  }

  remover(produto: Produto) {

    this.carrinhoPayLoad = JSON.parse(this.tokenService.getCarrinhoPayload());

    if (this.token) {

      // Cria o payload do carrinho
      this.carrinhoPayLoad.cliente = this.clienteId;

      // Remove o item
      const index = this.carrinhoPayLoad.produtos.indexOf(produto.id);
      if (index > -1) {
        this.carrinhoPayLoad.produtos.splice(index, 1);
      }
      // Cadastra o carrinho no componente filho
      this.cadastrar(this.carrinhoPayLoad);

      // Salve em cache
      this.tokenService.setCarrinhoPayload(this.carrinhoPayLoad);

    }

  }

  async cadastrar(carrinhoPayLoad: Carrinho) {

    this.carrinho = JSON.parse(this.tokenService.getCarrinho());

    // Exclui o carrinho atual do banco
    if (this.carrinho)
      await this.CarrinhoService.delete(this.carrinho.id).toPromise().then(data => {
      })

    // Cadastro o carrinho
    await this.CarrinhoService.create(carrinhoPayLoad).toPromise().then(data => {

      // Salva em cache
      this.tokenService.setCarrinho(data);

      // Recarrega carrinhos
      this.buscar();

      // Emite o evento para o componente pai (recarregar produtos)
      this.carrinhoCadastrado.emit('');

      // Salva o payload
      this.carrinhoPayLoad = carrinhoPayLoad;

      // Salve em cache
      this.tokenService.setCarrinhoPayload(this.carrinhoPayLoad);
    });
  }

  async finalizar() {

    this.carrinho = JSON.parse(this.tokenService.getCarrinho());

    // Exclui o carrinho atual do banco
    if (this.carrinho)
      await this.CarrinhoService.delete(this.carrinho.id).toPromise().then(data => {
      })

    // Cadastro o Pedido
    await this.pedidoService.create(this.carrinhoPayLoad).toPromise().then(data => {

      // Salva em cache
      this.tokenService.deleteCarrinho();

      // Recarrega carrinho
      this.buscar();

      // Emite o evento para o componente pai (recarregar produtos)
      this.carrinhoCadastrado.emit('');

      // Limpa o payload
      this.carrinhoPayLoad = null;
      this.tokenService.deleteCarrinhoPayload();

      Swal.fire('Pedido efetuado com sucesso!', '', 'success');

      // Redireciona para pedidos
      this.router.navigate(['pedidos'], {});

    });

  }

}
