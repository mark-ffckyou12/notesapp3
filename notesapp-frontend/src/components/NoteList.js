import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from './Note';
import NoteForm from './NoteForm';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const API_URL = 'https://notesapp-n9p6.onrender.com';

    const fetchNotes = async () => {
        const response = await axios.get(`${API_URL}/notes`);
        setNotes(response.data);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div>
            <NoteForm fetchNotes={fetchNotes} />
            {notes.map(note => (
                <Note key={note.id} note={note} fetchNotes={fetchNotes} />
            ))}
        </div>
    );
};

export default NoteList;

