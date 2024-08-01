package com.dtech.notebook.controller.dto

import com.dtech.notebook.model.Note

fun Note.toDto(): NoteDto {
    return NoteDto(id, note)
}