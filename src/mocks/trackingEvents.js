// Constantes para los tipos de eventos de tracking
export const TRACKING_EVENT_TYPES = {
  TRIP_STATUS_CHANGE: 'TRIP_STATUS_CHANGE',
  CITY_STATUS_CHANGE: 'CITY_STATUS_CHANGE',
  ACTIVITY_STATUS_CHANGE: 'ACTIVITY_STATUS_CHANGE',
  ITINERARY_CHANGE: 'ITINERARY_CHANGE',
  NOTE_ADDED: 'NOTE_ADDED'
};

// Importamos las constantes de estado
import { TRIP_STATUS, CITY_STATUS, ACTIVITY_STATUS } from '../constants/statusTypes';

// Mock de eventos de tracking
export const trackingEventsMock = [
  {
    id: 'event-1',
    type: TRACKING_EVENT_TYPES.TRIP_STATUS_CHANGE,
    tripId: '1',
    entityId: '1',
    userId: 'admin',
    previousStatus: TRIP_STATUS.PLANNING,
    newStatus: TRIP_STATUS.ONGOING,
    timestamp: '2025-06-15T08:00:00.000Z',
    metadata: {
      message: 'Viaje iniciado',
      location: 'Aeropuerto Internacional'
    }
  },
  {
    id: 'event-2',
    type: TRACKING_EVENT_TYPES.CITY_STATUS_CHANGE,
    tripId: '1',
    entityId: 'city-1',
    userId: 'admin',
    previousStatus: CITY_STATUS.PENDING,
    newStatus: CITY_STATUS.IN_PROGRESS,
    timestamp: '2025-06-15T10:30:00.000Z',
    metadata: {
      message: 'Llegada a Barcelona',
      location: 'Estación de tren Barcelona Sants'
    }
  },
  {
    id: 'event-3',
    type: TRACKING_EVENT_TYPES.ACTIVITY_STATUS_CHANGE,
    tripId: '1',
    entityId: 'activity-1',
    userId: 'admin',
    previousStatus: ACTIVITY_STATUS.PENDING,
    newStatus: ACTIVITY_STATUS.COMPLETED,
    timestamp: '2025-06-15T14:00:00.000Z',
    metadata: {
      message: 'Visita a la Sagrada Familia completada',
      location: 'Sagrada Familia',
      rating: 5,
      photos: ['photo1.jpg', 'photo2.jpg']
    }
  },
  {
    id: 'event-4',
    type: TRACKING_EVENT_TYPES.NOTE_ADDED,
    tripId: '1',
    entityId: 'city-1',
    userId: 'admin',
    timestamp: '2025-06-15T18:00:00.000Z',
    metadata: {
      message: 'La ciudad está muy concurrida, mejor visitar los sitios turísticos temprano',
      location: 'Hotel Barcelona Centro'
    }
  },
  {
    id: 'event-5',
    type: TRACKING_EVENT_TYPES.CITY_STATUS_CHANGE,
    tripId: '1',
    entityId: 'city-1',
    userId: 'admin',
    previousStatus: CITY_STATUS.IN_PROGRESS,
    newStatus: CITY_STATUS.COMPLETED,
    timestamp: '2025-06-17T09:00:00.000Z',
    metadata: {
      message: 'Salida de Barcelona',
      location: 'Estación de tren Barcelona Sants'
    }
  },
  {
    id: 'event-6',
    type: TRACKING_EVENT_TYPES.CITY_STATUS_CHANGE,
    tripId: '1',
    entityId: 'city-2',
    userId: 'admin',
    previousStatus: CITY_STATUS.PENDING,
    newStatus: CITY_STATUS.IN_PROGRESS,
    timestamp: '2025-06-17T11:30:00.000Z',
    metadata: {
      message: 'Llegada a Madrid',
      location: 'Estación de Atocha'
    }
  },
  {
    id: 'event-7',
    type: TRACKING_EVENT_TYPES.ACTIVITY_STATUS_CHANGE,
    tripId: '1',
    entityId: 'activity-5',
    userId: 'admin',
    previousStatus: ACTIVITY_STATUS.PENDING,
    newStatus: ACTIVITY_STATUS.COMPLETED,
    timestamp: '2025-06-17T15:00:00.000Z',
    metadata: {
      message: 'Visita al Museo del Prado completada',
      location: 'Museo del Prado',
      rating: 4,
      photos: ['photo3.jpg']
    }
  },
  {
    id: 'event-8',
    type: TRACKING_EVENT_TYPES.ITINERARY_CHANGE,
    tripId: '1',
    entityId: 'city-2',
    userId: 'admin',
    timestamp: '2025-06-18T08:00:00.000Z',
    metadata: {
      message: 'Añadida visita al Palacio Real',
      changes: {
        type: 'add',
        activity: {
          id: 'activity-8',
          name: 'Visitar Palacio Real',
          done: false
        }
      }
    }
  },
  {
    id: 'event-9',
    type: TRACKING_EVENT_TYPES.NOTE_ADDED,
    tripId: '1',
    entityId: 'trip-1',
    userId: 'admin',
    timestamp: '2025-06-19T20:00:00.000Z',
    metadata: {
      message: 'El clima ha estado perfecto para el viaje, mucho mejor de lo esperado',
      location: 'Hotel Madrid Centro'
    }
  },
  {
    id: 'event-10',
    type: TRACKING_EVENT_TYPES.TRIP_STATUS_CHANGE,
    tripId: '1',
    entityId: '1',
    userId: 'admin',
    previousStatus: TRIP_STATUS.ONGOING,
    newStatus: TRIP_STATUS.COMPLETED,
    timestamp: '2025-06-20T18:00:00.000Z',
    metadata: {
      message: 'Viaje completado con éxito',
      location: 'Aeropuerto Madrid Barajas'
    }
  }
];

// Funciones auxiliares para trabajar con eventos de tracking

// Obtener todos los eventos de un viaje
export const getTrackingEventsByTrip = (tripId) => {
  return trackingEventsMock.filter(event => event.tripId === tripId);
};

// Obtener eventos por tipo
export const getTrackingEventsByType = (tripId, type) => {
  return trackingEventsMock.filter(event => event.tripId === tripId && event.type === type);
};

// Obtener eventos por entidad (ciudad, actividad)
export const getTrackingEventsByEntity = (tripId, entityId) => {
  return trackingEventsMock.filter(event => event.tripId === tripId && event.entityId === entityId);
};

// Obtener eventos ordenados por fecha (más recientes primero)
export const getTrackingEventsSortedByDate = (tripId, limit = null) => {
  const events = getTrackingEventsByTrip(tripId).sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  
  return limit ? events.slice(0, limit) : events;
};

// Formatear fecha de evento para mostrar
export const formatEventDate = (timestamp) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Obtener mensaje descriptivo según el tipo de evento
export const getEventDescription = (event) => {
  switch (event.type) {
    case TRACKING_EVENT_TYPES.TRIP_STATUS_CHANGE:
      return `Estado del viaje cambiado de ${event.previousStatus} a ${event.newStatus}`;
    case TRACKING_EVENT_TYPES.CITY_STATUS_CHANGE:
      return `Estado de la ciudad cambiado de ${event.previousStatus} a ${event.newStatus}`;
    case TRACKING_EVENT_TYPES.ACTIVITY_STATUS_CHANGE:
      return `Actividad ${event.newStatus === ACTIVITY_STATUS.COMPLETED ? 'completada' : 'pendiente'}`;
    case TRACKING_EVENT_TYPES.ITINERARY_CHANGE:
      return `Cambio en el itinerario: ${event.metadata.message}`;
    case TRACKING_EVENT_TYPES.NOTE_ADDED:
      return `Nota añadida: ${event.metadata.message}`;
    default:
      return 'Evento de tracking';
  }
};
