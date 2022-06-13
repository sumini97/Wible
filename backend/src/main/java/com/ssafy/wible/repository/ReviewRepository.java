package com.ssafy.wible.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.wible.model.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>{

	Page<Review> findAllByUserSeq(int userSeq, Pageable pageable);
	Page<Review> findBywineSeq(int wineSeq, Pageable pageable);
}
