import React, { useState, useEffect } from 'react';
import styles from './ActivityList.module.css';
import { useTrips } from '../../hooks/useTrips';
import { ActivityForm } from './ActivityForm';

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

  // Manejar el toggle de una actividad
  const handleToggleActivity = (index) => {
    if (!isAdmin) return;
    
    // Actualizar en el estado global
    toggleActivity(tripId, cityId, index);
    
    // Actualizar el estado local para una respuesta inmediata
    setLocalActivities(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          done: !updated[index].done
        };
      }
      return updated;
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
      
      {localActivities.length > 0 ? (
        <div className={styles.activitiesList}>
          {localActivities.map((activity, index) => (
            <div 
              key={activity.id || index} 
              className={`${styles.activity} ${activity.done ? styles.activityDone : ''} ${activity.isTemp ? styles.tempActivity : ''}`}
            >
              <span 
                className={styles.activityCheckbox} 
                onClick={() => !activity.isTemp && handleToggleActivity(index)}
              >
                {activity.done ? '✓' : ''}
              </span>
              <span className={styles.activityName}>
                {activity.name}
                {activity.isTemp && <small className={styles.tempIndicator}> (guardando...)</small>}
              </span>
            </div>
          ))}
        </div>
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
  );
};
