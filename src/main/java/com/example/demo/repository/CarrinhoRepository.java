package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Carrinho;
import com.example.demo.models.Cliente;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Integer>{

}
