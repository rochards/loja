package com.projeto.starter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projeto.starter.models.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	@Query(value = "SELECT * FROM CT_CLIENTE WHERE CTNMCLIENTE LIKE %?1%", nativeQuery = true)
	List<Customer> findByName(String name);

	@Query(value = "SELECT * FROM CT_CLIENTE WHERE CTNUCPF = ?1", nativeQuery = true)
	Customer findByCpf(String cpf);

}
