import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CityCard.module.css';

import { useTrips } from '../../hooks/useTrips';

export const CityCard = ({ 
  city, 
  tripId, 
  isAdmin, 
  onToggleStatus, 
  formatDate,
  index,
  totalCities 
}) => {
  const navigate = useNavigate();
  const { toggleActivity } = useTrips();

  return (
    <div className={styles.cityCard}>
      <div className={styles.cityHeader}>
        <h3 className={styles.cityName}>
          <span 
            className={`${styles.checkbox} ${city.completed ? styles.checked : ''}`}
            onClick={() => isAdmin && onToggleStatus(tripId, city.id)}
            role="checkbox"
            aria-checked={city.completed}
          >
            {city.completed ? '✓' : ''}
          </span>
          {city.name}
        </h3>
        <div className={styles.dates}>
          <div className={styles.dateGroup}>
            <span className={styles.dateLabel}>Inicio:</span>
            <span className={styles.dateValue}>{formatDate(city.startDate)}</span>
          </div>
          <div className={styles.dateGroup}>
            <span className={styles.dateLabel}>Fin:</span>
            <span className={styles.dateValue}>{formatDate(city.endDate)}</span>
          </div>
        </div>
        {city.completedAt && (
          <span className={styles.completedAt}>
            Completado: {new Date(city.completedAt).toLocaleDateString()}
          </span>
        )}
      </div>
      
      {city.observations && (
        <div className={styles.observations}>
          <h4 className={styles.observationsTitle}>Observaciones:</h4>
          <p className={styles.observationsText}>{city.observations}</p>
        </div>
      )}

      <div className={styles.activities}>
        {city.activities?.length > 0 && (
          <h4 className={styles.activitiesTitle}>Actividades:</h4>
        )}
        {city.activities?.map((activity, index) => (
          <div key={index} className={`${styles.activity} ${activity.done ? styles.activityDone : ''}`}>
            <span className={styles.activityCheckbox} onClick={() => isAdmin && toggleActivity(tripId, city.id, index)}>
              {activity.done ? '✓' : ''}
            </span>
            <span className={styles.activityName}>{activity.name}</span>
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className={styles.cityActions}>
          <button 
            onClick={() => navigate(`/trips/${tripId}/cities/${city.id}/edit`)}
            className={styles.editButton}
          >
            ✏️ Editar
          </button>
          <button 
            onClick={() => navigate(`/trips/${tripId}/cities/${city.id}/add-activity`)}
            className={styles.addButton}
          >
            ➕ Actividad
          </button>
        </div>
      )}
      
      {index < totalCities - 1 && (
        <div className={styles.upNext}>Up next</div>
      )}
    </div>
  );
};
