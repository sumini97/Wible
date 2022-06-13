package com.ssafy.wible.api.controller.user;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wible.model.request.user.LoginRequest;
import com.ssafy.wible.model.request.user.SignupRequest;
import com.ssafy.wible.model.response.user.ValidResponse;
import com.ssafy.wible.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} , maxAge = 6000)
@RestController
@RequestMapping("api/user")
@Api("회원가입 컨트롤러")
public class UserController {
	
	@Autowired
	private UserService userService;

	@PostMapping
	@ApiOperation(value = "가입하기")
	public Object signup(@RequestBody @Valid SignupRequest request) {
		userService.signup(request);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/email/{email}")
	@ApiOperation(value = "email 중복 검사")
	public Object emailCheck(@PathVariable String email) {
		ValidResponse response = new ValidResponse();
		response.valid = !userService.emailCheck(email);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/nickname/{nickname}")
	@ApiOperation(value = "닉네임 중복 검사")
	public Object nicknameCheck(@PathVariable String nickname) {
		ValidResponse response = new ValidResponse();
		response.valid = !userService.nicknameCheck(nickname);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/phone/{phone}")
	@ApiOperation(value = "핸드폰 번호 중복 검사")
	public Object phoneCheck(@PathVariable String phone) {
		ValidResponse response = new ValidResponse();
		response.valid = !userService.phoneCheck(phone);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
    @DeleteMapping("/{email}")
    @ApiOperation(value = "회원탈퇴 요청")
    public Object userDelete(@PathVariable("email") @ApiParam(value = "유저의 email.", required = true) String email) {
    	userService.deleteUser(email);
    	return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping("/login")
    @ApiOperation(value = "로그인요청")
    public Object signin(@RequestBody LoginRequest request) {
    	Map<String, Object> resultMap = new HashMap<>();
    	resultMap.put("token", userService.login(request.getEmail(), request.getPassword()));
    	resultMap.put("userSeq", userService.getUserInfo(request.getEmail()).getUserSeq());
    	return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
