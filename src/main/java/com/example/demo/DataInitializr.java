package com.example.demo;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.models.Cliente;
import com.example.demo.models.Estoque;
import com.example.demo.models.Produto;
import com.example.demo.repository.ClienteRepository;
import com.example.demo.repository.EstoqueRepository;
import com.example.demo.repository.ProdutoRepository;

@Component
public class DataInitializr implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    ClienteRepository clienteRepository;
    @Autowired
    ProdutoRepository produtoRepository;
    @Autowired
    EstoqueRepository estoqueRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent arg0) {

        List<Cliente> clientes = clienteRepository.findAll();

        if (clientes.isEmpty()) {
            createCliente("igor", "igor", passwordEncoder.encode("123"), new Date());
            createCliente("bruno", "bruno", passwordEncoder.encode("1234"), new Date());
        }
        
        
        List<Produto> produtos = produtoRepository.findAll();

        if (produtos.isEmpty()) {
            createProduto("produto 1", "produto 1 desc", 100);
            createProduto("produto 2", "produto 2 desc", 250.99);
            createProduto("produto 3", "produto 3 desc", 1999.99);
            createProduto("produto 4", "produto 4 desc", 849.50);
        }

    }

    public void createCliente(String nome, String usuario, String senha, Date dataCadastro) {

        Cliente cliente = new Cliente(nome, usuario, senha, dataCadastro);
        clienteRepository.save(cliente);
    }
    
    public void createProduto(String nome, String descricao, double valor) {

    	Estoque estoque = new Estoque(2);
        Produto produto = new Produto(nome, descricao, valor, estoque);
        Produto result = produtoRepository.save(produto);
        
        //createEstoque(2, result);
      
    }
    
    /*
    public void createEstoque(int quantidade, Produto produto) {

        Estoque estoque = new Estoque(quantidade, produto);
        estoqueRepository.save(estoque);
      
    }
    */

}
