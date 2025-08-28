package com.sanctuary.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "users")
public class User extends BaseEntity implements UserDetails {

    private String firstName;

    private String lastName;
    
    private String password;

    @Indexed(unique = true)
    private String mobileNo;

    boolean mobileNoVerified = false;

    @Indexed(unique = true)
    private String email;

    boolean emailVerified = false;

    private List<Role> roles;

    @Indexed(unique = true)
    private String identityNo;

    @Indexed(unique = true)
    private String passportNo;

    private Country country;

    private AccountStatus status = AccountStatus.ACTIVE;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
        //return !(status.equals(AccountStatus.SUSPENDED) || status.equals(AccountStatus.BLOCKED));
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status.equals(AccountStatus.ACTIVE);
    }
}