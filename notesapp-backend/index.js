const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
    user: 'notesappuser',
    host: 'localhost',
    database: 'notesapp',
    password: 'yourpassword',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.get('/notes', async (req, res) => {
    const result = await pool.query('SELECT * FROM notes');
    res.json(result.rows);
});

app.post('/notes', async (req, res) => {
    const { nickname, content } = req.body;
    await pool.query('INSERT INTO notes (nickname, content) VALUES ($1, $2)', [nickname, content]);
    res.sendStatus(201);
});

app.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    await pool.query('UPDATE notes SET content=$1 WHERE id=$2', [content, id]);
    res.sendStatus(200);
});

app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM notes WHERE id=$1', [id]);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

