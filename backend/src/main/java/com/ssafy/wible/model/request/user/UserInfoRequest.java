package com.ssafy.wible.model.request.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UserInfoRequest {

	@ApiModelProperty(required = true)
    private int user_seq;
    
    @ApiModelProperty(required = true)
    private String nickname;
    
    @ApiModelProperty(required = true)
    private String phone;

    @ApiModelProperty(required = true)
    private String password;

}
