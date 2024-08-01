package com.dtech.notebook.config

import com.dtech.notebook.model.User
import org.springframework.security.core.Authentication

fun Authentication.toUser(): User {
    return principal as User
}