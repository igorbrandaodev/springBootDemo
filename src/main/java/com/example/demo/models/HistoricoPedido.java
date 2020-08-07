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
    @JoinColumn(name = "cliente_id", insertable = false, updatable = false)
	private Cliente cliente;

	private Date dataCadastro;

}
