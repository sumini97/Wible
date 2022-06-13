package com.ssafy.wible.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.wible.model.entity.Recommend;

public interface RecommendRepository  extends JpaRepository<Recommend, Integer>{

	Recommend findByUserSeq(int userSeq);
}
