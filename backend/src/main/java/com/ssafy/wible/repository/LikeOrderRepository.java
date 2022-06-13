package com.ssafy.wible.repository;

import com.ssafy.wible.model.entity.LikeOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeOrderRepository extends JpaRepository<LikeOrder, Integer> {
}