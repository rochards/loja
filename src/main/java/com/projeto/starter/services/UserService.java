package com.projeto.starter.services;

import java.util.NoSuchElementException;
import java.util.logging.Logger;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.projeto.starter.models.User;
import com.projeto.starter.repositories.UserRepository;

@Service
public class UserService {
	
	Logger logger = Logger.getLogger(UserService.class.getName());

	@Autowired
	private UserRepository userRepository;
	
	public User getUserByCpf(String cpf) {
		
		User user = userRepository.findById(cpf).get();

		if (user == null) {
			throw new NoSuchElementException("Not found " + cpf);
		}
		
		return user;
	}
	
	public User getUserByUsername(String username) {
		
		User user = userRepository.findByUsername(username);
		
		if (user == null) {
			throw new NoSuchElementException("Not found " + username);
		}
		
		return user;
	}
	
	public User addUser(@Valid User user) {
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		if (userRepository.findByUsername(user.getUsername()) != null ||
				userRepository.findById(user.getCpf()).isPresent()) {
			throw new DataIntegrityViolationException("Already exists " + user.getCpf() + " or " + user.getUsername());
		}
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		return userRepository.save(user);
	}
	
	public User updateUser(String cpf, User user) {
		User usr = userRepository.findById(cpf).get();
		
		usr.setCpf(user.getCpf());
		
		if (user.getUsername() != null && !user.getUsername().isEmpty()) {
			usr.setUsername(user.getUsername());
		}
		
		if (user.getPassword() != null && !user.getPassword().isEmpty()) {
			
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			usr.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		
		usr.setManager(user.isManager());
		
		return userRepository.save(usr);
	}
}
