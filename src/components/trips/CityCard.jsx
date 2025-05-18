import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CityCard.module.css';
import { ActivityList } from '../activities/ActivityList';

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
      
      <div className={styles.observations}>
        <h4 className={styles.observationsTitle}>Observaciones:</h4>
        <p className={styles.observationsText}>
          {city.observations ? city.observations : <em>Sin observaciones</em>}
        </p>
      </div>

      <div className={styles.cityContent}>
        {/* Componente encapsulado para la lista de actividades */}
        <ActivityList 
          tripId={tripId}
          cityId={city.id}
          activities={city.activities}
          isAdmin={isAdmin}
        />
      </div>

      {isAdmin && (
        <div className={styles.cityActions}>
          <button 
            onClick={() => navigate(`/trips/${tripId}/cities/${city.id}/edit`)}
            className={styles.editButton}
          >
            ✏️ Editar
          </button>
        </div>
      )}
      
      {index < totalCities - 1 && (
        <div className={styles.upNext}>Up next</div>
      )}
    </div>
  );
};
