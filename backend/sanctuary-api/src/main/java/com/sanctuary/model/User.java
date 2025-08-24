package com.sanctuary.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "users")
public class User extends BaseEntity{

    @Indexed(unique = true)
    private String username;
    
    private String password;

    @Indexed(unique = true)
    private String email;
}