package com.example.prj.service.impl;

import com.example.prj.entity.User;
import com.example.prj.entity.Maid;
import com.example.prj.pojo.AuthenticateRequest;
import com.example.prj.pojo.AuthenticateResponse;
import com.example.prj.repository.UserRepository;
import com.example.prj.repository.MaidRepository;
import com.example.prj.security.JwtService;
import com.example.prj.service.AuthenticateService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticateServiceImpl implements AuthenticateService {

    private final UserRepository userRepo;
    private final MaidRepository maidRepo;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Override
    public AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticateRequest.getEmail(), authenticateRequest.getPassword()
                )
        );

//        UserDetails userDetails = (UserDetails) userRepo.getUserByEmail(authenticateRequest.getEmail())
//                .orElseThrow(() -> new EntityNotFoundException("User not found."));
//        String jwtToken = jwtService.generateToken(userDetails);
//        return AuthenticateResponse.builder().token(jwtToken).id(user.getId()).build();
//    }
//}


        User user= userRepo.getUserByEmail(authenticateRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        UserDetails userDetails = (UserDetails) user;
        String jwtToken = jwtService.generateToken(userDetails);
        return AuthenticateResponse.builder().token(jwtToken).id(user.getId()).build();


//        Maid maid= maidRepo.getMaidByEmail(authenticateRequest.getEmail())
//                .orElseThrow(() -> new EntityNotFoundException("User not found."));
//        UserDetails maidDetails = (UserDetails) maid;
//        jwtToken = jwtService.generateToken(maidDetails);
//        return AuthenticateResponse.builder().token(jwtToken).id(user.getId()).build();

//
    }
}