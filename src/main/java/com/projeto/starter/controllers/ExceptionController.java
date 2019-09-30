package com.projeto.starter.controllers;

import java.util.NoSuchElementException;

import javax.validation.ConstraintViolationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
//@RestController
//@RequestMapping(value = "/api", produces = "application/json")
public class ExceptionController {
	
	private final Logger logger = LoggerFactory.getLogger(ExceptionController.class);
	
	@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Element already exists") // 409
	@ExceptionHandler(DataIntegrityViolationException.class)
	public void conflict(DataIntegrityViolationException ex) {
		logger.error(ex.getMessage());
	}
	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Must not be blanck or null") // 400
	@ExceptionHandler(ConstraintViolationException.class)
	public void invalidArgument(ConstraintViolationException ex) {
		logger.error(ex.getMessage());
	}
	
	@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Element not found") // 404.
	@ExceptionHandler(NoSuchElementException.class)
	public void notFound(NoSuchElementException ex) {
		logger.error(ex.getMessage());
	}
	
	/*@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY, reason = "Unprocessable") //422
	@ExceptionHandler(Exception.class)
	public void exception(Exception ex) {
		logger.error(ex.getMessage());
	}*/
}
