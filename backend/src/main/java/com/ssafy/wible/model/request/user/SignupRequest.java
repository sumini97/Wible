package com.ssafy.wible.model.request.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.ssafy.wible.model.entity.User;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class SignupRequest {
		@ApiModelProperty(required = true)
	    @NotBlank
	    @Email
	    private String email;
	    
	    @ApiModelProperty(required = true)
	    @NotBlank
	    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,12}$")
	    private String password;
	    
	    @ApiModelProperty(required = true)
	    @NotBlank
	    private String name;
	    
	    @ApiModelProperty(required = true)
	    @NotBlank
	    private String nickname;
	    
	    @ApiModelProperty(required = true)
	    @NotBlank
	    private String phone;
	    
	    public User toEntity() {
	    	return User.builder()
	    			.email(this.email)
	    			.password(this.password)
	    			.nickname(this.nickname)
	    			.name(this.name)
	    			.nickname(this.nickname)
	    			.phone(this.phone)
	    			.build();
	    }
}
