package com.projeto.starter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projeto.starter.models.Report;

public interface ReportRepository extends JpaRepository<Report, Integer> {

	@Query(value = "SELECT * FROM CT_RELATORIOS ORDER BY CTCDRELATORIO DESC LIMIT 1", nativeQuery = true)
	Report findLastReport();
	
	@Query(value = "SELECT CTDTVENDA, COUNT(*) AS QUANTIDADE FROM CT_RELATORIOS GROUP BY CTDTVENDA", nativeQuery = true)
	List<Object> findByDate();
}
