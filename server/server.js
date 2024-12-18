const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Route pour récupérer tous les joueurs
app.get('/players', (req, res) => {
  db.query('SELECT * FROM players', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des joueurs' });
      return;
    }
    res.json(results);
  });
});

// Route pour ajouter un joueur
app.post('/players', (req, res) => {
  const { name, position, team, age, nationality, image } = req.body;
  const query = 'INSERT INTO players (name, position, team, age, nationality, image) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, position, team, age, nationality, image], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de l\'ajout du joueur' });
      return;
    }
    res.json({ message: 'Joueur ajouté avec succès' });
  });
});

// Route pour mettre à jour un joueur
app.put('/players/:id', (req, res) => {
  const { id } = req.params;
  const { name, position, team, age, nationality, image } = req.body;
  const query = 'UPDATE players SET name = ?, position = ?, team = ?, age = ?, nationality = ?, image = ? WHERE id = ?';
  db.query(query, [name, position, team, age, nationality, image, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du joueur' });
      return;
    }
    res.json({ message: 'Joueur mis à jour avec succès' });
  });
});

// Route pour supprimer un joueur
app.delete('/players/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM players WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la suppression du joueur' });
      return;
    }
    res.json({ message: 'Joueur supprimé avec succès' });
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
