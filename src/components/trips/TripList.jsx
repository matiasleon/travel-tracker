import React from 'react';
import { TripItem } from './TripItem';
import { useTrips } from '../../hooks/useTrips';
import styles from './TripList.module.css';

export const TripList = ({ trips }) => {
  const { loading } = useTrips();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Cargando tus viajes...</p>
      </div>
    );
  }

  return (
    <div className={styles.tripList}>
      {trips.map(trip => (
        <TripItem key={trip.id} trip={trip} />
      ))}
    </div>
  );
};
