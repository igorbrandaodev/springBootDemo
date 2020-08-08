import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';
import { TokenService } from 'src/app/security/token/token.service';
import Swal from 'sweetalert2';
import { Carrinho } from 'src/app/models/carrinho';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { IfStmt } from '@angular/compiler';
import { CarrinhoComponent } from '../carrinho/carrinho.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  filtro: string = "";
  clienteId: number;
  token: any;
  carrinhoPayLoad: Carrinho = new Carrinho();
  public produtos: Produto[];

  @ViewChild(CarrinhoComponent) carrinhoComponent: CarrinhoComponent;

  constructor(
    private ProdutoService: ProdutoService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

    this.token = this.tokenService.getToken();
    this.clienteId = Number(this.tokenService.getUserId());
    this.carrinhoPayLoad.produtos = [];

    this.buscar();

  }


  // Busca dados na base
  public buscar() {
    this.ProdutoService.getAll().subscribe(result => {

      // Preenche a lista de produtos
      if (result != null) {
        this.produtos = result;
      }

    }, error => console.error(error));;

  }

  adicionar(produto: Produto) {

    this.carrinhoPayLoad = JSON.parse(this.tokenService.getCarrinhoPayload());
    if (!this.carrinhoPayLoad) {
      this.carrinhoPayLoad = new Carrinho();
      this.carrinhoPayLoad.produtos = [];
    }

    if (this.token) {
      //Swal.fire(JSON.stringify(produto));
      if (produto.estoque.quantidade <= 0)
        Swal.fire('Produto sem estoque!');
      else {

        // Cria o payload do carrinho
        this.carrinhoPayLoad.cliente = this.clienteId;
        this.carrinhoPayLoad.produtos.push(produto.id);

        // Cadastra o carrinho no componente filho
        this.carrinhoComponent.cadastrar(this.carrinhoPayLoad);

      }
    }
    else
      Swal.fire('É necessário se autenticar para adicionar produtos ao carrinho!');
  }

  filtrar() {
    this.produtos = this.produtos.filter(x => x.nome.match(this.filtro));

    if (this.produtos.length <= 0) {
      Swal.fire('Nenhum produto encontrado!');
      this.buscar();
      this.filtro = '';
    }

  }

}
