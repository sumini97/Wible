package com.ssafy.wible.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.wible.model.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	boolean existsByEmail(String email);
	boolean existsByNickname(String nickname);
	boolean existsByPhone(String phone);
	
	User findByEmail(String email);
}
