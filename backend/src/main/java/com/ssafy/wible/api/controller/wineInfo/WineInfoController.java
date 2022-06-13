package com.ssafy.wible.api.controller.wineInfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wible.model.entity.WineInfo;
import com.ssafy.wible.service.WineInfoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} , maxAge = 6000)
@RestController
@RequestMapping("api/wineinfo")
@Api("와인 상식 컨트롤러")
public class WineInfoController {
	
	@Autowired
	private WineInfoService wineInfoService;
	
	@ApiOperation(value = "wine info", notes = "와인 상식 타입별 조회", response = WineInfo.class)
	@GetMapping
	public ResponseEntity<List<WineInfo>> wineInfoGet(){
		return new ResponseEntity<List<WineInfo>>(wineInfoService.wineInfoGet(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "wine info", notes = "와인 상식 타입별 조회", response = WineInfo.class)
	@GetMapping("/{type}")
	public ResponseEntity<List<WineInfo>> wineInfoTypeGet(@PathVariable("type") @ApiParam(value = "와인 상식 타입.", required = true) String type) {
		return new ResponseEntity<List<WineInfo>>(wineInfoService.wineInfoTypeGet(type), HttpStatus.OK);
	}

}
