/**
 * Constantes para los estados de entidades en la aplicación Travel Tracker
 * Centraliza los valores de estado para evitar hardcodear strings en el código
 */

// Estados para actividades
export const ACTIVITY_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Estados para ciudades
export const CITY_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Estados para viajes
export const TRIP_STATUS = {
  PLANNING: 'planning',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Función para obtener el texto de visualización de un estado
export const getStatusText = (status, entityType = 'generic') => {
  const statusTexts = {
    // Textos para actividades
    activity: {
      [ACTIVITY_STATUS.PENDING]: 'Pendiente',
      [ACTIVITY_STATUS.COMPLETED]: 'Completada',
      [ACTIVITY_STATUS.CANCELLED]: 'Cancelada'
    },
    // Textos para ciudades
    city: {
      [CITY_STATUS.PENDING]: 'Pendiente',
      [CITY_STATUS.IN_PROGRESS]: 'En progreso',
      [CITY_STATUS.COMPLETED]: 'Completada',
      [CITY_STATUS.CANCELLED]: 'Cancelada'
    },
    // Textos para viajes
    trip: {
      [TRIP_STATUS.PLANNING]: 'Planificando',
      [TRIP_STATUS.ONGOING]: 'En progreso',
      [TRIP_STATUS.COMPLETED]: 'Completado',
      [TRIP_STATUS.CANCELLED]: 'Cancelado'
    },
    // Textos genéricos (fallback)
    generic: {
      [ACTIVITY_STATUS.PENDING]: 'Pendiente',
      [CITY_STATUS.IN_PROGRESS]: 'En progreso',
      [ACTIVITY_STATUS.COMPLETED]: 'Completado/a',
      [CITY_STATUS.CANCELLED]: 'Cancelado/a'
    }
  };

  // Obtener el mapa de textos para el tipo de entidad
  const textMap = statusTexts[entityType] || statusTexts.generic;
  
  // Devolver el texto correspondiente al estado o un valor por defecto
  return textMap[status] || 'Desconocido';
};
