package com.projeto.starter.models;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "CT_RELATORIOS")
public class Report {
	
	@Id
	@Column(name = "CTCDRELATORIO")
	@ApiModelProperty(value = "ID da tabela", position = 0)
	private Integer id;
	
	@Column(name = "CTDTVENDA")
	@ApiModelProperty(value = "data da venda", position = 1)
	private LocalDateTime dateTimeSale;
	
	@NotBlank
	@Column(name = "CTNMFORMAPAGAMENTO")
	@ApiModelProperty(value = "forma de pagamento", position = 2)
	private String paymentMethod;
	
	public Report() {
		super();
	}

	public Report(Integer id, @NotBlank LocalDateTime dateTimeSale, @NotBlank String paymentMethod) {
		super();
		this.id = id;
		this.dateTimeSale = dateTimeSale;
		this.paymentMethod = paymentMethod;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDateTimeSale() {		
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		return dateTimeSale.format(formatter);
	}

	public void setDateTimeSale(LocalDateTime dateTimeSale) {
		this.dateTimeSale = dateTimeSale;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	@Override
	public String toString() {
		return "Report [id=" + id + ", dateTimeSale=" + dateTimeSale + ", paymentMethod=" + paymentMethod + "]";
	}
}
