import { useState, useEffect } from 'react';
import { mockTrips } from '../mocks/trips';

export const useTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = () => {
    setTrips(mockTrips);
    setLoading(false);
  };

  const createTrip = (tripData) => {
    const newTrip = {
      ...tripData,
      id: Date.now().toString(),
      activities: [],
      status: 'planning',
      userRole: 'admin',
      createdBy: 'mock-user-id'
    };
    setTrips(prevTrips => [...prevTrips, newTrip]);
    return newTrip.id;
  };

  const addActivity = (tripId, activityName) => {
    if (!activityName || !tripId) {
      console.log('Error: Actividad o ID de viaje no válidos');
      return;
    }
    setTrips(prevTrips => prevTrips.map(trip => {
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
  };

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
    const newCity = {
      ...cityData,
      id: Date.now().toString(),
      completed: false,
      activities: []
    };

    setTrips(prevTrips => prevTrips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          cities: [...(trip.cities || []), newCity]
        };
      }
      return trip;
    }));
  };

  const deleteTrip = (tripId) => {
    setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
    return { success: true, message: 'Viaje eliminado correctamente' };
  };

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
