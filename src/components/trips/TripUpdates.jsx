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
        if (activity.done) {
          updates.push({
            type: 'activity',
            date: new Date().toISOString(),
            content: `Actividad "${activity.name}" completada en ${city.name}`,
            cityName: city.name
          });
        }
      });
    });

    // Agregar actualizaciones personalizadas del viaje
    trip.updates?.forEach(update => {
      updates.push({
        type: 'custom',
        date: update.date,
        content: update.content
      });
    });

    return updates;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString();
  };

  const updates = getUpdates();
  
  // Ordenar actualizaciones por fecha, las más recientes primero
  const sortedUpdates = [...updates].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className={styles.container}>
      {sortedUpdates.length > 0 ? (
        <div className={styles.timeline}>
          {sortedUpdates.map((update, index) => (
            <div key={index} className={styles.update}>
              <div className={styles.icon}>
                {update.type === 'city' ? '🏙️' : '📅'}
              </div>
              <div className={styles.content}>
                <p className={styles.text}>{update.content}</p>
                <span className={styles.date}>
                  {update.date ? new Date(update.date).toLocaleDateString() : 'Fecha desconocida'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📅</div>
          <p className={styles.emptyText}>No hay actualizaciones recientes</p>
        </div>
      )}
    </div>
  );
};
