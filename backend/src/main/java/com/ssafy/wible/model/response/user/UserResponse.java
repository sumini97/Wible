package com.ssafy.wible.model.response.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {

    @ApiModelProperty(value = "valid")
    private int user_seq;
    @ApiModelProperty(value = "email")
    private String email;
    @ApiModelProperty(value = "name")
    private String name;
    @ApiModelProperty(value = "nickname")
    private String nickname;
    @ApiModelProperty(value = "phone")
    private String phone;
}
