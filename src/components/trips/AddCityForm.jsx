import React, { useState } from 'react';
import { DateRangePicker } from '../common/DateRangePicker';
import styles from './AddCityForm.module.css';

export const AddCityForm = ({ onAddCity, onCancel }) => {
  const [cityData, setCityData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    completed: false,
    completedAt: null,
    observations: '',
    activities: []
  });

  const [newActivity, setNewActivity] = useState('');

  const handleAddActivity = () => {
    if (!newActivity.trim()) return;
    setCityData(prev => ({
      ...prev,
      activities: [...prev.activities, {
        name: newActivity.trim(),
        done: false
      }]
    }));
    setNewActivity('');
  };

  const handleRemoveActivity = (index) => {
    setCityData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityData.name || !cityData.startDate || !cityData.endDate) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    if (new Date(cityData.startDate) > new Date(cityData.endDate)) {
      alert('La fecha de inicio no puede ser posterior a la fecha de fin');
      return;
    }
    onAddCity({
      ...cityData,
      id: Date.now().toString(),
      completed: false,
      completedAt: null
      // Mantenemos las actividades que ya están en cityData
    });

  };



  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Agregar Nueva Ciudad</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="cityName">Nombre de la ciudad:</label>
          <input
            type="text"
            id="cityName"
            value={cityData.name}
            onChange={(e) => setCityData(prev => ({ ...prev, name: e.target.value }))}
            className={styles.input}
            placeholder="Ingresa el nombre de la ciudad"
            required
          />
        </div>

        <DateRangePicker
          startDate={cityData.startDate}
          endDate={cityData.endDate}
          onChange={([start, end]) => {
            setCityData(prev => ({
              ...prev,
              startDate: start,
              endDate: end
            }));
          }}
          label="Fechas de visita"
        />

        <div className={styles.inputGroup}>
          <label htmlFor="observations">Observaciones:</label>
          <textarea
            id="observations"
            value={cityData.observations}
            onChange={(e) => setCityData(prev => ({ ...prev, observations: e.target.value }))}
            className={styles.textarea}
            placeholder="Agrega notas o comentarios sobre esta ciudad"
            rows="3"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="activities">Actividades:</label>
          <div className={styles.activityInput}>
            <input
              type="text"
              id="activities"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              className={styles.input}
              placeholder="Agregar una actividad"
            />
            <button 
              type="button" 
              onClick={handleAddActivity}
              className={styles.addActivityButton}
            >
              +
            </button>
          </div>
          
          {cityData.activities.length > 0 && (
            <ul className={styles.activityList}>
              {cityData.activities.map((activity, index) => (
                <li key={index} className={styles.activityItem}>
                  <span>{activity.name}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveActivity(index)}
                    className={styles.removeActivityButton}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Agregar Ciudad
          </button>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
