package com.sanctuary.dto;

import com.sanctuary.model.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto extends BaseDto {

    private String username;
    private String email;
    private Role role;

}