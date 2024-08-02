package com.dtech.notebook.controller.auth

import com.dtech.notebook.controller.dto.LoginDto
import com.dtech.notebook.controller.dto.LoginResponseDto
import com.dtech.notebook.controller.dto.RegisterDto
import com.dtech.notebook.model.User
import com.dtech.notebook.service.HashService
import com.dtech.notebook.service.TokenService
import com.dtech.notebook.service.UserService
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val hashService: HashService,
    private val tokenService: TokenService,
    private val userService: UserService,
) {
    @PostMapping("/login")
    fun login(@RequestBody payload: LoginDto): ResponseEntity<LoginResponseDto> {
        val user = userService.findByName(payload.username) ?: throw ResponseStatusException(HttpStatusCode.valueOf(400), "Login failed")

        if (!hashService.checkBcrypt(payload.password, user.password)) {
            throw ResponseStatusException(HttpStatusCode.valueOf(400), "Login failed")
        }
        val data = LoginResponseDto(
            token = tokenService.createToken(user),
        );
        return ResponseEntity.ok().body(data)
    }

    @PostMapping("/register")
    fun register(@RequestBody payload: RegisterDto): LoginResponseDto {
        if (userService.existsByName(payload.username)) {
            throw ResponseStatusException(HttpStatusCode.valueOf(400), "Name already exists")
        }

        val user = User(
            name = payload.username,
            password = hashService.hashBcrypt(payload.password),
        )

        val savedUser = userService.save(user)

        return LoginResponseDto(
            token = tokenService.createToken(savedUser),
        )
    }
}