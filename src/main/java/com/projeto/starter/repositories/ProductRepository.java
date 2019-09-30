package com.projeto.starter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projeto.starter.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

	@Query(value = "SELECT * FROM CT_PRODUTO WHERE CTNMPRODUTO LIKE %?1%", nativeQuery = true)
	List<Product> findByName(String name);
	
	@Query(value = "SELECT * FROM CT_PRODUTO WHERE CTDEPRODUTO LIKE %?1%", nativeQuery = true)
	List<Product> findByResume(String resume);

}
