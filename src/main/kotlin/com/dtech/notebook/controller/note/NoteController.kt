package com.dtech.notebook.controller.note

import com.dtech.notebook.config.toUser
import com.dtech.notebook.controller.dto.*
import com.dtech.notebook.model.Note
import com.dtech.notebook.service.NoteService
import org.springframework.http.HttpStatusCode
import org.springframework.web.bind.annotation.*
import org.springframework.security.core.Authentication
import org.springframework.web.server.ResponseStatusException


@RestController
@RequestMapping("/api/notes")
class ItemController(
    private val noteService: NoteService,
) {

    @GetMapping
    fun getNotes(authentication: Authentication): List<NoteDto> {
        val authUser = authentication.toUser()
        return noteService.findByUser(authUser).map { note -> note.toDto() }
    }

    @GetMapping("{id}")
    fun getNote(authentication: Authentication, @PathVariable id: String): NoteDto {
        val authUser = authentication.toUser()
        val note = noteService.findById(id.toLong()) ?: throw ResponseStatusException(
            HttpStatusCode.valueOf(404),
            "Note not found"
        )
        if (note.user.id != authUser.id) {
            throw ResponseStatusException(HttpStatusCode.valueOf(403), "Not your item")
        }

        return note.toDto()
    }

    @PostMapping
    fun createNote(authentication: Authentication, @RequestBody payload: CreateNoteDto) {
        val authUser = authentication.toUser()

        val note = Note(
            user = authUser,
            content = payload.content,
        )

        noteService.save(note)
    }

    @PutMapping("{id}")
    fun updateNote(authentication: Authentication, @PathVariable id: String, @RequestBody payload: UpdateNoteDto) {
        val authUser = authentication.toUser()

        val note = noteService.findById(id.toLong()) ?: throw ResponseStatusException(
            HttpStatusCode.valueOf(404),
            "Note not found"
        )
        if (note.user.id != authUser.id) {
            throw ResponseStatusException(HttpStatusCode.valueOf(403), "Not your item")
        }
        if (note.id != id.toLong()) {
            throw ResponseStatusException(HttpStatusCode.valueOf(409), "Note already exists")
        }
        note.content = payload.content

        noteService.save(note)
    }

    @DeleteMapping("{id}")
    fun deleteNote(authentication: Authentication, @PathVariable id: Long) {
        val authUser = authentication.toUser()
        val note =
            noteService.findById(id) ?: throw ResponseStatusException(HttpStatusCode.valueOf(404), "Note not found")
        if (note.user.id != authUser.id) {
            throw ResponseStatusException(HttpStatusCode.valueOf(403), "Not your Note")
        }

        noteService.delete(note)
    }
}