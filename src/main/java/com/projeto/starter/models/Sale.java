package com.projeto.starter.models;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "CT_VENDA")
public class Sale {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CTCDVENDA")
	@ApiModelProperty(value = "ID da venda (Gerado automaticamente)", position = 0)
	private Integer id;
	
	@Column(name = "CTNUVALORPRODUTO")
	@ApiModelProperty(value = "Preço do produto", example = "1319.99", position = 1)
	private double productPrice;
	
	@Column(name = "CTNUVALORVENDA")
	@ApiModelProperty(value = "Valor total da venda", example = "3950.97", position = 2)
	private double salePrice;
	
	@Column(name = "CTQTPRODUTO")
	@ApiModelProperty(value = "Quantidade de produtos comprados", example = "3", position = 3)
	private int productQuantity;
	
	@Column(name = "CTNUDESCONTO")
	@ApiModelProperty(value = "Desconto em % sobre o total da venda", example = "0.00", position = 4)
	private double descount;
	
	@NotBlank
	@Column(name = "CTNMFORMAPAGAMENTO")
	@ApiModelProperty(value = "forma de pagamento", example = "debito/credito/boleto/dinheiro", position = 5)
	private String paymentMethod;
	
	@Column(name = "CTDTVENDA", insertable = false, updatable = false)
	@ApiModelProperty(value = "Data da venda (Gerado automaticamente)", position = 6)
	private LocalDateTime dateTimeSale;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CTCDPRODUTO", insertable = false, updatable = false)
	private Product product;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CTCDCLIENTE", insertable = false, updatable = false)
	private Customer customer;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CTCDFUNCIONARIO", insertable = false, updatable = false)
	private Employee employee;
	
	@Column(name = "CTCDPRODUTO")
	@ApiModelProperty(value = "ID do produto", example = "1", position = 7)
	private int idProduct;
	
	@Column(name = "CTCDCLIENTE")
	@ApiModelProperty(value = "ID do cliente", example = "1", position = 8)
	private int idCustomer;
	
	@Column(name = "CTCDFUNCIONARIO")
	@ApiModelProperty(value = "ID do funcionário", example = "1", position = 9)
	private int idEmployee;

	public Sale() {
		super();
	}

	public Sale(Integer id, double productPrice, double salePrice, int productQuantity, double descount,
			@NotBlank String paymentMethod, LocalDateTime dateTimeSale, Product product, Customer customer,
			Employee employee, int idProduct, int idCustomer, int idEmployee) {
		super();
		this.id = id;
		this.productPrice = productPrice;
		this.salePrice = salePrice;
		this.productQuantity = productQuantity;
		this.descount = descount;
		this.paymentMethod = paymentMethod;
		this.dateTimeSale = dateTimeSale;
		this.product = product;
		this.customer = customer;
		this.employee = employee;
		this.idProduct = idProduct;
		this.idCustomer = idCustomer;
		this.idEmployee = idEmployee;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}

	public double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(double salePrice) {
		this.salePrice = salePrice;
	}

	public int getProductQuantity() {
		return productQuantity;
	}

	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}

	public double getDescount() {
		return descount;
	}

	public void setDescount(double descount) {
		this.descount = descount;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getDateTimeSale() {
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		return dateTimeSale.format(formatter);
	}

	public String getProduct() {
		return product.getName();
	}

	public String getCustomer() {
		return customer.getName();
	}

	public String getEmployee() {
		return employee.getName();
	}

	public void setIdProduct(int idProduct) {
		this.idProduct = idProduct;
	}

	public void setIdCustomer(int idCustomer) {
		this.idCustomer = idCustomer;
	}

	public void setIdEmployee(int idEmployee) {
		this.idEmployee = idEmployee;
	}

	@Override
	public String toString() {
		return "Sale [id=" + id + ", productPrice=" + productPrice + ", salePrice=" + salePrice + ", productQuantity="
				+ productQuantity + ", descount=" + descount + ", paymentMethod=" + paymentMethod + ", dateTimeSale="
				+ dateTimeSale + ", idProduct=" + idProduct + ", idCustomer=" + idCustomer + ", idEmployee="
				+ idEmployee + "]";
	}
}
