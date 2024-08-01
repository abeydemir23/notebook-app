import React, { useState } from 'react';

const NoteForm = ({ onSubmit }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ content });
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="New note..." />
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default NoteForm;