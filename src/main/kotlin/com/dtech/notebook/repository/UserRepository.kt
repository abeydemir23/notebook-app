package com.dtech.notebook.repository

import com.dtech.notebook.model.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: CrudRepository<User, Long> {
    fun findByName(name: String): User?
    fun existsByName(name: String): Boolean
}