import React from 'react';
import styles from './TripUpdates.module.css';

export const TripUpdates = ({ trip }) => {
  const getUpdates = () => {
    const updates = [];
    
    // Agregar actualizaciones de ciudades
    trip.cities?.forEach(city => {
      if (city.completed) {
        updates.push({
          type: 'city',
          date: city.completedAt,
          content: `¡${city.name} completada!`,
          cityName: city.name
        });
      }
      
      // Agregar actualizaciones de actividades
      city.activities?.forEach(activity => {
        if (activity.completed) {
          updates.push({
            type: 'activity',
            date: activity.completedAt,
            content: `Actividad "${activity.title}" completada en ${city.name}`,
            cityName: city.name
          });
        }
      });
    });

    // Ordenar por fecha más reciente
    return updates.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString();
  };

  const updates = getUpdates();

  if (updates.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Actualizaciones</h3>
        <p className={styles.noUpdates}>No hay actualizaciones recientes</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Últimas Actualizaciones</h3>
      <div className={styles.timeline}>
        {updates.map((update, index) => (
          <div key={index} className={styles.update}>
            <div className={styles.icon}>
              {update.type === 'city' ? '🌆' : '✅'}
            </div>
            <div className={styles.content}>
              <p className={styles.text}>{update.content}</p>
              <span className={styles.date}>{formatDate(update.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
