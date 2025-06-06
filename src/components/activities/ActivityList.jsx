import React, { useState, useEffect } from 'react';
import styles from './ActivityList.module.css';
import { useTrips } from '../../hooks/useTrips';
import { ActivityForm } from './ActivityForm';
import { ACTIVITY_STATUS, getStatusText } from '../../constants/statusTypes';

/**
 * Componente para mostrar y gestionar la lista de actividades de una ciudad
 */
export const ActivityList = ({
  tripId,
  cityId,
  activities,
  isAdmin
}) => {
  const { toggleActivity } = useTrips();
  const [localActivities, setLocalActivities] = useState(activities || []);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  
  // Sincronizar actividades cuando cambien las props
  useEffect(() => {
    setLocalActivities(activities || []);
  }, [activities]);

  // Manejar el toggle de una actividad con UX Optimistic
  const handleToggleActivity = (index) => {
    if (!isAdmin) return;
    
    // Guardar el estado actual para posible reversión
    const currentActivities = [...localActivities];
    const currentActivity = currentActivities[index];
    const currentStatus = currentActivity.status || ACTIVITY_STATUS.PLANNED;
    
    // Determinar el nuevo estado
    const newStatus = currentStatus === ACTIVITY_STATUS.COMPLETED ? ACTIVITY_STATUS.PLANNED : ACTIVITY_STATUS.COMPLETED;
    
    // Actualizar el estado local inmediatamente (Optimistic UI)
    setLocalActivities(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          status: newStatus,
          isUpdating: true // Indicador visual de actualización en curso
        };
      }
      return updated;
    });
    
    // Actualizar en el estado global (asíncrono)
    toggleActivity(tripId, cityId, index)
      .then(() => {
        // Éxito: quitar el indicador de actualización
        setLocalActivities(prev => {
          const updated = [...prev];
          if (updated[index]) {
            updated[index] = {
              ...updated[index],
              isUpdating: false,
              error: null // Limpiar cualquier error previo
            };
          }
          return updated;
        });
      })
      .catch(error => {
        // Error: revertir al estado anterior
        console.error('Error al actualizar actividad:', error || {});
        // Actualizar el estado con el error
        setLocalActivities(prev => {
          const updated = [...currentActivities];
          if (updated[index]) {
            updated[index] = {
              ...updated[index],
              isUpdating: false,
              error: 'Error al actualizar. Intente nuevamente.'
            };
          }
          return updated;
        });
      });
  };

  // Manejar la adición de una nueva actividad
  const handleActivityAdded = (newActivity) => {
    // Agregar la actividad al estado local
    setLocalActivities(prev => [...prev, newActivity]);
    setIsAddingActivity(false);
  };

  return (
    <div className={styles.activityListContainer}>
      <div className={styles.activityListHeader}>
        <h4 className={styles.activityListTitle}>Actividades</h4>
        {isAdmin && !isAddingActivity && (
          <button 
            className={styles.addActivityButton}
            onClick={() => setIsAddingActivity(true)}
          >
            +
          </button>
        )}
      </div>
      
      {isAddingActivity && (
        <ActivityForm 
          tripId={tripId}
          cityId={cityId}
          onActivityAdded={handleActivityAdded}
          onCancel={() => setIsAddingActivity(false)}
        />
      )}
      
      <div className={styles.activitiesList}>
        {localActivities.length > 0 ? (
          localActivities.map((activity, index) => (
            <div 
              key={activity.id || index} 
              className={`${styles.activity} 
                ${activity.status === ACTIVITY_STATUS.COMPLETED ? styles.activityDone : ''} 
                ${activity.isUpdating ? styles.updatingActivity : ''}
                ${activity.error ? styles.errorActivity : ''}`}
            >
              <span 
                className={`${styles.activityCheckbox} ${activity.isUpdating ? styles.updating : ''}`}
                onClick={() => !activity.isUpdating && handleToggleActivity(index)}
              >
                {activity.status === ACTIVITY_STATUS.COMPLETED ? '✓' : ''}
                {activity.isUpdating && <span className={styles.spinner}></span>}
              </span>
              <span className={styles.activityName}>
                {activity.name}
                {activity.error && (
                  <span className={styles.activityError}>{activity.error}</span>
                )}
                <span className={`${styles.activityStatus} ${styles[activity.status || ACTIVITY_STATUS.PLANNED]}`}>
                  {getStatusText(activity.status, 'activity')}
                  {activity.isUpdating && <span className={styles.statusUpdating}> (actualizando...)</span>}
                </span>
              </span>
            </div>
          ))
        ) : (
          <div className={styles.emptyActivities}>
            {isAdmin ? (
              <button 
                className={styles.addFirstActivityButton}
                onClick={() => setIsAddingActivity(true)}
              >
                Agregar primera actividad
              </button>
            ) : (
              <span>No hay actividades</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
