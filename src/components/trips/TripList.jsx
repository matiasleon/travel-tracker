import React, { useEffect } from 'react';
import { TripItem } from './TripItem';
import { useTrips } from '../../hooks/useTrips';
import styles from './TripList.module.css';

export const TripList = () => {
  const { trips, loading } = useTrips();

  useEffect(() => {
    console.log('TripList re-render:', trips.length, 'viajes');
  }, [trips]);

  if (loading) {
    return <div>Cargando viajes...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span>📋</span>
          <span>Tus Viajes</span>
        </h2>
        <span className="text-gray-500 text-sm">{trips.length} {trips.length === 1 ? 'viaje' : 'viajes'}</span>
      </div>
      
      {trips.length === 0 ? (
        <div className={styles.emptyState}>
          <p className="mb-2">¡No tienes ningún viaje planeado!</p>
          <p className="text-sm">Crea tu primer viaje usando el formulario.</p>
        </div>
      ) : (
        <div className={styles.container}>
          {trips.map(trip => (
            <TripItem key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};
