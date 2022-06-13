package com.ssafy.wible.repository;

import com.ssafy.wible.model.entity.ReviewOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewOrderRepository extends JpaRepository<ReviewOrder, Integer> {
}