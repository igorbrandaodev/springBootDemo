package com.example.demo.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Carrinho;
import com.example.demo.models.Produto;
import com.example.demo.repository.CarrinhoRepository;
import com.example.demo.repository.ProdutoRepository;

@RestController
@RequestMapping("api/")
public class CarrinhoController {
	
	private final CarrinhoRepository repository;

    public CarrinhoController(CarrinhoRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping("/carrinhos")
    public Iterable<Carrinho> getAll() {
        return repository.findAll();
    }
    
    @PostMapping("/carrinho")
    public Carrinho create(@RequestBody Carrinho entity) {
        return repository.save(entity);
    }
    
    @GetMapping("/carrinho/{id}")
    Optional<Carrinho> findById(@PathVariable Long id) {

      return repository.findById(id);
    }

    @DeleteMapping("/carrinho/{id}")
    void delete(@PathVariable Long id) {
      repository.deleteById(id);
    }

}
