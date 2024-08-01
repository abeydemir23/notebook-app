package com.dtech.notebook.model

import jakarta.persistence.*

@Entity(name = "note")
data class Note(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "note_id_seq")
    @SequenceGenerator(name = "note_id_seq", allocationSize = 1)
    var id: Long = 0,

    @ManyToOne
    var user: User = User(),

    @Column
    var content: String? = null,
)