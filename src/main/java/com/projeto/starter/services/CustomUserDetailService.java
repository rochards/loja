package com.projeto.starter.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.projeto.starter.models.User;
import com.projeto.starter.repositories.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = Optional.ofNullable(userRepository.findByUsername(username))
			.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		List<GrantedAuthority> authorityListManager =  AuthorityUtils.createAuthorityList("ROLE_EMPLOYEE", "ROLE_MANAGER");
		List<GrantedAuthority> authorityListEmployee =  AuthorityUtils.createAuthorityList("ROLE_EMPLOYEE");
		
		return new org.springframework.security.core.userdetails.User(user.getUsername(), 
				user.getPassword(), user.isManager() ? authorityListManager : authorityListEmployee);
	}

}
