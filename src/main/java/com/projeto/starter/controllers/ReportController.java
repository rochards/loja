package com.projeto.starter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.starter.models.Report;
import com.projeto.starter.services.ReportService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@PreAuthorize("hasRole('ROLE_MANAGER')")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
@Api(value = "Relatórios") //@Api marca a classe como um recurso do swagger
public class ReportController {
	
	@Autowired
	private ReportService reportService;
	
	/*@GetMapping("/reportbydate")
	@ApiOperation(value = "informa quantidade de vendas pela data")
	public ResponseEntity<List<Object>> getByReportByDate() {
		return new ResponseEntity<>(reportService.getByReportByDate(), HttpStatus.OK);
	}*/
	
	@GetMapping("/report")
	@ApiOperation(value = "fornece informações para gerar relatórios")
	public List<Report> getAllReports() {
		return reportService.getAllReports();
	}
}
