package com.ssafy.wible.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ssafy.wible.model.entity.Likes;
import com.ssafy.wible.model.entity.Review;
import com.ssafy.wible.model.entity.Wine;
import com.ssafy.wible.model.request.wine.ReviewCreateRequest;
import com.ssafy.wible.model.request.wine.WineLikeRequest;
import com.ssafy.wible.model.response.wine.WineDetailResponse;
import com.ssafy.wible.repository.ReviewRepository;
import com.ssafy.wible.repository.WineLikeRepository;
import com.ssafy.wible.repository.WineRepository;

@Service
public class WineService {
	@Autowired
	private WineRepository wineRepository;
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private WineLikeRepository wineLikeRepository;
	
	public WineDetailResponse wineGet(int userSeq, int wineSeq) {
		Wine wine = wineRepository.findById(wineSeq).orElse(null);
		boolean like_check = wineLikeRepository.existsByUserSeqAndWineSeq(userSeq, wineSeq);
		return new WineDetailResponse(wine.getWineSeq(), wine.getKname(), wine.getEname(), wine.getType(), wine.getCountry(), wine.getWinery(), wine.getGrapes(), wine.getAlcohol(), wine.getPrice(), wine.getBody(), wine.getTannin(), wine.getSweet(), wine.getAcidity(), wine.getImgPath(), wine.getFood(), wine.getLikeCnt(), wine.getReviewCnt(), wine.getScore(), like_check);
	}

	public void reviewCreate(ReviewCreateRequest request) {
		Review review = request.toEntity();
		reviewRepository.save(review);
	}

	public void reviewDelete(int reviewSeq) {
		reviewRepository.deleteById(reviewSeq);
	}

	public Page<Review> reviewGet(int wineSeq, Pageable pageRequest) {
		return reviewRepository.findBywineSeq(wineSeq, pageRequest);
	}

	public void wineLike(WineLikeRequest request) {
		Likes like = request.toEntity();
		if(!wineLikeRepository.existsByUserSeqAndWineSeq(like.getUserSeq(), like.getWineSeq())) {
			wineRepository.updateLikeCount(request.getWineSeq());
			wineLikeRepository.save(like);
		}
	}

	public void wineDislike(int userSeq, int wineSeq) {
		if(wineLikeRepository.existsByUserSeqAndWineSeq(userSeq, wineSeq)) {
			wineRepository.updateDislikeCount(wineSeq);
			wineLikeRepository.deleteByuserSeqAndwineSeq(userSeq, wineSeq);
		}
	}

	public void wineReviewUpdate(int wineSeq) {
		wineRepository.updateReviewCount(wineSeq);
		
	}

	public void wineReviewDelete(int reviewSeq) {
		wineRepository.deleteReviewCount(reviewSeq);
		
	}

	public void reviewUpdate(int reviewSeq, double reviewScore, String reviewText) {
		Review review = reviewRepository.findById(reviewSeq).get();
		review.setReviewScore(reviewScore);
		review.setReviewText(reviewText);
		reviewRepository.save(review);
		
	}
}
