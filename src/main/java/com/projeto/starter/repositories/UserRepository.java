package com.projeto.starter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.projeto.starter.models.User;

public interface UserRepository extends PagingAndSortingRepository<User, String> {
	
	User findByUsername(String username);
}
