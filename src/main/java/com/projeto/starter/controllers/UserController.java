package com.projeto.starter.controllers;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.starter.models.Employee;
import com.projeto.starter.models.Product;
import com.projeto.starter.models.User;
import com.projeto.starter.services.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

//@CrossOrigin(origins = "*"
	//,methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.POST},
//allowedHeaders = {"Content-Type", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Authorization", "X-Requested-With", "requestId", "Correlation-Id"},
//allowCredentials = "true"
//)
@PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_EMPLOYEE')")
@RestController
@RequestMapping(value = "/api")
@Api(value = "Usuário") //@Api marca a classe como um recurso do swagger
public class UserController {
	
	Logger logger = Logger.getLogger(UserController.class.getName());
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/getUser")
	@ApiOperation(value = "retorna o usuário considerando o contexto") //@ApiOperation descreve o método no swagger-ui
	public Object getUser() {
		return SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}

	@GetMapping("/user/username/{username}")
	@ApiOperation(value = "busca o usuário pelo username")
	public User getUserByUsername(@PathVariable(name = "username") String username) {
		return userService.getUserByUsername(username);
	}
	
	@PostMapping("/user")
	@ApiOperation(value = "cadastra um novo usuário")
	public User addUser(@RequestBody User user) {
		
		return userService.addUser(user);
	}
	
	@PutMapping("/user/cpf/{cpf}")
	@ApiOperation(value = "atualiza dados do usuário")
	public User updateUser(@PathVariable(name = "cpf") String cpf, @RequestBody User user) {
		logger.info("PUT "+user.toString());
		return userService.updateUser(cpf, user);
	}
}
