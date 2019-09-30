package com.projeto.starter.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "CT_PRODUTO")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CTCDPRODUTO")
	@ApiModelProperty(value = "ID do produto (Gerado automaticamente)", position = 0)
	private Integer id;
	
	@NotBlank
	@Column(name = "CTNMPRODUTO")
	@ApiModelProperty(value = "Nome do produto", example = "Smartphone", position = 1)
	private String name;
	
	@Column(name = "CTDEPRODUTO")
	@ApiModelProperty(value = "Descrição do produto", example = "Tela 5,5\" full HD, Android 8.0 ...", position = 2)
	private String resume;
	
	@Column(name = "CTNUPRECO")
	@ApiModelProperty(value = "Preço do produto", example = "1319.99", position = 3)
	private double price;
	
	@Column(name = "CTQTPRODUTO")
	@ApiModelProperty(value = "Quantidade do produto", example = "1000", position = 4)
	private int quantity;
	
	public Product() {
		super();
	}

	public Product(Integer id, @NotBlank String name, String resume, @NotBlank double price, @NotBlank int quantity) {
		super();
		this.id = id;
		this.name = name;
		this.resume = resume;
		this.price = price;
		this.quantity = quantity;
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
