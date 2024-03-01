package com.example.prj.Controller;

import com.example.prj.pojo.AuthenticateRequest;
import com.example.prj.pojo.AuthenticateResponse;
import com.example.prj.service.AuthenticateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
//@CrossOrigin(origins = "*")

public class AuthenticateController {
    private final AuthenticateService authenticateService;

    @PostMapping("/authenticate")
    public AuthenticateResponse authenticate(@RequestBody AuthenticateRequest authenticateRequest) {

        return authenticateService.authenticate(authenticateRequest);
    }

}
