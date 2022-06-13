package com.ssafy.wible.api.controller.wine;

import com.ssafy.wible.model.entity.Wine;
import com.ssafy.wible.model.enums.Country;
import com.ssafy.wible.model.enums.Type;
import com.ssafy.wible.model.response.wine.SearchWineResponse;
import com.ssafy.wible.service.SearchService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} , maxAge = 6000)
@RestController
@RequestMapping("api/search")
@Api("검색 컨트롤러")
public class SearchController {
    @Autowired
    private SearchService searchService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping("")
    public ResponseEntity<Page<SearchWineResponse>> search(@RequestParam(value="keyword", defaultValue = "") String keyword,
                                             @RequestParam(value="price_lower", defaultValue = "0") int price_lower,
                                             @RequestParam(value="price_upper", defaultValue = "100") int price_upper,
                                             @RequestParam(value="body", required = false) List<Integer> body,
                                             @RequestParam(value="tannin", defaultValue = "-1") int tannin,
                                             @RequestParam(value="sweet", required = false) List<Integer> sweet,
                                             @RequestParam(value="acidity", defaultValue = "-1") int acidity,
                                             @RequestParam(value="type", required = false) List<String> type,
                                             @RequestParam(value="country", required = false) List<String> country,
                                             @PageableDefault(size = 10, sort = "likeCnt", direction = Sort.Direction.DESC) Pageable pageRequest
    ) throws Exception {

        List<Type> types = new ArrayList<>();
        if (type != null) {
            for(String s: type) types.add(Type.valueOf(s.toUpperCase()));
        }

        List<Country> countries = new ArrayList<>();
        if (country != null) {
            for(String s: country) countries.add(Country.valueOf(s.toUpperCase()));
        }

        return new ResponseEntity<Page<SearchWineResponse>>(searchService.search(keyword, price_lower, price_upper, types, body, tannin, sweet, acidity, countries, pageRequest), HttpStatus.OK);
    }
}
