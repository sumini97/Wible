package com.ssafy.wible.service;

import com.ssafy.wible.model.entity.Wine;
import com.ssafy.wible.model.response.wine.SearchWineResponse;
import com.ssafy.wible.repository.WineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FoodService {
    @Autowired
    private WineRepository wineRepository;

    public Page<SearchWineResponse> searchWine(int food, Pageable pageRequest) {
        String foodString = "";
        if (food == 1) foodString = "소고기";
        else if (food == 2) foodString = "돼지고기";
        else if (food == 3) foodString = "닭고기";
        else if (food == 4) foodString = "오리고기";
        else if (food == 5) foodString = "양고기";
        else if (food == 6) foodString = "사슴고기";
        else if (food == 7) foodString = "송아지고기";
        else if (food == 8) foodString = "절임육";
        else if (food == 9) foodString = "연어";
        else if (food == 10) foodString = "참치";
        else if (food == 11) foodString = "조개류";
        else if (food == 12) foodString = "생선류";
        else if (food == 13) foodString = "파스타";
        else if (food == 14) foodString = "매운요리";
        else if (food == 15) foodString = "버섯";
        else if (food == 16) foodString = "치즈";
        else if (food == 17) foodString = "과일";
        else if (food == 18) foodString = "샐러드";
        else if (food == 19) foodString = "디저트";
        else if (food == 20) foodString = "스낵류";
        else if (food == 21) foodString = "식전주";


        Page<Wine> wines = null;
        if (foodString.equals("")){
            wines = wineRepository.findAll(pageRequest);
        }
        else {
            wines = wineRepository.findWinesByFoodContains(foodString, pageRequest);
        }

        Page<SearchWineResponse> result = wines.map(
                post -> new SearchWineResponse(post.getWineSeq(), post.getKname(), post.getEname(), post.getType(), post.getCountry(), post.getGrapes(), post.getPrice(), post.getImgPath(), post.getScore()));
        return result;
    }
}
