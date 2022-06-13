package com.ssafy.wible.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	
	Page<Likes> findAllByUserSeq(int userSeq, Pageable pageRequest);
	
	List<Likes> findAllByUserSeq(int userSeq);
	
	boolean existsByUserSeqAndWineSeq(int userSeq, int wineSeq);
}
