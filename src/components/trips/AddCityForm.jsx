import React, { useState } from 'react';
import { DateRangePicker } from '../common/DateRangePicker';
import styles from './AddCityForm.module.css';

export const AddCityForm = ({ onAddCity, onCancel }) => {
  const [cityData, setCityData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    completed: false,
    completedAt: null
  });




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
      activities: [],
      completed: false,
      completedAt: null
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
