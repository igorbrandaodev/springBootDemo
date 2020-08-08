package com.example.demo.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class HistoricoPedido {
	
	public HistoricoPedido() {
		
	}
	
	@Id
	@GeneratedValue
	private int id;
	
	@ManyToMany
	@JoinTable( 
	        name = "pedido_produtos", 
	        joinColumns = @JoinColumn(
	          name = "carrinho_id", referencedColumnName = "id"), 
	        inverseJoinColumns = @JoinColumn(
	          name = "produto_id", referencedColumnName = "id")) 
	private List<Produto> produto;

	@ManyToOne
    @JoinColumn()
	private Cliente cliente;

	private Date dataCadastro;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<Produto> getProduto() {
		return produto;
	}

	public void setProduto(List<Produto> produto) {
		this.produto = produto;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Date getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro) {
		this.dataCadastro = dataCadastro;
	}
	
	

}
