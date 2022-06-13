package com.ssafy.wible.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.wible.model.entity.WineInfo;
import com.ssafy.wible.repository.WineInfoRepository;

@Service
public class WineInfoService {
	
	@Autowired
	private WineInfoRepository wineInfoRepository;
	
	public List<WineInfo> wineInfoTypeGet(String type) {
		return wineInfoRepository.findByType(type);
	}

	public List<WineInfo> wineInfoGet() {
		return wineInfoRepository.findAll();
	}

}
