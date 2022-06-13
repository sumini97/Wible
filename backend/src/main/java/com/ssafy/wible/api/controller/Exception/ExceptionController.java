package com.ssafy.wible.api.controller.Exception;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {
	
	@ExceptionHandler({IllegalArgumentException.class, AuthenticationServiceException.class})
    public Object existEmailException(Exception e, HttpServletRequest request){
		Map<String, Object> result = new HashMap<>();
		result.put("msg", e.getMessage());
        return new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
    }
}
