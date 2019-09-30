package com.projeto.starter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projeto.starter.models.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

	@Query(value = "SELECT * FROM CT_FUNCIONARIO WHERE CTNMFUNCIONARIO LIKE %?1%", nativeQuery = true)
	List<Employee> findByName(String name);
	
	@Query(value = "SELECT * FROM CT_FUNCIONARIO WHERE CTNUCPF = ?1", nativeQuery = true)
	Employee findByCpf(String cpf);
	
	/*@Modifying
	@Query(value = "INSERT INTO CT_FUNCIONARIO (CTNUCPF, CTNMFUNCIONARIO, CTNUTELEFONE, CTNMEMAIL, CTNMCARGO) " + 
				   "VALUES(?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
	Employee save(String cpf, String name, String fone, String email, String position);*/
	
}
