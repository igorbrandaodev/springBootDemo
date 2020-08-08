package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Carrinho;
import com.example.demo.models.CarrinhoPayload;
import com.example.demo.models.Cliente;
import com.example.demo.models.Estoque;
import com.example.demo.models.Produto;
import com.example.demo.repository.CarrinhoRepository;
import com.example.demo.repository.ClienteRepository;
import com.example.demo.repository.ProdutoRepository;

@RestController
@RequestMapping("api/")
public class CarrinhoController {

	private final CarrinhoRepository repository;
	private final ClienteRepository clienteRepository;
	private final ProdutoRepository produtoRepository;

	public CarrinhoController(CarrinhoRepository repository, ClienteRepository clienteRepository,
			ProdutoRepository produtoRepository) {
		this.repository = repository;
		this.clienteRepository = clienteRepository;
		this.produtoRepository = produtoRepository;
	}

	@GetMapping("/carrinhos")
	public Iterable<Carrinho> getAll() {
		return repository.findAll();
	}

	@PostMapping("/carrinho")
	public Carrinho create(@RequestBody CarrinhoPayload entity) {

		// Obtém o cliente
		Optional<Cliente> opCliente = clienteRepository.findById(entity.getCliente());

		// Se encontrou
		if (opCliente.isPresent()) {
			Cliente cliente = opCliente.get();

			// Instancia a lista de produtos
			List<Produto> produtos = new ArrayList<Produto>();

			List<Long> produtosID = entity.getProdutos();

			// Para cada ID de produto enviado
			for (Long produtoID : produtosID) {

				// Obtém o produto
				Optional<Produto> opProduto = produtoRepository.findById(produtoID);
				if (opProduto.isPresent()) {
					Produto produto = opProduto.get();

					// Adiciona na lista
					produtos.add(produto);

					// Atualiza o estoque do produto
					Estoque estoque = produto.getEstoque();
					estoque.setQuantidade(estoque.getQuantidade() - 1);
					estoque.setDataAtualizacao(new Date());
					produto.setEstoque(estoque);
					produtoRepository.save(produto);

				}

			}

			// Instancia um novo Carrinho
			Carrinho carrinho = new Carrinho();
			carrinho.setCliente(cliente);
			carrinho.setProduto(produtos);
			carrinho.setDataCadastro(new Date());

			return repository.save(carrinho);
		} else {
			return null;
		}
	}

	@GetMapping("/carrinho/{id}")
	Optional<Carrinho> findById(@PathVariable int id) {

		return repository.findById(id);
	}

	@DeleteMapping("/carrinho/{id}")
	void delete(@PathVariable int id) {
		
		// Atualiza o estoque dos produtos
		Optional<Carrinho> opCarrinho = repository.findById(id);
		if(opCarrinho.isPresent()) {
			Carrinho carrinho = opCarrinho.get();
			
			List<Produto> produtos = carrinho.getProduto();
			for(Produto produto: produtos) {
				
				// Atualiza o estoque do produto
				Estoque estoque = produto.getEstoque();
				estoque.setQuantidade(estoque.getQuantidade() + 1);
				estoque.setDataAtualizacao(new Date());
				produto.setEstoque(estoque);
				produtoRepository.save(produto);
			}
		}
		
		repository.deleteById(id);
	}

}
