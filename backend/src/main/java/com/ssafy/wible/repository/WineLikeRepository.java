package com.ssafy.wible.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.wible.model.entity.Likes;

public interface WineLikeRepository extends JpaRepository<Likes, Integer>{
	 
	@Transactional
	@Modifying
	@Query(value="Delete from likes where user_seq = :userSeq and wine_seq = :wineSeq", nativeQuery=true)
	void deleteByuserSeqAndwineSeq(@Param("userSeq") int userSeq, @Param("wineSeq") int wineSeq);
}