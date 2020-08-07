package com.example.demo.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Cliente;
import com.example.demo.repository.ClienteRepository;

@RestController
@RequestMapping("api/")
public class ClienteController {

    private final ClienteRepository repository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.repository = clienteRepository;
    }
    
    @GetMapping("/login")
    public String index() {
        return "Página de login liberada!";
    }
    
   
    
    @GetMapping("/clientes")
    public Iterable<Cliente> getAll() {
        return repository.findAll();
    }
    
    @PostMapping("/cliente")
    public Cliente create(@RequestBody Cliente entity) {
        return repository.save(entity);
    }
    
    @GetMapping("/cliente/{id}")
    Optional<Cliente> findById(@PathVariable Long id) {

      return repository.findById(id);
    }

    @DeleteMapping("/cliente/{id}")
    void delete(@PathVariable Long id) {
      repository.deleteById(id);
    }
    
    
}