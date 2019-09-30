package com.projeto.starter.services;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.starter.models.Customer;
import com.projeto.starter.repositories.CustomerRepository;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;
	
	public List<Customer> getAllCustomers() {
		
		List<Customer> customers = customerRepository.findAll();
		
		if (customers.isEmpty())
			throw new NoSuchElementException("No elements");
		
		return customers;
	}

	public List<Customer> getCustomerByName(String name) {
		
		List<Customer> customers = customerRepository.findByName(name);
		
		if (customers.isEmpty())
			throw new NoSuchElementException("Not found" + name);
		
		return customers;
	}

	public Customer getCustomerByCpf(String cpf) {
		
		Customer customer = customerRepository.findByCpf(cpf);
		
		if (customer == null) {
			throw new NoSuchElementException("Not found " + cpf);
		}
		
		return customer;
	}

	public Customer addCustomer(@Valid Customer customer) {
		return customerRepository.save(customer);
	}

	public Customer updateCustomer(Integer id, @Valid Customer customer) {
		
		Customer cust = customerRepository.findById(id).get();
		
		cust.setName(customer.getName());
		cust.setCpf(customer.getCpf());
		cust.setFone(customer.getFone());
		cust.setEmail(customer.getEmail());
		
		return customerRepository.save(cust);
	}
}
