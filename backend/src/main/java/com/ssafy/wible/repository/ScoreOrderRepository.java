package com.ssafy.wible.repository;

import com.ssafy.wible.model.entity.ScoreOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreOrderRepository extends JpaRepository<ScoreOrder, Integer> {
}