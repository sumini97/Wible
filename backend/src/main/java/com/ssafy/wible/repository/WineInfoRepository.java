package com.ssafy.wible.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.wible.model.entity.WineInfo;

public interface WineInfoRepository extends JpaRepository<WineInfo, Integer>{

	List<WineInfo> findByType(String type);

}
