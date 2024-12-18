/*import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import PlayerCard from '../components/PlayerCard';
import type { Player } from '../types';

// Importing images
import profileImage from '../assets/images/Hakimi.jpg';
import youssefImage from '../assets/images/Youssef.jpg';

const initialPlayers: Player[] = [
  {
    id: '1',
    name: 'Achraf Hakimi',
    position: 'Defender',
    team: 'Team A',
    age: 26,
    nationality: 'Morocco',
    image: profileImage,
  },
  {
    id: '2',
    name: 'Youssef En-Nesyri',
    position: 'Forward',
    team: 'Team A',
    age: 27,
    nationality: 'Morocco',
    image: youssefImage,
  },
];

const Players = () => {
  const [players, setPlayers] = useState<Player[]>(() => {
    const savedPlayers = localStorage.getItem('players');
    return savedPlayers ? JSON.parse(savedPlayers) : initialPlayers;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  const [showForm, setShowForm] = useState<boolean>(false);
  const [newPlayer, setNewPlayer] = useState<Player>({
    id: '',
    name: '',
    position: '',
    team: '',
    age: 0,
    nationality: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewPlayer((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const handleAddPlayer = () => {
    setPlayers((prev) => [
      ...prev,
      { ...newPlayer, id: String(prev.length + 1) },
    ]);
    setShowForm(false);
    setNewPlayer({
      id: '',
      name: '',
      position: '',
      team: '',
      age: 0,
      nationality: '',
      image: '',
    });
    setImagePreview(null);
  };

  const handleDeletePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((player) => player.id !== id));
  };

  const handleUpdatePlayer = (id: string) => {
    const playerToUpdate = players.find((player) => player.id === id);
    if (playerToUpdate) {
      setNewPlayer(playerToUpdate);
      setShowForm(true);
    }
  };

  // Filter players based on searchTerm and selectedPosition
  const filteredPlayers = players.filter((player) => {
    const matchesName = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition ? player.position.toLowerCase() === selectedPosition.toLowerCase() : true;
    return matchesName && matchesPosition;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Players</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Player
        </button>
      </div>

      {showForm && (
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold">Add/Update Player</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newPlayer.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={newPlayer.position}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="team"
            placeholder="Team"
            value={newPlayer.team}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newPlayer.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={newPlayer.nationality}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          {/* Image input *//*}
          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleAddPlayer}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            {newPlayer.id ? 'Update Player' : 'Add Player'}
          </button>
        </div>
      )}

      {/* Filters *//*}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Positions</option>
          <option value="Forward">Forward</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Defender">Defender</option>
          <option value="Goalkeeper">Goalkeeper</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onDelete={() => handleDeletePlayer(player.id)}
            onUpdate={() => handleUpdatePlayer(player.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Players;*/




import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import PlayerCard from '../components/PlayerCard';
import axios from 'axios';
import type { Player } from '../types';

// Importing images
import profileImage from '../assets/images/Hakimi.jpg';
import youssefImage from '../assets/images/Youssef.jpg';

const initialPlayers: Player[] = [
  {
    id: '1',
    name: 'Achraf Hakimi',
    position: 'Defender',
    team: 'Team A',
    age: 26,
    nationality: 'Morocco',
    image: profileImage,
  },
  {
    id: '2',
    name: 'Youssef En-Nesyri',
    position: 'Forward',
    team: 'Team A',
    age: 27,
    nationality: 'Morocco',
    image: youssefImage,
  },
];

const Players = () => {
  const [players, setPlayers] = useState<Player[]>(() => {
    const savedPlayers = localStorage.getItem('players');
    return savedPlayers ? JSON.parse(savedPlayers) : initialPlayers;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newPlayer, setNewPlayer] = useState<Player>({
    id: '',
    name: '',
    position: '',
    team: '',
    age: 0,
    nationality: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // API base URL
  const apiUrl = 'http://localhost:5000/players';

  // Fetch players from the server (initial load)
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setPlayers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des joueurs', error);
      }
    };
    fetchPlayers();
  }, []);

  // Save players to localStorage whenever the players list changes
  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image change (for player profile picture)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewPlayer((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  // Handle adding a new player
  const handleAddPlayer = async () => {
    try {
      const response = await axios.post(apiUrl, newPlayer);
      setPlayers((prev) => [
        ...prev,
        { ...newPlayer, id: String(prev.length + 1) },
      ]);
      setShowForm(false);
      setNewPlayer({
        id: '',
        name: '',
        position: '',
        team: '',
        age: 0,
        nationality: '',
        image: '',
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du joueur', error);
    }
  };

  // Handle deleting a player
  const handleDeletePlayer = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setPlayers((prev) => prev.filter((player) => player.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du joueur', error);
    }
  };

  // Handle updating a player
  const handleUpdatePlayer = async (id: string) => {
    try {
      await axios.put(`${apiUrl}/${id}`, newPlayer);
      setPlayers((prev) =>
        prev.map((player) => (player.id === id ? newPlayer : player))
      );
      setShowForm(false);
      setNewPlayer({
        id: '',
        name: '',
        position: '',
        team: '',
        age: 0,
        nationality: '',
        image: '',
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du joueur', error);
    }
  };

  // Filter players based on search and selected position
  const filteredPlayers = players.filter((player) => {
    const matchesName = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition
      ? player.position.toLowerCase() === selectedPosition.toLowerCase()
      : true;
    return matchesName && matchesPosition;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Players</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Player
        </button>
      </div>

      {showForm && (
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold">Add/Update Player</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newPlayer.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={newPlayer.position}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="team"
            placeholder="Team"
            value={newPlayer.team}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newPlayer.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={newPlayer.nationality}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          {/* Image input */}
          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <button
            onClick={newPlayer.id ? () => handleUpdatePlayer(newPlayer.id) : handleAddPlayer}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            {newPlayer.id ? 'Update Player' : 'Add Player'}
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Positions</option>
          <option value="Forward">Forward</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Defender">Defender</option>
          <option value="Goalkeeper">Goalkeeper</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onDelete={() => handleDeletePlayer(player.id)}
            onUpdate={() => setNewPlayer(player)}
          />
        ))}
      </div>
    </div>
  );
};

export default Players;



/*********************************************************************************************** */


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search } from 'lucide-react';
import PlayerCard from '../components/PlayerCard';
import type { Player } from '../types';

const API_URL = 'http://localhost:5000/players';

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newPlayer, setNewPlayer] = useState<Player>({
    id: '',
    name: '',
    position: '',
    team: '',
    age: 0,
    nationality: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Charger les joueurs depuis l'API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewPlayer((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  // Ajouter un joueur
  const handleAddPlayer = () => {
    axios
      .post(API_URL, newPlayer)
      .then((response) => {
        setPlayers((prev) => [...prev, response.data]);
        setShowForm(false);
        setNewPlayer({
          id: '',
          name: '',
          position: '',
          team: '',
          age: 0,
          nationality: '',
          image: '',
        });
        setImagePreview(null);
      })
      .catch((error) => {
        console.error('Error adding player:', error);
      });
  };

  // Supprimer un joueur
  const handleDeletePlayer = (id: string) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setPlayers((prev) => prev.filter((player) => player.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting player:', error);
      });
  };

  // Mettre à jour un joueur
  const handleUpdatePlayer = (id: string) => {
    axios
      .put(`${API_URL}/${id}`, newPlayer)
      .then(() => {
        setPlayers((prev) =>
          prev.map((player) =>
            player.id === id ? { ...player, ...newPlayer } : player
          )
        );
        setShowForm(false);
        setNewPlayer({
          id: '',
          name: '',
          position: '',
          team: '',
          age: 0,
          nationality: '',
          image: '',
        });
        setImagePreview(null);
      })
      .catch((error) => {
        console.error('Error updating player:', error);
      });
  };

  // Préparer le formulaire pour une mise à jour
  const prepareUpdatePlayer = (id: string) => {
    const playerToUpdate = players.find((player) => player.id === id);
    if (playerToUpdate) {
      setNewPlayer(playerToUpdate);
      setShowForm(true);
    }
  };

  // Filtrer les joueurs en fonction de la recherche et de la position sélectionnée
  const filteredPlayers = players.filter((player) => {
    const matchesName = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition
      ? player.position.toLowerCase() === selectedPosition.toLowerCase()
      : true;
    return matchesName && matchesPosition;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Players</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Player
        </button>
      </div>

      {showForm && (
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold">Add/Update Player</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newPlayer.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={newPlayer.position}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="team"
            placeholder="Team"
            value={newPlayer.team}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newPlayer.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={newPlayer.nationality}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          {/* Image input *//*}
          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <button
            onClick={newPlayer.id ? () => handleUpdatePlayer(newPlayer.id) : handleAddPlayer}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            {newPlayer.id ? 'Update Player' : 'Add Player'}
          </button>
        </div>
      )}

      {/* Filters *//*}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Positions</option>
          <option value="Forward">Forward</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Defender">Defender</option>
          <option value="Goalkeeper">Goalkeeper</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onDelete={() => handleDeletePlayer(player.id)}
            onUpdate={() => prepareUpdatePlayer(player.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Players;
*/
