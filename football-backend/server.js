const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '80104002', // Remplacez par votre mot de passe MySQL
    database: 'football_team',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Routes API
app.get('/api/players', (req, res) => {
    db.query('SELECT * FROM players', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/players', (req, res) => {
    const { name, position, team, age, nationality, image_url } = req.body;
    const query = 'INSERT INTO players (name, position, team, age, nationality, image_url) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, position, team, age, nationality, image_url], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...req.body });
    });
});

app.delete('/players/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM players WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

app.put('/players/:id', (req, res) => {
    const { id } = req.params;
    const { name, position, team, age, nationality, image_url } = req.body;
    const query = 'UPDATE players SET name = ?, position = ?, team = ?, age = ?, nationality = ?, image_url = ? WHERE id = ?';
    db.query(query, [name, position, team, age, nationality, image_url, id], (err) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
