import React, { useState } from 'react';
import styles from './ActivityForm.module.css';
import { useTrips } from '../../hooks/useTrips';
import { useNotification } from '../../context/NotificationContext';

/**
 * Componente para agregar nuevas actividades a una ciudad
 */
export const ActivityForm = ({ 
  tripId, 
  cityId, 
  onActivityAdded,
  onCancel 
}) => {
  const { addCityActivity } = useTrips();
  const { showSuccess, showError } = useNotification();
  const [activityName, setActivityName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!activityName.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Implementación del patrón UX Optimistic
      // Notificar al usuario que se está agregando la actividad
      const tempActivity = {
        name: activityName.trim(),
        status: 'PLANNED',
        isTemp: true // Marcador para indicar que es temporal
      };
      
      // Notificar al componente padre con la actividad temporal
      onActivityAdded(tempActivity);
      
      // Llamar a la API (asíncrona)
      const result = await addCityActivity(tripId, cityId, activityName.trim());
      
      // Mostrar notificación de éxito
      showSuccess('Actividad agregada correctamente');
      
      // Limpiar el formulario
      setActivityName('');
    } catch (err) {
      console.error('Error al agregar actividad:', err);
      setError(`Error al agregar actividad. Intente nuevamente.`);
      
      // Mostrar notificación de error
      showError('Error al agregar actividad. Intente nuevamente.');
      
      // Notificar al componente padre sobre el error para que pueda manejarlo si es necesario
      if (onCancel) onCancel();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.activityFormContainer} ${isSubmitting ? styles.updating : ''}`}>
      <div className={styles.form}>
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          className={styles.activityInput}
          placeholder="Nueva actividad..."
          autoFocus
          disabled={isSubmitting}
        />
        
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <div className={styles.activityFormActions}>
          <button 
            className={`${styles.confirmButton} ${isSubmitting ? styles.submitting : ''}`}
            onClick={handleSubmit}
            disabled={isSubmitting || !activityName.trim()}
          >
            {isSubmitting ? '...' : '✓'}
          </button>
          <button 
            className={styles.cancelButton}
            onClick={() => {
              setActivityName('');
              onCancel();
            }}
            disabled={isSubmitting}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
