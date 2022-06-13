package com.ssafy.wible.model.request.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class LoginRequest {

	@ApiModelProperty(required = true)
    private String email;
    
    @ApiModelProperty(required = true)
    private String password;
}
