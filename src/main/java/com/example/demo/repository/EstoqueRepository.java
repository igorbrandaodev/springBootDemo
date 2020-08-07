package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Cliente;
import com.example.demo.models.Estoque;

public interface EstoqueRepository extends JpaRepository<Estoque, Long>{

}

