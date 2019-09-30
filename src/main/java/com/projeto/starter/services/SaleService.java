package com.projeto.starter.services;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.starter.models.Sale;
import com.projeto.starter.repositories.SaleRepository;

@Service
public class SaleService {

	@Autowired
	private SaleRepository saleRepository;
	
	public List<Sale> getAllSales() {
		
		List<Sale> sales = saleRepository.findAll();
		
		if (sales.isEmpty())
			throw new NoSuchElementException("No elements");
		
		return sales;
	}
	
	public List<Sale> getAllSalesDesc() {
		
		List<Sale> sales = saleRepository.findByOrderByIdDesc();
		
		if (sales.isEmpty())
			throw new NoSuchElementException("No elements");
		
		return sales;
	}
	
	public List<Sale> getSaleByEmployee(String cpf) {
		
		List<Sale> sales = saleRepository.findByEmployee(cpf);
		
		if (sales.isEmpty())
			throw new NoSuchElementException("No elements");
		
		return sales;
	}
	
	public Sale addSale(@Valid Sale sale) {
		Sale sl = saleRepository.save(sale);
		//System.out.println(sl.getId());
		//System.out.println((saleRepository.findById(sl.getId()).get()).getDateTimeSale());
		return saleRepository.findById(sl.getId()).get();
	}
}
