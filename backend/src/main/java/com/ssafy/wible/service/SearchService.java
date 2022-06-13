package com.ssafy.wible.service;

import com.ssafy.wible.model.entity.Wine;
import com.ssafy.wible.model.enums.Country;
import com.ssafy.wible.model.enums.Type;
import com.ssafy.wible.model.response.wine.SearchWineResponse;
import com.ssafy.wible.repository.WineRepository;
import com.ssafy.wible.repository.WineSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchService {
    @Autowired
    private WineRepository wineRepository;

    public Page<SearchWineResponse> search(String keyword, int start, int end, List<Type> types, List<Integer> body, int tannin, List<Integer> sweet, int acidity, List<Country> countries, Pageable pageRequest){
        start = start * 10000;
        if(end >= 100) end = Integer.MAX_VALUE;
        else end = end * 10000;

        Specification<Wine> spec = Specification.where(WineSpecification.betweenPrice(start, end));
        if(!keyword.equals("")) {
            System.out.println(keyword);
            spec = spec.and(WineSpecification.likeKeyword(keyword));
        }
        if(types.size() != 0) spec = spec.and(WineSpecification.equalsType(types));
        if(countries.size() != 0) spec = spec.and(WineSpecification.equalsCountry(countries));
        if(body.size() != 0) spec = spec.and(WineSpecification.equalsBody(body));
        if(tannin != -1) spec = spec.and(WineSpecification.equalsTannin(tannin));
        if(acidity != -1) spec = spec.and(WineSpecification.equalsAcidity(acidity));
        if(sweet.size() != 0) spec = spec.and(WineSpecification.equalsSweet(sweet));
        Page<Wine> wines = wineRepository.findAll(spec, pageRequest);
        Page<SearchWineResponse> result = wines.map(
                post -> new SearchWineResponse(post.getWineSeq(), post.getKname(), post.getEname(), post.getType(), post.getCountry(), post.getGrapes(), post.getPrice(), post.getImgPath(), post.getScore()));
        return result;
    }
}
