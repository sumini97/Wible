package com.ssafy.wible.api.controller.wine;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wible.model.entity.Review;
import com.ssafy.wible.model.entity.Wine;
import com.ssafy.wible.model.request.wine.ReviewCreateRequest;
import com.ssafy.wible.model.request.wine.ReviewUpdateRequest;
import com.ssafy.wible.model.request.wine.WineLikeRequest;
import com.ssafy.wible.model.response.wine.SimpleWineResponse;
import com.ssafy.wible.service.BestWineService;
import com.ssafy.wible.service.WineService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} , maxAge = 6000)
@RestController
@RequestMapping("api/wine")
@Api("와인 컨트롤러")
public class WineController {
	public static final Logger logger= LoggerFactory.getLogger(WineController.class);

	@Autowired
	private WineService wineService;

	@Autowired
	private BestWineService bestWineService;
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@ApiOperation(value = "wine detail", notes = "와인 상세조회", response = Wine.class)
	@GetMapping("{wineSeq}")
	public Object wineGet(@PathVariable @ApiParam(value = "와인 번호.", required = true) int wineSeq, @RequestParam @ApiParam(value = "유저 번호", required = true) int userSeq) {
		return new ResponseEntity<>(wineService.wineGet(userSeq, wineSeq), HttpStatus.OK);
	}
	
	@ApiOperation(value = "review create", notes = "리뷰 작성, DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping("/review")
	public ResponseEntity<String> reviewCreate(@RequestBody @ApiParam(value = "리뷰 내용.", required = true) ReviewCreateRequest request) {
		int wineSeq = request.getWineSeq();
		wineService.wineReviewUpdate(wineSeq);
		wineService.reviewCreate(request);
	    return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
	
	@ApiOperation(value = "review delete", notes = "리뷰 삭제, DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/review")
	public ResponseEntity<String> reviewDelete(@RequestParam @ApiParam(value = "삭제할 댓글번호.", required = true) int reviewSeq) {
		wineService.wineReviewDelete(reviewSeq);
		wineService.reviewDelete(reviewSeq);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		
	}
	
	@ApiOperation(value = "review update", notes = "리뷰 수정, DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PutMapping("/review")
	public ResponseEntity<String> reviewUpdate(@RequestBody ReviewUpdateRequest request){
		wineService.reviewUpdate(request.getReviewSeq(), request.getReviewScore(), request.getReviewText());
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
	
	
	@ApiOperation(value = "review list", notes = "리뷰 목록 조회", response = Review.class)
	@GetMapping("/review/{wineSeq}")
	public ResponseEntity<Page<Review>> reviewGet(@PathVariable("wineSeq") @ApiParam(value = "와인 번호.", required = true) int wineSeq, @PageableDefault(size=5, sort = "reviewSeq", direction = Sort.Direction.DESC) Pageable pageRequest) {
		return new ResponseEntity<Page<Review>>(wineService.reviewGet(wineSeq, pageRequest), HttpStatus.OK);
	}
	
	@ApiOperation(value = "wine like", notes = "와인 좋아요, DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping("/like")
	public ResponseEntity<String> wineLike(@RequestBody @ApiParam(value = "와인 좋아요.", required = true) WineLikeRequest request) {
		wineService.wineLike(request);
		
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
	
	@ApiOperation(value = "wine dislike", notes = "와인 좋아요 취소, DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/like")
	public ResponseEntity<String> wineDislike(@RequestParam @ApiParam(value = "유저 번호.", required = true) int userSeq, @RequestParam @ApiParam(value = "와인 번호.", required = true) int wineSeq) {
		wineService.wineDislike(userSeq, wineSeq);
		
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@GetMapping("/best")
	public ResponseEntity<String> setBestWine() throws Exception {
		logger.info("인기 와인 저장");
		bestWineService.setBestWine();
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@GetMapping("/best/like/{type}")
	public ResponseEntity<List<SimpleWineResponse>> getBestLikeWine(@PathVariable("type") String type) throws Exception {
		return new ResponseEntity<List<SimpleWineResponse>>(bestWineService.getBestLikeWine(type), HttpStatus.OK);
	}

	@GetMapping("/best/score/{type}")
	public ResponseEntity<List<SimpleWineResponse>> getBestScoreWine(@PathVariable("type") String type) throws Exception {
		return new ResponseEntity<List<SimpleWineResponse>>(bestWineService.getBestScoreWine(type), HttpStatus.OK);
	}

	@GetMapping("/best/review/{type}")
	public ResponseEntity<List<SimpleWineResponse>> getBestReviewWine(@PathVariable("type") String type) throws Exception {
		return new ResponseEntity<List<SimpleWineResponse>>(bestWineService.getBestReviewWine(type), HttpStatus.OK);
	}

	@GetMapping("/add")
	public ResponseEntity<String> add() throws Exception {
		logger.info("와인 추가");
		bestWineService.add();
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
	
	@GetMapping("/{type}/{userSeq}")
	public ResponseEntity<List<SimpleWineResponse>> getRecommentWine(@PathVariable("type") String type, @PathVariable("userSeq") int userSeq) throws Exception {
		return new ResponseEntity<List<SimpleWineResponse>>(bestWineService.getRecommendWine(type, userSeq), HttpStatus.OK);
	}
}
