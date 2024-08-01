import React, { useEffect, useState } from 'react';
import noteService from '../services/noteService';
import Note from './Note';
import NoteForm from './NoteForm';

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await noteService.getNotes();
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes', error);
        }
    };

    const handleCreate = async (note) => {
        try {
            await noteService.createNote(note);
            fetchNotes();
        } catch (error) {
            console.error('Error creating note', error);
        }
    };

    const handleUpdate = async (id, note) => {
        try {
            await noteService.updateNote(id, note);
            fetchNotes();
        } catch (error) {
            console.error('Error updating note', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await noteService.deleteNote(id);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note', error);
        }
    };

    return (
        <div>
            <h2>Notes</h2>
            <NoteForm onSubmit={handleCreate} />
            <div>
                {notes.map((note) => (
                    <Note key={note.id} note={note} onUpdate={handleUpdate} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default Notes;