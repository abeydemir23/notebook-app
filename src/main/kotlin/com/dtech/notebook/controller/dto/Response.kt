package com.dtech.notebook.controller.dto

data class LoginResponseDto(
    val token: String,
)

data class NoteDto(
    val id: Long,
    val note: String?,
)