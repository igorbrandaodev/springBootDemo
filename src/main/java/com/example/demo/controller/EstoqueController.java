package com.example.demo.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Estoque;
import com.example.demo.models.Produto;
import com.example.demo.repository.EstoqueRepository;
import com.example.demo.repository.ProdutoRepository;

@RestController
@RequestMapping("api/")
public class EstoqueController {
	
	private final EstoqueRepository repository;

    public EstoqueController(EstoqueRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping("/estoques")
    public Iterable<Estoque> getAll() {
        return repository.findAll();
    }
    
    @PostMapping("/estoque")
    public Estoque create(@RequestBody Estoque entity) {
        return repository.save(entity);
    }
    
    @GetMapping("/estoque/{id}")
    Optional<Estoque> findById(@PathVariable Long id) {

      return repository.findById(id);
    }

    @DeleteMapping("/estoque/{id}")
    void delete(@PathVariable Long id) {
      repository.deleteById(id);
    }

}
