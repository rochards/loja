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
@Table(name="CT_FUNCIONARIO")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CTCDFUNCIONARIO")
	@ApiModelProperty(value = "ID do funcionário (Gerado automaticamente)", position = 0)
	private Integer id;
	
	@NotBlank
	@Column(name = "CTNUCPF")
	@ApiModelProperty(value = "CPF do funcionário", example = "19276598430", position = 1)
	private String cpf;
	
	@NotBlank
	@Column(name = "CTNMFUNCIONARIO")
	@ApiModelProperty(value = "Nome do funcionário", example = "Márcio Alves", position = 2)
	private String name;
	
	@Column(name = "CTNUTELEFONE")
	@ApiModelProperty(value = "Telefone do funcionário", allowEmptyValue = true, example = "3499999999", position = 3)
	private String fone;
	
	@Column(name = "CTNMEMAIL")
	@ApiModelProperty(value = "Email do funcionário", allowEmptyValue = true, example = "marcio@outlook.com", position = 4)
	private String email;
	
	@NotBlank
	@Column(name = "CTNMCARGO")
	@ApiModelProperty(value = "Cargo do funcionário", example = "vendedor", position = 5)
	private String position;

	public Employee() {
		super();
	}

	public Employee(Integer id, @NotBlank String cpf, @NotBlank String name, String fone, String email,
			@NotBlank String position) {
		super();
		this.id = id;
		this.cpf = cpf;
		this.name = name;
		this.fone = fone;
		this.email = email;
		this.position = position;
	}

	public Integer getId() {
		return id;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}
}
