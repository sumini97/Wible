package com.ssafy.wible.repository;

import com.ssafy.wible.model.entity.Wine;
import com.ssafy.wible.model.enums.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import javax.transaction.Transactional;

public interface WineRepository extends JpaRepository<Wine, Integer>, JpaSpecificationExecutor<Wine> {
    List<Wine> findTop5ByTypeEqualsOrderByLikeCntDesc(Type type);
    List<Wine> findTop5ByTypeEqualsOrderByReviewCntDesc(Type type);
    List<Wine> findTop5ByTypeEqualsOrderByScoreDesc(Type type);
    Page<Wine> findAll(Pageable pageable);
    Page<Wine> findAll(Specification<Wine> spec, Pageable pageable);
    Page<Wine> findWinesByFoodContains(String food, Pageable pageable);
    
    List<Wine> findAllByTypeAndCluster(Type type, int cluster);
    
    @Transactional
    @Modifying
	@Query(value="Update wine set like_cnt = like_cnt + 1 where wine_seq = :wineSeq", nativeQuery=true)
	void updateLikeCount(@Param("wineSeq")int wineSeq);
    
    @Transactional
    @Modifying
	@Query(value="Update wine set like_cnt = like_cnt - 1 where wine_seq = :wineSeq", nativeQuery=true)
	void updateDislikeCount(@Param("wineSeq") int wineSeq);
    
    @Transactional
    @Modifying
	@Query(value="Update wine set review_cnt = review_cnt + 1 where wine_seq = :wineSeq", nativeQuery=true)
	void updateReviewCount(@Param("wineSeq") int wineSeq);
    
    @Transactional
    @Modifying
	@Query(value="Update wine set review_cnt = review_cnt - 1 where wine_seq IN (select wine_seq from review where review_seq = :reviewSeq)", nativeQuery=true)
	void deleteReviewCount(int reviewSeq);
}