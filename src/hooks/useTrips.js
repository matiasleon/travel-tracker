import { useState, useCallback, useRef } from 'react';
import { mockTrips } from '../mocks/trips';

export const useTrips = () => {
  // Usar una referencia para mantener los datos mock originales
  const mockTripsRef = useRef(mockTrips);
  
  // Inicializar el estado con los datos mock
  const [trips, setTrips] = useState(() => mockTripsRef.current);
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
    
    // Agregar el nuevo viaje al estado actual sin volver a incluir los mocks
    setTrips(prev => {
      // Crear un nuevo array con todos los viajes anteriores más el nuevo
      return [...prev, newTrip];
    });

    return newTrip.id;
  }, []);

  const addActivity = useCallback((tripId, activityName) => {
    if (!activityName || !tripId) {
      return;
    }
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          activities: [...(trip.activities || []), {
            name: activityName,
            done: false
          }]
        };
      }
      return trip;
    }));
  }, []);

  // Función para marcar/desmarcar una actividad como completada
  const toggleActivity = useCallback((tripId, cityId, activityIndex) => {
    // Crear una copia profunda del estado actual para asegurar la inmutabilidad
    setTrips(prevTrips => {
      // Crear una nueva copia del array de viajes
      const updatedTrips = prevTrips.map(trip => {
        // Si es el viaje que buscamos
        if (trip.id === tripId) {
          // Crear una nueva copia del viaje
          const updatedTrip = {
            ...trip,
            // Mapear las ciudades para encontrar la correcta
            cities: trip.cities.map(city => {
              // Si es la ciudad que buscamos
              if (city.id === cityId) {
                // Crear una copia de las actividades
                const updatedActivities = [...city.activities];
                // Actualizar el estado de la actividad específica
                if (updatedActivities[activityIndex]) {
                  updatedActivities[activityIndex] = {
                    ...updatedActivities[activityIndex],
                    done: !updatedActivities[activityIndex].done
                  };
                }
                // Crear una nueva copia de la ciudad con las actividades actualizadas
                return { ...city, activities: updatedActivities };
              }
              return city; // Devolver la ciudad sin cambios
            })
          };
          return updatedTrip;
        }
        return trip; // Devolver el viaje sin cambios
      });
      
      // Forzar la actualización del estado con un nuevo array
      return [...updatedTrips];
    });
  }, []);
  
  // Función para agregar una nueva actividad a una ciudad específica (asíncrona)
  const addCityActivity = useCallback(async (tripId, cityId, activityName) => {
    if (!activityName || !tripId || !cityId) {
      return Promise.reject(new Error('Datos incompletos para agregar actividad'));
    }
    
    // Simular una llamada a API (en una app real, esto sería una llamada fetch/axios)
    const simulateApiCall = () => {
      return new Promise((resolve, reject) => {
        // Simular latencia de red (500ms)
        setTimeout(() => {
          // Simular éxito con 90% de probabilidad
          if (Math.random() > 0.1) {
            resolve({
              success: true,
              data: {
                name: activityName,
                done: false,
                id: `activity-${Date.now()}`
              }
            });
          } else {
            // Simular error de servidor
            reject(new Error('Error al guardar la actividad en el servidor'));
          }
        }, 500);
      });
    };
    
    try {
      // Llamar a la API simulada
      const response = await simulateApiCall();
      
      // Si la llamada fue exitosa, actualizar el estado
      setTrips(prevTrips => {
        // Crear una nueva copia del array de viajes
        const updatedTrips = prevTrips.map(trip => {
          // Si es el viaje que buscamos
          if (trip.id === tripId) {
            // Crear una nueva copia del viaje
            const updatedTrip = {
              ...trip,
              // Mapear las ciudades para encontrar la correcta
              cities: trip.cities.map(city => {
                // Si es la ciudad que buscamos
                if (city.id === cityId) {
                  // Crear una nueva copia de la ciudad con la actividad agregada
                  return {
                    ...city,
                    activities: [
                      ...(city.activities || []),
                      response.data // Usar los datos devueltos por la API
                    ]
                  };
                }
                return city; // Devolver la ciudad sin cambios
              })
            };
            return updatedTrip;
          }
          return trip; // Devolver el viaje sin cambios
        });
        
        // Forzar la actualización del estado con un nuevo array
        return [...updatedTrips];
      });
      
      return Promise.resolve(response.data);
    } catch (error) {
      console.error('Error al agregar actividad:', error);
      return Promise.reject(error);
    }
  }, []);

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
    // Simplemente filtrar el viaje a eliminar del estado actual
    setTrips(prev => prev.filter(trip => trip.id !== tripId));
    return { success: true, message: 'Viaje eliminado correctamente' };
  }, []);

  return {
    trips,
    loading,
    createTrip,
    addActivity,
    toggleActivity,
    deleteTrip,
    addCity,
    addCityActivity
  };
};
