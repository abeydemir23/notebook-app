package com.dtech.notebook.repository

import com.dtech.notebook.model.Note
import com.dtech.notebook.model.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface NoteRepository : CrudRepository<Note, Long> {
    fun findByUser(user: User): List<Note>
}