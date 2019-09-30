package com.projeto.starter.services;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.starter.models.Employee;
import com.projeto.starter.repositories.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	EmployeeRepository employeeRepository;

	public List<Employee> getAllEmployees() {

		List<Employee> employees = employeeRepository.findAll();

		if (employees.isEmpty())
			throw new NoSuchElementException("No elements");

		return employees;
	}

	public List<Employee> getEmployeeByName(String name) {
		
		List<Employee> employees = employeeRepository.findByName(name);
		
		if (employees.isEmpty())
			throw new NoSuchElementException("Not found " + name);
		
		return employees;
	}

	public Employee getEmployeeByCpf(String cpf) {

		Employee employee = employeeRepository.findByCpf(cpf);

		if (employee == null)
			throw new NoSuchElementException("Not found " + cpf);

		return employee;
	}

	public Employee addEmployee(@Valid Employee employee) {
		return employeeRepository.save(employee);
	}
	
	public Employee updateEmployee(Integer id, @Valid Employee employee) {
		
			Employee emp = employeeRepository.findById(id).get();
			
			emp.setCpf(employee.getCpf());
			emp.setName(employee.getName());
			emp.setFone(employee.getFone());
			emp.setEmail(employee.getEmail());
			emp.setPosition(employee.getPosition());
			
			return employeeRepository.save(emp);
	}
}
