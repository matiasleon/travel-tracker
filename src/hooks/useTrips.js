import { useState, useCallback } from 'react';
import { mockTrips } from '../mocks/trips';

export const useTrips = () => {
  // Mantener todos los viajes en un solo estado
  const [trips, setTrips] = useState([...mockTrips]);
  const [loading, setLoading] = useState(false);

  const createTrip = useCallback((tripData) => {
    const newTrip = {
      ...tripData,
      id: Date.now().toString(),
      activities: [],
      status: 'planning',
      userRole: 'admin',
      createdBy: 'mock-user-id'
    };
    // Agregar el nuevo viaje manteniendo los mocks y los viajes previos
    setTrips(prev => {
      const newState = [...mockTrips, ...prev.filter(t => !mockTrips.find(m => m.id === t.id)), newTrip];
      console.log('Estado actualizado:', newState);
      return newState;
    });

    return newTrip.id;
  }, []);

  const addActivity = useCallback((tripId, activityName) => {
    if (!activityName || !tripId) {
      console.log('Error: Actividad o ID de viaje no válidos');
      return;
    }
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          activities: [...(trip.activities || []), {
            name: activityName,
            completed: false
          }]
        };
      }
      return trip;
    }));
  }, []);

  const toggleActivity = (tripId, activityIndex) => {
    setTrips(prevTrips => prevTrips.map(trip => {
      if (trip.id === tripId) {
        const updatedActivities = [...trip.activities];
        updatedActivities[activityIndex] = {
          ...updatedActivities[activityIndex],
          completed: !updatedActivities[activityIndex]?.completed
        };
        return { ...trip, activities: updatedActivities };
      }
      return trip;
    }));
  };

  const addCity = (tripId, cityData) => {
    setTrips(prevTrips => prevTrips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          cities: [...(trip.cities || []), cityData]
        };
      }
      return trip;
    }));
  };

  const deleteTrip = useCallback((tripId) => {
    // Eliminar manteniendo los mocks
    setTrips(prev => [
      ...mockTrips,
      ...prev
        .filter(trip => trip.id !== tripId)
        .filter(trip => !mockTrips.find(m => m.id === trip.id))
    ]);
    return { success: true, message: 'Viaje eliminado correctamente' };
  }, []);

  return {
    trips,
    loading,
    createTrip,
    addActivity,
    toggleActivity,
    deleteTrip,
    addCity
  };
};
