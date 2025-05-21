import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useDateFormat } from '../../hooks/useDateFormat';
import { useTrips } from '../../hooks/useTrips';
import { TripSummary } from './TripSummary';
import styles from './TripItem.module.css';
import commonStyles from '../../styles/common.module.css';
import { getStatusText } from '../../constants/statusTypes';

export const TripItem = ({ trip }) => {
  const { user } = useAuth();
  const { formatDateForDisplay } = useDateFormat();
  const { deleteTrip } = useTrips();

  const isAdmin = trip.userRole === 'admin';
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Implementación de UX Optimistic para eliminar viajes
  const handleDeleteTrip = async (tripId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Establecer estado de eliminación
    setIsDeleting(true);
    
    try {
      await deleteTrip(tripId);
    } catch (error) {
      console.error('Error al eliminar el viaje:', error);
      setIsDeleting(false);
      alert('No se pudo eliminar el viaje: ' + error.message);
    }
  };

  // Determinar la imagen de fondo según el destino
  const getBackgroundImage = (destination) => {
    const destinations = {
      'Europa': 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'Asia': 'https://images.unsplash.com/photo-1535139262971-c51845709a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'América': 'https://images.unsplash.com/photo-1534655882117-f9eff36a1574?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'África': 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'Oceanía': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    };
    return destinations[destination] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
  };

  // Obtener el ícono según la categoría
  const getCategoryIcon = (destination) => {
    const icons = {
      'Europa': '🏰',
      'Asia': '🏯',
      'América': '🗽',
      'África': '🦁',
      'Oceanía': '🏝️'
    };
    return icons[destination] || '✈️';
  };

  // Si el viaje está siendo eliminado, mostrar un estado visual diferente
  if (isDeleting) {
    return (
      <div className={`${styles.card} ${styles.deleting}`}>
        <div className={styles.deletingMessage}>
          <div className={styles.deletingIcon}>🗑️</div>
          <p>Eliminando viaje...</p>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/trips/${trip.id}`} className={styles.cardLink}>
      <div 
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${getBackgroundImage(trip.destination)})`
        }}
      >
        <div className={styles.cardOverlay}></div>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <div className={styles.categoryBadge}>
              <span className={styles.categoryIcon}>{getCategoryIcon(trip.destination)}</span>
              <span>{trip.destination}</span>
            </div>
            <div className={`${styles.statusBadge} ${styles[trip.status]}`}>
              {getStatusText(trip.status, 'trip')}
            </div>
          </div>

          <h3 className={styles.cardTitle}>{trip.name}</h3>

          <div className={styles.cardInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📅</span>
              <span className={styles.infoText}>
                {formatDateForDisplay(trip.startDate)} - {formatDateForDisplay(trip.endDate)}
              </span>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>💰</span>
              <span className={styles.infoText}>
                {trip.budget} {trip.currency}
              </span>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.viewButton}>
              Ver detalles
            </span>
            
            {isAdmin && (
              <button 
                onClick={(e) => handleDeleteTrip(trip.id, e)}
                className={styles.deleteButton}
                aria-label="Eliminar viaje"
              >
                🗑️
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
