package com.ssafy.wible.model.response.wine;

import com.ssafy.wible.model.enums.Country;
import com.ssafy.wible.model.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SearchWineResponse {
    private int wineSeq;
    private String kname;
    private String ename;
    private Type type;
    private Country country;
    private String grapes;
    private int price;
    private String img_path;
    private double score;
}
