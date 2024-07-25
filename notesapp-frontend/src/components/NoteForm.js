import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ fetchNotes }) => {
    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');
    const API_URL = 'https://notesapp-n9p6.onrender.com';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/notes`, { nickname, content });
            fetchNotes();
            setNickname('');
            setContent('');
        } catch (error) {
            console.error('There was an error adding the note:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Nickname" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Write your note here..." 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
            ></textarea>
            <button type="submit">Add Note</button>
        </form>
    );
};

export default NoteForm;

