package com.projeto.starter.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.starter.models.Employee;
import com.projeto.starter.services.EmployeeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@RestController
@RequestMapping(value = "/api", produces = "application/json")
@Api(value = "Funcionário") //@Api marca a classe como um recurso do swagger
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;

	@GetMapping("/employee")
	@ApiOperation(value = "lista todos os funcionários") //@ApiOperation descreve o método no swagger-ui
	public List<Employee> getAllEmployees() {
		return employeeService.getAllEmployees();
	}

	@GetMapping("/employee/name/{name}")
	@ApiOperation(value = "busca o funcionário pelo nome")
	public List<Employee> getEmployeeByName(@PathVariable(name = "name") String name) {
		return employeeService.getEmployeeByName(name);
	}

	@GetMapping("/employee/cpf/{cpf}")
	@ApiOperation(value = "busca o funcionário pelo cpf")
	public Employee getEmployeeByCpf(@PathVariable(name = "cpf") String cpf) {
		return employeeService.getEmployeeByCpf(cpf);
	}

	@PostMapping("/employee")
	@ApiOperation(value = "cadastra um novo funcionário")
	public Employee addEmployee(@RequestBody Employee employee) {
		return employeeService.addEmployee(employee);
	}

	@PutMapping("/employee/id/{id}")
	@ApiOperation(value = "atualiza dados do funcionário")
	public Employee updateEmployee(@PathVariable(name = "id") Integer id, @RequestBody Employee employee) {
		return employeeService.updateEmployee(id, employee);
	}
}
