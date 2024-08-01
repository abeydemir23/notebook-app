package com.dtech.notebook.controller.dto

data class LoginDto(
    val username: String,
    val password: String,
)

data class RegisterDto(
    val username: String,
    val password: String,
)

data class CreateNoteDto(
    val content: String?,
)

data class UpdateNoteDto(
    val content: String?,
)