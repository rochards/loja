package com.projeto.starter.services;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.starter.models.Customer;
import com.projeto.starter.models.Product;
import com.projeto.starter.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	public Product getProductById(Integer id) {
	
		Product product = productRepository.findById(id).get();
		
		if (product == null) {
			throw new NoSuchElementException("Not found " + id);
		}
		
		return product;
	}
	
	public List<Product> getAllProducts() {
		
		List<Product> products = productRepository.findAll(); 
		
		if (products.isEmpty())
			throw new NoSuchElementException("No elements");
		
		return products;
	}

	public List<Product> getProductByName(String name) {
		
		List<Product> products = productRepository.findByName(name); 
		
		if (products.isEmpty())
			throw new NoSuchElementException("Not found " + name);
		
		return products;
	}
	
	public List<Product> getProductByResume(String resume) {
		
		List<Product> products = productRepository.findByResume(resume);
		
		if (products.isEmpty())
			throw new NoSuchElementException("Not found " + resume);
		
		return products;
	}

	public Product addProduct(@Valid Product product) {
		return productRepository.save(product);
	}
	
	public Product updadeProduct(Integer id, @Valid Product product) {
		
		Product prod = productRepository.findById(id).get();
		
		prod.setName(product.getName());
		prod.setResume(product.getResume());
		prod.setPrice(product.getPrice());
		prod.setQuantity(product.getQuantity());
		
		return productRepository.save(prod);
	}

}
