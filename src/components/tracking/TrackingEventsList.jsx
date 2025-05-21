import React from 'react';
import styles from './TrackingEventsList.module.css';
import { 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  MessageCircle,
  Calendar,
  Plane
} from 'lucide-react';
import { 
  getTrackingEventsSortedByDate, 
  formatEventDate, 
  TRACKING_EVENT_TYPES 
} from '../../mocks/trackingEvents';

const TrackingEventsList = ({ tripId, limit = null }) => {
  const events = getTrackingEventsSortedByDate(tripId, limit);

  if (!events || events.length === 0) {
    return (
      <div className={styles.noEvents}>
        No hay eventos de seguimiento registrados para este viaje
      </div>
    );
  }

  const getEventIcon = (eventType) => {
    switch (eventType) {
      case TRACKING_EVENT_TYPES.TRIP_STATUS_CHANGE:
        return <Plane size={18} />;
      case TRACKING_EVENT_TYPES.CITY_STATUS_CHANGE:
        return <MapPin size={18} />;
      case TRACKING_EVENT_TYPES.ACTIVITY_STATUS_CHANGE:
        return <CheckCircle size={18} />;
      case TRACKING_EVENT_TYPES.ITINERARY_CHANGE:
        return <Calendar size={18} />;
      case TRACKING_EVENT_TYPES.NOTE_ADDED:
        return <MessageCircle size={18} />;
      default:
        return <AlertCircle size={18} />;
    }
  };

  const getEventTypeText = (eventType) => {
    switch (eventType) {
      case TRACKING_EVENT_TYPES.TRIP_STATUS_CHANGE:
        return 'Cambio de estado del viaje';
      case TRACKING_EVENT_TYPES.CITY_STATUS_CHANGE:
        return 'Cambio de estado de ciudad';
      case TRACKING_EVENT_TYPES.ACTIVITY_STATUS_CHANGE:
        return 'Actividad actualizada';
      case TRACKING_EVENT_TYPES.ITINERARY_CHANGE:
        return 'Cambio en el itinerario';
      case TRACKING_EVENT_TYPES.NOTE_ADDED:
        return 'Nota añadida';
      default:
        return 'Evento de seguimiento';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.eventsList}>
        {events.map(event => (
          <div key={event.id} className={styles.eventItem}>
            <div className={styles.eventIconContainer}>
              <div className={styles.eventIcon}>
                {getEventIcon(event.type)}
              </div>
              <div className={styles.eventConnector}></div>
            </div>
            <div className={styles.eventContent}>
              <div className={styles.eventHeader}>
                <span className={styles.eventType}>{getEventTypeText(event.type)}</span>
                <span className={styles.eventDate}>{formatEventDate(event.timestamp)}</span>
              </div>
              <p className={styles.eventMessage}>{event.metadata.message}</p>
              {event.metadata.location && (
                <div className={styles.eventLocation}>
                  <MapPin size={14} />
                  <span>{event.metadata.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingEventsList;
