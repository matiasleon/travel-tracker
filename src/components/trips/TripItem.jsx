import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useDateFormat } from '../../hooks/useDateFormat';
import { useTrips } from '../../hooks/useTrips';
import styles from './TripItem.module.css';
import commonStyles from '../../styles/common.module.css';

export const TripItem = ({ trip }) => {
  const { user } = useAuth();
  const { formatDateForDisplay } = useDateFormat();
  const { deleteTrip } = useTrips();

  const isAdmin = trip.userRole === 'admin';

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteTrip(tripId);
    } catch (error) {
      console.error('Error al eliminar el viaje:', error);
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={`/trips/${trip.id}`} className={styles.link}>
          <div>
            <h3 className={styles.title}>{trip.name}</h3>
            <div className={styles.tripInfo}>
              <p>{trip.description}</p>
              <p>Inicio: {formatDateForDisplay(trip.startDate)}</p>
              <p>Fin: {formatDateForDisplay(trip.endDate)}</p>
              <p>{trip.cities?.length || 0} ciudades</p>
            </div>
          </div>
        </Link>

        <button 
          className={commonStyles.deleteButton}
          disabled={!isAdmin}
          onClick={() => handleDeleteTrip(trip.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
