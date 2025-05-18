import React, { useState } from 'react';
import styles from './ActivityForm.module.css';
import { useTrips } from '../../hooks/useTrips';

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
  const [activityName, setActivityName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!activityName.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Llamar a la API (asíncrona)
      const result = await addCityActivity(tripId, cityId, activityName.trim());
      
      // Notificar al componente padre sobre la actividad agregada
      onActivityAdded(result);
      
      // Limpiar el formulario
      setActivityName('');
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.activityFormContainer}>
      <input
        type="text"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        className={styles.activityInput}
        placeholder="Nueva actividad..."
        autoFocus
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
  );
};
