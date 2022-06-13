package com.ssafy.wible.api.controller.food;

import com.ssafy.wible.model.response.wine.SearchWineResponse;
import com.ssafy.wible.service.FoodService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} , maxAge = 6000)
@RestController
@RequestMapping("api/food")
@Api("검색 컨트롤러")
public class FoodController {

    @Autowired
    private FoodService foodService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping("")
    public ResponseEntity<Page<SearchWineResponse>> search(@RequestParam(value="food", defaultValue = "0") int food,
                                                           @PageableDefault(size = 10, sort = "likeCnt", direction = Sort.Direction.DESC) Pageable pageRequest
    ) throws Exception {
        return new ResponseEntity<Page<SearchWineResponse>>(foodService.searchWine(food, pageRequest), HttpStatus.OK);
    }
}
