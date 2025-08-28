package com.sanctuary.service.user.impl;

import com.sanctuary.dto.AuthResponse;
import com.sanctuary.dto.LoginRequest;
import com.sanctuary.dto.RegisterRequest;
import com.sanctuary.dto.UserDto;
import com.sanctuary.exception.throwable.DuplicateException;
import com.sanctuary.exception.throwable.NotAllowedException;
import com.sanctuary.model.Country;
import com.sanctuary.model.Role;
import com.sanctuary.model.User;
import com.sanctuary.repository.UserRepository;
import com.sanctuary.service.user.IUserService;
import com.sanctuary.util.DtoMapper;
import com.sanctuary.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final DtoMapper dtoMapper;

    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        System.out.println("auth");

        User user = (User) authentication.getPrincipal();
        String token = jwtUtil.generateToken(user.getUsername(),user.getRoles().stream().map(Role::name).toList());

        System.out.println(token);
        return new AuthResponse(dtoMapper.map(user, UserDto.class), token);
    }


    @Override
    public void createUser(RegisterRequest registerRequest) {
        User user = dtoMapper.map(registerRequest,User.class);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));


        if(StringUtils.hasText(registerRequest.getIdentityNo()) && StringUtils.hasText(registerRequest.getPassportNo()))
            throw new NotAllowedException("User can't have both an identity number and passport number");

        boolean emailExists = userRepository.existsByEmail(registerRequest.getEmail());
        if(emailExists)
            throw new DuplicateException("Email already exists");

        boolean mobileExists = userRepository.existsByMobileNo(registerRequest.getMobileNo());
        if(mobileExists)
            throw  new DuplicateException("Mobile already exists");


        if(StringUtils.hasText(registerRequest.getIdentityNo())){
            boolean idNoExists = userRepository.existsByIdentityNo(registerRequest.getIdentityNo());

            if(idNoExists)
                throw new DuplicateException("Identity number already exists");
        }

        if (StringUtils.hasText(registerRequest.getPassportNo())) {
            boolean passportExists = userRepository.existsByPassportNo(registerRequest.getPassportNo());

            if(passportExists)
                throw new DuplicateException("Passport number already exists");
        }



        Country country = Optional.ofNullable(Country.fromValue(registerRequest.getCountry())).orElseThrow(
                ()->new NotAllowedException("Country is invalid")
        );

        user.setCountry(country);

        Role role = Optional.ofNullable(Role.fromValue(registerRequest.getRole())).orElseThrow(
                ()-> new NotAllowedException("Role is invalid")
        );

        user.setRoles(List.of(role));

        userRepository.save(user);
    }
}