import React, { useState, useEffect } from 'react';
import styles from './ObservationCityCard.module.css';
import { useTrips } from '../../hooks/useTrips';
import { useNotification } from '../../context/NotificationContext';

/**
 * Componente para mostrar y editar las observaciones de una ciudad
 * Implementa el patrón UX Optimistic para actualizaciones inmediatas
 */
export const ObservationCityCard = ({ city, tripId, isAdmin = false }) => {
  const { updateCityObservations } = useTrips();
  const { showSuccess, showError } = useNotification();
  
  // Estado local para implementar UX Optimistic
  const [localObservations, setLocalObservations] = useState(city.observations || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  
  // Sincronizar con los cambios en las props
  useEffect(() => {
    if (!isEditing && !isUpdating) {
      setLocalObservations(city.observations || '');
    }
  }, [city.observations, isEditing, isUpdating]);
  
  // Manejar el envío del formulario de edición
  const handleSubmit = async () => {
    if (isUpdating) return;
    
    // Guardar el valor anterior para posible reversión
    const previousObservations = city.observations;
    
    // Actualizar estado local inmediatamente (UX Optimistic)
    setIsUpdating(true);
    setError(null);
    
    try {
      // Llamar a la API (asíncrona)
      await updateCityObservations(tripId, city.id, localObservations);
      
      // Mostrar notificación de éxito
      showSuccess('Observaciones actualizadas correctamente');
      
      // Terminar modo edición
      setIsEditing(false);
    } catch (err) {
      console.error('Error al actualizar observaciones:', err);
      setError('Error al actualizar observaciones. Intente nuevamente.');
      
      // Revertir al valor anterior
      setLocalObservations(previousObservations || '');
      
      // Mostrar notificación de error
      showError('Error al actualizar observaciones');
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Cancelar la edición
  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setLocalObservations(city.observations || '');
  };
  
  return (
    <div className={`${styles.container} ${isUpdating ? styles.updating : ''}`}>
      <div className={styles.header}>
        <h4 className={styles.title}>Observaciones:</h4>
        {isAdmin && !isEditing && (
          <button 
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
            disabled={isUpdating}
          >
            <span role="img" aria-label="Editar">✏️</span>
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className={styles.form}>
          <textarea
            value={localObservations}
            onChange={(e) => setLocalObservations(e.target.value)}
            className={styles.textarea}
            placeholder="Escriba sus observaciones aquí..."
            rows={4}
            disabled={isUpdating}
            autoFocus
          />
          
          {error && <p className={styles.error}>{error}</p>}
          
          <div className={styles.actions}>
            <button 
              className={`${styles.buttonConfirm} ${isUpdating ? styles.submitting : ''}`}
              onClick={handleSubmit}
              disabled={isUpdating}
            >
              {isUpdating ? '...' : '✓'}
            </button>
            <button 
              className={styles.buttonCancel}
              onClick={handleCancel}
              disabled={isUpdating}
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.content}>
          {localObservations ? localObservations : <em>Sin observaciones</em>}
          {isUpdating && <span className={styles.updatingText}> (actualizando...)</span>}
        </p>
      )}
    </div>
  );
};