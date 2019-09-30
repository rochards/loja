package com.projeto.starter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.starter.models.Product;
import com.projeto.starter.services.ProductService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_EMPLOYEE')")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
@Api(value = "Produto") //@Api marca a classe como um recurso do swagger
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@GetMapping("/product")
	@ApiOperation(value = "lista todos os produtos") //@ApiOperation descreve o método no swagger-ui
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}
	
	@GetMapping("product/id/{id}")
	@ApiOperation(value = "busca o produto por id")
	public Product getProductById(@PathVariable(name = "id") Integer id) {
		return productService.getProductById(id);
	}
	
	@GetMapping("/product/name/{name}")
	@ApiOperation(value = "busca o produto por nome")
	public List<Product> getProductByName(@PathVariable(name = "name") String name) {
		return productService.getProductByName(name);
	}
	
	@GetMapping("/product/resume/{resume}")
	@ApiOperation(value = "busca o produto pela descricao")
	public List<Product> getProductByResume(@PathVariable(name = "resume") String resume) {
		return productService.getProductByResume(resume);
	}
	
	@PostMapping("/product")
	@ApiOperation(value = "cadastra um novo produto")
	public Product addProduct(@RequestBody Product product) {
		return productService.addProduct(product);
	}
	
	@PutMapping("/product/id/{id}")
	@ApiOperation(value = "atualiza dados do produto")
	public Product updadeProduct(@PathVariable(name = "id") Integer id, @RequestBody Product product) {
		return productService.updadeProduct(id, product);
	}
}
