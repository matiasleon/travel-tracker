import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CityCard.module.css';
import { ActivityList } from '../activities/ActivityList';
import { ObservationCityCard } from './ObservationCityCard';
import { CITY_STATUS, getStatusText } from '../../constants/statusTypes';
import { useNotification } from '../../context/NotificationContext';
// Importamos iconos de Lucide
import { Check, Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';

export const CityCard = ({ 
  city, 
  tripId, 
  isAdmin, 
  onToggleStatus, 
  formatDate,
  index,
  totalCities 
}) => {
  // Hooks de navegación y estado
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  
  // Estado local para implementar UX Optimistic
  const [localCity, setLocalCity] = useState(city);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  
  // Actualizar el estado local cuando cambia la prop city
  useEffect(() => {
    if (!isUpdating) {
      setLocalCity(city);
    }
  }, [city, isUpdating]);
  
  // Manejar el cambio de estado de la ciudad con UX Optimistic
  const handleToggleStatus = () => {
    if (!isAdmin || isUpdating) return;
    
    // Guardar el estado actual para posible reversión
    const previousCity = { ...localCity };
    
    // Determinar el nuevo estado
    const currentStatus = localCity.status || CITY_STATUS.PLANNED;
    const newStatus = currentStatus === CITY_STATUS.COMPLETED ? CITY_STATUS.PLANNED : CITY_STATUS.COMPLETED;
    
    // Actualizar el estado local inmediatamente (Optimistic UI)
    setIsUpdating(true);
    setUpdateError(null);
    setLocalCity(prev => ({
      ...prev,
      status: newStatus,
      completedAt: newStatus === CITY_STATUS.COMPLETED ? new Date().toISOString() : null
    }));
    
    // Actualizar en el estado global (asíncrono)
    onToggleStatus(tripId, localCity.id)
      .then(() => {
        // Éxito: quitar el indicador de actualización
        setIsUpdating(false);
        // Limpiar cualquier error previo
        setUpdateError(null);
        // Mostrar notificación de éxito
        const statusText = newStatus === CITY_STATUS.COMPLETED ? 'completada' : 'pendiente';
        showSuccess(`Ciudad marcada como ${statusText}`);
      })
      .catch(error => {
        // Error: revertir al estado anterior
        console.error('Error al actualizar ciudad:', error || {});
        setLocalCity(previousCity);
        setUpdateError('Error al actualizar. Intente nuevamente.');
        setIsUpdating(false);
        // Mostrar notificación de error
        showError('Error al actualizar el estado de la ciudad');
      });
  };
  
  return (
    <div className={`${styles.cityCard} ${isUpdating ? styles.updating : ''}`}>
      {/* Encabezado: nombre de ciudad + status + fechas */}
      <div className={styles.cityHeader}>
        <h3 className={styles.cityName}>
          <span 
            className={`${styles.checkbox} ${localCity.status === CITY_STATUS.COMPLETED ? styles.checked : ''} ${isUpdating ? styles.updating : ''}`}
            onClick={handleToggleStatus}
            role="checkbox"
            aria-checked={localCity.status === CITY_STATUS.COMPLETED}
          >
            {localCity.status === CITY_STATUS.COMPLETED ? <Check size={16} /> : ''}
            {isUpdating && <span className={styles.spinner}></span>}
          </span>
          {localCity.name}
          <span className={styles.cityStatus}>
            {getStatusText(localCity.status, 'city')}
            {isUpdating && <span className={styles.statusUpdating}> (actualizando...)</span>}
          </span>
        </h3>
        
        <div className={styles.dates}>
          <div className={styles.dateGroup}>
            <Calendar size={14} />
            <span className={styles.dateLabel}>Inicio:</span>
            <span className={styles.dateValue}>{formatDate(localCity.startDate)}</span>
          </div>
          <div className={styles.dateGroup}>
            <Calendar size={14} />
            <span className={styles.dateLabel}>Fin:</span>
            <span className={styles.dateValue}>{formatDate(localCity.endDate)}</span>
          </div>
        </div>
        
        {city.status === CITY_STATUS.COMPLETED && city.completedAt && (
          <span className={styles.completedAt}>
            <Check size={14} />
            Completado: {new Date(city.completedAt).toLocaleDateString()}
          </span>
        )}
      </div>
      
      {updateError && <div className={styles.errorMessage}>{updateError}</div>}
      
      {/* Notas / observaciones (estilo textarea colapsable) */}
      <ObservationCityCard 
        city={localCity} 
        tripId={tripId} 
        isAdmin={isAdmin} 
      />

      {/* Actividades (chips o lista interactiva) */}
      <div className={styles.cityContent}>
        <ActivityList 
          activities={localCity.activities || []}
          tripId={tripId}
          cityId={localCity.id}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
};
