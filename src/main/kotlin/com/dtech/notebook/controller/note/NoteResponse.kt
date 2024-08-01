package com.dtech.notebook.controller.note


data class NoteResponse(
    val id: Long,
    val title: String,
    val content: String,
)