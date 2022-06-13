package com.ssafy.wible.model.request.wine;

import javax.validation.constraints.NotBlank;

import com.ssafy.wible.model.entity.Review;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ReviewUpdateRequest {
	@ApiModelProperty(required = true)
	@NotBlank
	private int reviewSeq;
	
	@ApiModelProperty(required = true)
	@NotBlank
	private String reviewText;
	
	@ApiModelProperty(required = true)
	@NotBlank
	private double reviewScore;
	
	public Review toEntity() {
		return Review.builder()
					 .reviewSeq(reviewSeq)
					 .reviewText(reviewText)
					 .reviewScore(reviewScore)
					 .build();
	}
}
