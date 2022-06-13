package com.ssafy.wible.model.response.user;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.ssafy.wible.model.enums.Country;
import com.ssafy.wible.model.enums.Type;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewResponse {
	
	@ApiModelProperty(value = "wine_seq")
	private int wine_seq;
	@ApiModelProperty(value = "review_seq")
	private int review_seq;
    @ApiModelProperty(value = "kname")
    private String kname;
    @ApiModelProperty(value = "ename")
    private String ename;
    @ApiModelProperty(value = "type")
    @Enumerated(EnumType.STRING)
    private Type type;
    @ApiModelProperty(value = "grapes")
    private String grapes;
    @ApiModelProperty(value = "review_cnt")
    private int review_cnt;
    @ApiModelProperty(value = "review_score")
    private Double review_score;
    @ApiModelProperty(value = "country")
    @Enumerated(EnumType.STRING)
    private Country country;
    @ApiModelProperty(value = "img_path")
    private String img_path;
    @ApiModelProperty(value = "review_text")
    private String review_text;
}
