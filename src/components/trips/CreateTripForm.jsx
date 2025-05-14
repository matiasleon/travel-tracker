import React, { useState } from 'react';
import { useTrips } from '../../hooks/useTrips';
import { useAuth } from '../../context/AuthContext';
import { DateRangePicker } from '../common/DateRangePicker';
import styles from './CreateTripForm.module.css';

export const CreateTripForm = () => {
  const [tripData, setTripData] = useState({
    name: '',
    description: '',
    startDate: null,
    endDate: null
  });
  const { createTrip } = useTrips();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tripData.name.trim()) return;

    try {
      await createTrip(tripData);
      setTripData({
        name: '',
        description: '',
        startDate: null,
        endDate: null
      });
    } catch (error) {
      console.error('Error al crear el viaje:', error);
      alert('Error al crear el viaje');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="name"
          placeholder="¿A dónde viajarás?"
          value={tripData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <textarea
          name="description"
          placeholder="Describe tu viaje..."
          value={tripData.description}
          onChange={handleChange}
          className={styles.textarea}
          rows={3}
        />
      </div>

      <DateRangePicker
        startDate={tripData.startDate}
        endDate={tripData.endDate}
        onChange={([start, end]) => {
          setTripData(prev => ({
            ...prev,
            startDate: start,
            endDate: end
          }));
        }}
        label="Fechas del viaje"
      />

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={!tripData.name.trim()}
      >
        <span className={styles.icon}>✈️</span>
        <span>Crear nuevo viaje</span>
      </button>
    </form>
  );
};
