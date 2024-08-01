package com.dtech.notebook.service

import com.dtech.notebook.model.User
import com.dtech.notebook.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(
    private val userRepo: UserRepository,
) {
    fun findById(id: Long): User? {
        return userRepo.findByIdOrNull(id)
    }

    fun findByName(name: String): User? {
        return userRepo.findByName(name)
    }

    fun existsByName(name: String): Boolean {
        return userRepo.existsByName(name)
    }

    fun save(user: User): User {
        return userRepo.save(user)
    }
}