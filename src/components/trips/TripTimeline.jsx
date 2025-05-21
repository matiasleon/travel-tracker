import React, { useState, useEffect } from 'react';
import styles from './TripTimeline.module.css';
import { MapPin, ArrowRight, CheckCircle, Clock, AlertCircle, MessageCircle } from 'lucide-react';
import { CITY_STATUS } from '../../constants/statusTypes';
import { getTrackingEventsByTrip, getTrackingEventsByEntity, formatEventDate, TRACKING_EVENT_TYPES } from '../../mocks/trackingEvents';

export const TripTimeline = ({ tripId, cities, showEvents = false }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityEvents, setCityEvents] = useState([]);
  
  useEffect(() => {
    if (selectedCity) {
      const events = getTrackingEventsByEntity(tripId, selectedCity.id);
      setCityEvents(events);
    } else {
      setCityEvents([]);
    }
  }, [selectedCity, tripId]);

  if (!cities || cities.length === 0) {
    return <div className={styles.emptyTimeline}>No hay ciudades en este viaje</div>;
  }

  const handleCityClick = (city) => {
    setSelectedCity(selectedCity?.id === city.id ? null : city);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case CITY_STATUS.COMPLETED:
        return <CheckCircle size={16} className={styles.statusIcon} />;
      case CITY_STATUS.IN_PROGRESS:
        return <Clock size={16} className={styles.statusIcon} />;
      case CITY_STATUS.PENDING:
        return <AlertCircle size={16} className={styles.statusIcon} />;
      default:
        return null;
    }
  };

  const getEventIcon = (eventType) => {
    switch (eventType) {
      case TRACKING_EVENT_TYPES.CITY_STATUS_CHANGE:
        return <MapPin size={16} />;
      case TRACKING_EVENT_TYPES.ACTIVITY_STATUS_CHANGE:
        return <CheckCircle size={16} />;
      case TRACKING_EVENT_TYPES.NOTE_ADDED:
        return <MessageCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timeline}>
        {cities.map((city, index) => {
          const isSelected = selectedCity?.id === city.id;
          const cityClassName = `${styles.timelineCity} 
            ${city.status === CITY_STATUS.COMPLETED ? styles.completed : ''} 
            ${city.status === CITY_STATUS.IN_PROGRESS ? styles.inProgress : ''} 
            ${isSelected ? styles.selected : ''}`;
          
          return (
            <React.Fragment key={city.id}>
              <div 
                className={cityClassName}
                onClick={() => showEvents && handleCityClick(city)}
              >
                <div className={styles.cityPoint}>
                  <MapPin size={18} />
                </div>
                <div className={styles.cityDetails}>
                  <div className={styles.cityName}>{city.name}</div>
                  <div className={styles.cityStatus}>
                    {getStatusIcon(city.status)}
                    <span>{city.status}</span>
                  </div>
                </div>
                {showEvents && getTrackingEventsByEntity(tripId, city.id).length > 0 && (
                  <div className={styles.eventIndicator}></div>
                )}
              </div>
              
              {index < cities.length - 1 && (
                <div className={styles.timelineConnector}>
                  <div className={styles.line}></div>
                  <ArrowRight size={16} className={styles.arrow} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {showEvents && selectedCity && cityEvents.length > 0 && (
        <div className={styles.eventsContainer}>
          <h3 className={styles.eventsTitle}>Eventos en {selectedCity.name}</h3>
          <div className={styles.eventsList}>
            {cityEvents.map(event => (
              <div key={event.id} className={styles.eventItem}>
                <div className={styles.eventIcon}>
                  {getEventIcon(event.type)}
                </div>
                <div className={styles.eventContent}>
                  <span className={styles.eventDate}>{formatEventDate(event.timestamp)}</span>
                  <p className={styles.eventMessage}>{event.metadata.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showEvents && selectedCity && cityEvents.length === 0 && (
        <div className={styles.noEvents}>
          No hay eventos registrados para {selectedCity.name}
        </div>
      )}
    </div>
  );
};
