package com.projeto.starter;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoder {
	
	public static void main(String[] args) {
		
		// criptografia de senhas
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		System.out.println(passwordEncoder.encode("senha"));
		System.out.println(passwordEncoder.encode("jose"));
		System.out.println(passwordEncoder.encode("123456"));
		System.out.println(passwordEncoder.encode("root"));
	}
		
}
