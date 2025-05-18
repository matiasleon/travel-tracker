import React from 'react';
import styles from './TripSummary.module.css';
import { ACTIVITY_STATUS, CITY_STATUS, getStatusText } from '../../constants/statusTypes';

export const TripSummary = ({ trip }) => {
  // Calcular estadísticas del viaje utilizando el patrón de UX Optimistic
  const totalCities = trip.cities.length;
  const completedCities = trip.cities.filter(city => city.status === CITY_STATUS.COMPLETED).length;
  const totalActivities = trip.cities.reduce((sum, city) => 
    sum + (city.activities?.length || 0), 0);
  const completedActivities = trip.cities.reduce((sum, city) => 
    sum + (city.activities?.filter(act => act.status === ACTIVITY_STATUS.COMPLETED)?.length || 0), 0);
  
  // Calcular duración total del viaje en días
  const startDate = trip.cities.length ? 
    new Date(Math.min(...trip.cities.map(city => new Date(city.startDate)))) : 
    new Date();
  const endDate = trip.cities.length ? 
    new Date(Math.max(...trip.cities.map(city => new Date(city.endDate)))) : 
    new Date();
  const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calcular el porcentaje de progreso para la barra de progreso
  const progressPercentage = totalActivities ? Math.round((completedActivities / totalActivities) * 100) : 0;
  
  return (
    <div className={styles.tripSummary}>
      <h4 className={styles.summaryTitle}>Resumen del Viaje</h4>
      
      <div className={styles.summaryGrid}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Duración</span>
          <span className={styles.summaryValue}>{durationDays} días</span>
        </div>
        
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Ciudades</span>
          <span className={styles.summaryValue}>
            {completedCities}/{totalCities}
          </span>
        </div>
        
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Actividades</span>
          <span className={styles.summaryValue}>
            {completedActivities}/{totalActivities}
          </span>
        </div>
        
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Estado</span>
          <span className={`${styles.summaryValue} ${styles[trip.status]}`}>
            {getStatusText(trip.status, 'trip')}
          </span>
        </div>
      </div>
      
      <div className={styles.progressContainer}>
        <div className={styles.progressInfo}>
          <span className={styles.progressLabel}>Progreso general</span>
          <span className={styles.progressPercentage}>{progressPercentage}%</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
