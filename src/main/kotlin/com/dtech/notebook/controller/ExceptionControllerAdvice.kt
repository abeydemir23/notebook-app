package com.dtech.notebook.controller

import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.server.ResponseStatusException

@ControllerAdvice
class ExceptionControllerAdvice {

    @ExceptionHandler
    fun handleResponseStatusException(ex: ResponseStatusException): ResponseEntity<ErrorMessageModel> {
        val errorMessage = ErrorMessageModel(
           ex.statusCode.value(),
            ex.message
        )
        return ResponseEntity(errorMessage, HttpStatus.valueOf(errorMessage.status))
    }

    class ErrorMessageModel(
        var status: Int = 500,
        var message: String? = null
    )
}