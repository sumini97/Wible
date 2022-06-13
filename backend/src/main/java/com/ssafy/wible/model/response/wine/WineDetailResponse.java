package com.ssafy.wible.model.response.wine;

import com.ssafy.wible.model.enums.Country;
import com.ssafy.wible.model.enums.Type;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WineDetailResponse {
    @ApiModelProperty(value = "wineSeq")
    private int wineSeq;
    @ApiModelProperty(value = "kname")
    private String kname;
    @ApiModelProperty(value = "ename")
    private String ename;
    @ApiModelProperty(value = "type")
    private Type type;
    @ApiModelProperty(value = "country")
    private Country country;
    @ApiModelProperty(value = "winery")
    private String winery;
    @ApiModelProperty(value = "grapes")
    private String grapes;
    @ApiModelProperty(value = "alcohol")
    private String alcohol;
    @ApiModelProperty(value = "price")
    private int price;
    @ApiModelProperty(value = "body")
    private int body;
    @ApiModelProperty(value = "tannin")
    private int tannin;
    @ApiModelProperty(value = "sweet")
    private int sweet;
    @ApiModelProperty(value = "acidity")
    private int acidity;
    @ApiModelProperty(value = "img_path")
    private String img_path;
    @ApiModelProperty(value = "food")
    private String food;
    @ApiModelProperty(value = "like_cnt")
    private int like_cnt;
    @ApiModelProperty(value = "review_cnt")
    private int review_cnt;
    @ApiModelProperty(value = "score")
    private double score;
    @ApiModelProperty(value = "like_check")
    private Boolean like_check;
}
