package com.dtech.notebook.service

import com.dtech.notebook.model.Note
import com.dtech.notebook.model.User
import com.dtech.notebook.repository.NoteRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class NoteService(
    private val noteRepo: NoteRepository,
) {
    fun findById(id: Long): Note? {
        return noteRepo.findById(id).get()
    }

    fun findByUser(user: User): List<Note> {
        return noteRepo.findByUser(user)
    }

    fun save(item: Note): Note {
        return noteRepo.save(item)
    }

    fun delete(item: Note) {
        return noteRepo.delete(item)
    }
}