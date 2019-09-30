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
@Table(name = "CT_CLIENTE")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CTCDCLIENTE")
	@ApiModelProperty(value = "ID do cliente (Gerado automaticamente)", position = 0)
	private Integer id;
	
	@NotBlank
	@Column(name = "CTNMCLIENTE")
	@ApiModelProperty(value = "Nome do cliente", example = "Joaquim Silva", position = 1)
	private String name;
	
	@NotBlank
	@Column(name = "CTNUCPF")
	@ApiModelProperty(value = "CPF do cliente", example = "19276598430", position = 2)
	private String cpf;
	
	@Column(name = "CTNUTELEFONE")
	@ApiModelProperty(value = "Telefone do cliente", allowEmptyValue = true, example = "34999999999", position = 3)
	private String fone;
	
	@Column(name = "CTNMEMAIL")
	@ApiModelProperty(value = "Email do cliente", allowEmptyValue = true, example = "joaquim@outlook.com", position = 4)
	private String email;
	
	public Customer() {
		super();
	}

	public Customer(Integer id, @NotBlank String name, @NotBlank String cpf, String fone, String email) {
		super();
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.fone = fone;
		this.email = email;
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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getFone() {
		return fone;
	}

	public void setFone(String fone) {
		this.fone = fone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
