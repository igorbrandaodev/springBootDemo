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
import com.example.demo.models.HistoricoPedido;
import com.example.demo.repository.EstoqueRepository;
import com.example.demo.repository.HistoricoPedidoRepository;

@RestController
@RequestMapping("api/")
public class HistoricoPedidoController {
	
	private final HistoricoPedidoRepository repository;

    public HistoricoPedidoController(HistoricoPedidoRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping("/historicos")
    public Iterable<HistoricoPedido> getAll() {
        return repository.findAll();
    }
    
    @PostMapping("/historico")
    public HistoricoPedido create(@RequestBody HistoricoPedido entity) {
        return repository.save(entity);
    }
    
    @GetMapping("/historico/{id}")
    Optional<HistoricoPedido> findById(@PathVariable Long id) {

      return repository.findById(id);
    }

    @DeleteMapping("/historico/{id}")
    void delete(@PathVariable Long id) {
      repository.deleteById(id);
    }

}
