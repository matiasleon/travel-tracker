import React, { useState } from 'react';
import { useTrips } from '../../hooks/useTrips';

export const AddActivityForm = ({ tripId }) => {
  const [activityName, setActivityName] = useState('');
  const { addActivity } = useTrips();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activityName.trim()) return;
    addActivity(tripId, activityName);
    setActivityName('');
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Agregar actividad</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Ej: Visitar Torre de Londres"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          className="border border-gray-300 bg-white text-gray-900 px-4 py-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
        />
        <button 
          type="submit" 
          className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center gap-2"
        >
          <span>➕</span>
          <span>Agregar</span>
        </button>
      </form>
    </div>
  );
};
