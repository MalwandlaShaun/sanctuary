package com.sanctuary.dto;

import com.sanctuary.model.Country;
import com.sanctuary.model.Role;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto extends BaseDto {

    private String fullName;

    private String mobileNo;

    boolean mobileNoVerified = false;

    private String email;

    boolean emailVerified = false;

    private String identityNo;

    private String passportNo;

    private Country country;

}