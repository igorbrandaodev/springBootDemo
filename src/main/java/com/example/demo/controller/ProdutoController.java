package com.example.demo.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Produto;
import com.example.demo.repository.ProdutoRepository;

@RestController
@RequestMapping("api/")
public class ProdutoController {
	
	private final ProdutoRepository repository;

    public ProdutoController(ProdutoRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping("/produtos")
    public Iterable<Produto> getAll() {
        return repository.findAll();
    }
    
    @PostMapping("/produto")
    public Produto create(@RequestBody Produto entity) {
        return repository.save(entity);
    }
    
    @GetMapping("/produto/{id}")
    Optional<Produto> findById(@PathVariable Long id) {

      return repository.findById(id);
    }

    @DeleteMapping("/produto/{id}")
    void delete(@PathVariable Long id) {
      repository.deleteById(id);
    }
    

}
