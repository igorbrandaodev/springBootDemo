package com.example.demo.models;

import java.util.List;

public class CarrinhoPayload {
	private Long cliente;
	List<Long> produtos;
	
	public Long getCliente() {
		return cliente;
	}
	public void setCliente(Long cliente) {
		this.cliente = cliente;
	}
	public List<Long> getProdutos() {
		return produtos;
	}
	public void setProdutos(List<Long> produtos) {
		this.produtos = produtos;
	}

}
