package com.projeto.starter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projeto.starter.models.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Integer> {
	
	@Query(value = "SELECT * FROM CT_VENDA WHERE CTCDFUNCIONARIO IN (SELECT CTCDFUNCIONARIO FROM CT_FUNCIONARIO WHERE CTNUCPF = ?1)", nativeQuery = true)
	List<Sale> findByEmployee(String cpf);
	
	@Query(value = "SELECT * FROM CT_VENDA ORDER BY CTCDVENDA DESC", nativeQuery = true)
	List<Sale> findByOrderByIdDesc();
}
