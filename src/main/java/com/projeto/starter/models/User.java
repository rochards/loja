package com.projeto.starter.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "CT_USUARIO")
public class User {
	
	@Id
	@Column(name = "CTNUCPF")
	@ApiModelProperty(value = "CPF do usuário", position = 0)
	private String cpf;
	
	@NotBlank
	@Column(name = "CTNMUSUARIO")
	@ApiModelProperty(value = "username", position = 1)
	private String username;
	
	@NotBlank
	@Column(name = "CTNMDSENHA")
	//@JsonIgnore
	@ApiModelProperty(value = "password", position = 2)
	private String password;
	
	@Column(name = "CTCDGERENTE")
	@ApiModelProperty(value = "informa se é gerente", position = 3)
	private boolean manager;

	public User() {
		super();
	}

	public User(String cpf, @NotBlank String username, @NotBlank String password, @NotBlank boolean isManager) {
		super();
		this.cpf = cpf;
		this.username = username;
		this.password = password;
		this.manager = isManager;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isManager() {
		return manager;
	}

	public void setManager(boolean isManager) {
		this.manager = isManager;
	}

	@Override
	public String toString() {
		return "User [cpf=" + cpf + ", username=" + username + ", password=" + password + ", manager=" + manager
				+ "]";
	}
}
