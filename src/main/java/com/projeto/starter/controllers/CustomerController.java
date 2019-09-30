package com.projeto.starter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.starter.models.Customer;
import com.projeto.starter.services.CustomerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/* essa anatação foi necessária para permitir o front-end
	a fazer requisições*/
/*@CrossOrigin(origins = "*",
			methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.POST},
			allowedHeaders = {"Content-Type", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Authorization", "X-Requested-With", "requestId", "Correlation-Id"},
			allowCredentials = "true"
		)*/ 
@PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_EMPLOYEE')")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
@Api(value = "Cliente") //@Api marca a classe como um recurso do swagger
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/customer")
	@ApiOperation(value = "lista todos os clientes") //@ApiOperation descreve o método no swagger-ui 
	public List<Customer> getAllCustomers() {
		return customerService.getAllCustomers();
	}
	
	@GetMapping("/customer/name/{name}")
	@ApiOperation(value = "busca o cliente pelo nome")
	public List<Customer> getCustomerByName(@PathVariable(name = "name") String name) {
		return customerService.getCustomerByName(name);
	}
	
	@GetMapping("/customer/cpf/{cpf}")
	@ApiOperation(value = "busca o cliente pelo cpf")
	public Customer getCustomerByCpf(@PathVariable(name = "cpf") String cpf) {
		return customerService.getCustomerByCpf(cpf);
	}
	
	@PostMapping("/customer")
	@ApiOperation(value = "cadastra um novo cliente")
	public Customer addCustomer(@RequestBody Customer customer) {
		return customerService.addCustomer(customer);
	}
	
	@PutMapping("/customer/id/{id}")
	@ApiOperation(value = "atualiza dados do cliente")
	public Customer updateCustomer(@PathVariable(name = "id") Integer id, @RequestBody Customer customer) {
		return customerService.updateCustomer(id, customer);
	}
}
