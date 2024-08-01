import React, { useState } from 'react';

const Note = ({ note, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [noteContent, setNoteContent] = useState(note.content);

    const handleSave = () => {
        onUpdate(note.id, { content: noteContent });
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input type="text" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <span>{note.content}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(note.id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Note;