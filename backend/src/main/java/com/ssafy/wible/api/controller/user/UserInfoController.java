package com.ssafy.wible.api.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wible.model.request.user.UserInfoRequest;
import com.ssafy.wible.model.response.user.UserResponse;
import com.ssafy.wible.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} , maxAge = 6000)
@RestController
@RequestMapping("api/userinfo")
@Api("회원정보 컨트롤러")
public class UserInfoController {

	@Autowired
	private UserService userService;
	
    @ApiOperation(value = "회원 정보조회 by seq")
	@GetMapping("/seq/{userSeq}")
	public Object userInfoBySeq(@PathVariable("userSeq") @ApiParam(value = "유저의 seq.", required = true) int userSeq) {
    	final UserResponse response = userService.getUserInfo(userSeq).toResponse();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
    
    @ApiOperation(value = "회원 정보조회 by email")
	@GetMapping("/email/{email}")
	public Object userInfoByEmail(@PathVariable("email") @ApiParam(value = "유저의 email.", required = true) String email) {
    	final UserResponse response = userService.getUserInfo(email).toResponse();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
    
    @ApiOperation(value = "회원 정보수정")
	@PutMapping
	public Object modifyUserInfo(@RequestBody UserInfoRequest request) {
    	userService.modify(request.getUser_seq(), request.getNickname(), request.getPhone());
		return new ResponseEntity<>(HttpStatus.OK);
	}
    
    @ApiOperation(value = "회원 비밀번호 수정")
	@PutMapping("/password")
	public Object modifyUserPassword(@RequestBody UserInfoRequest request) {
    	userService.modify(request.getUser_seq(), request.getPassword());
		return new ResponseEntity<>(HttpStatus.OK);
	}
    
    @ApiOperation(value = "회원이 작성한 리뷰 리스트 조회")
	@GetMapping("/reviews/{userSeq}")
	public Object getReviews(@PathVariable("userSeq") @ApiParam(value = "유저의 seq.", required = true) int userSeq, @PageableDefault(size=5, sort = "reviewSeq", direction = Sort.Direction.DESC) Pageable pageRequest) {
    	return new ResponseEntity<>(userService.getReviewList(userSeq, pageRequest), HttpStatus.OK);
	}
    
    @ApiOperation(value = "회원이 좋아요한 와인 리스트 조회")
	@GetMapping("/likes/{userSeq}")
	public Object getLikes(@PathVariable("userSeq") @ApiParam(value = "유저의 seq.", required = true) int userSeq, @PageableDefault(size=5, sort = "likeSeq", direction = Sort.Direction.DESC) Pageable pageRequest) {
		return new ResponseEntity<>(userService.getLikeList(userSeq, pageRequest), HttpStatus.OK);
	}
}
