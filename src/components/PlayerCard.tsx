import React from 'react';
import { User2 } from 'lucide-react';
import type { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  onDelete: () => void;  // Added onDelete prop
  onUpdate: () => void;  // Added onUpdate prop
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onDelete, onUpdate }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="aspect-square rounded-lg overflow-hidden mb-4">
        {player.image ? (
          <img
            src={player.image}
            alt={player.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <User2 className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <h3 className="font-semibold text-gray-800">{player.name}</h3>
      <p className="text-sm text-gray-500">{player.position}</p>
      <div className="mt-2 flex items-center gap-2">
        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
          {player.nationality}
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
          Age: {player.age}
        </span>
      </div>

      {/* Buttons for delete and update */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={onUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
