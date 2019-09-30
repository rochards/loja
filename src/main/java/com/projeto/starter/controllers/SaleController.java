package com.projeto.starter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.starter.models.Customer;
import com.projeto.starter.models.Sale;
import com.projeto.starter.services.SaleService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_EMPLOYEE')")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
@Api(value = "Venda") //@Api marca a classe como um recurso do swagger
public class SaleController {

	@Autowired
	private SaleService saleService;
	
	@GetMapping("/sale")
	@ApiOperation(value = "lista todos as vendas") //@ApiOperation descreve o método no swagger-ui
	public List<Sale> getAllSales() {
		return saleService.getAllSales();
	}
	
	/*
	 * @GetMapping("/customer/name/{name}")
	@ApiOperation(value = "busca o cliente pelo nome")
	public List<Customer> getCustomerByName(@PathVariable(name = "name") String name) {
		return customerService.getCustomerByName(name);
	}
	 * */
	
	@GetMapping("/sale/employee/cpf/{cpf}")
	@ApiOperation(value = "busca vendas por vendedor")
	public List<Sale> getSaleByEmployee(@PathVariable(name = "cpf") String cpf) {
		return saleService.getSaleByEmployee(cpf);
	}
	
	@PostMapping("/sale")
	@ApiOperation(value = "cadastra uma nova venda") //@ApiOperation descreve o método no swagger-ui
	public Sale addSale(@RequestBody Sale sale) {
		return saleService.addSale(sale);
	}
}
