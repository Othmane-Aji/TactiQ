const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // ou ton hôte MySQL
  user: 'root', // nom d'utilisateur MySQL
  password: '80104002', // ton mot de passe MySQL
  database: 'football_team', // le nom de ta base de données
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connexion réussie à la base de données');
});

module.exports = connection;
