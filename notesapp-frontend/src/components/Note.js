import React, { useState } from 'react';
import axios from 'axios';

const Note = ({ note, fetchNotes }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(note.content);
    const API_URL = 'https://notesapp-n9p6.onrender.com';

    const deleteNote = async () => {
        await axios.delete(`${API_URL}/notes/${note.id}`);
        fetchNotes(); // Fetch notes again to update the UI
    };

    const updateNote = async () => {
        await axios.put(`${API_URL}/notes/${note.id}`, { content: updatedContent });
        fetchNotes(); // Fetch notes again to update the UI
        setIsEditing(false);
    };

    return (
        <div>
            <h3>{note.nickname}</h3>
            {isEditing ? (
                <div>
                    <textarea 
                        value={updatedContent} 
                        onChange={(e) => setUpdatedContent(e.target.value)}
                    ></textarea>
                    <button onClick={updateNote}>Save</button>
                </div>
            ) : (
                <p>{note.content}</p>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            <button onClick={deleteNote}>Delete</button>
        </div>
    );
};

export default Note;

