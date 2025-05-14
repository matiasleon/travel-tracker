import React, { useState } from 'react';
import { useTrips } from '../../hooks/useTrips';
import { useAuth } from '../../context/AuthContext';
import { DateRangePicker } from '../common/DateRangePicker';
import styles from './TripForm.module.css';

export const TripForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const { createTrip } = useTrips();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    travelers: [{ email: user?.email, role: 'admin' }],
    cities: []
  });
  const [error, setError] = useState('');
  const [showAddCity, setShowAddCity] = useState(false);
  const [newCity, setNewCity] = useState({
    name: '',
    visitDate: '',
    activities: []
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTraveler = (email) => {
    if (!email.trim()) return;
    if (formData.travelers.some(t => t.email === email)) {
      setError('Este viajero ya está agregado');
      return;
    }
    setFormData(prev => ({
      ...prev,
      travelers: [...prev.travelers, { email, role: 'traveler' }]
    }));
  };

  const removeTraveler = (email) => {
    if (email === user?.email) {
      setError('No puedes eliminarte a ti mismo como administrador');
      return;
    }
    setFormData(prev => ({
      ...prev,
      travelers: prev.travelers.filter(t => t.email !== email)
    }));
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!newCity.name || !newCity.visitDate) {
      setError('El nombre y la fecha de visita son requeridos');
      return;
    }

    setFormData(prev => ({
      ...prev,
      cities: [...prev.cities, { ...newCity, id: Date.now().toString() }]
    }));

    setNewCity({
      name: '',
      visitDate: '',
      activities: []
    });
    setShowAddCity(false);
  };

  const removeCity = (cityId) => {
    setFormData(prev => ({
      ...prev,
      cities: prev.cities.filter(city => city.id !== cityId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.name.trim()) {
      setError('El nombre del viaje es requerido');
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setError('Las fechas son requeridas');
      return;
    }

    try {
      // Convertir las fechas a objetos Date y luego a ISO string
      const startDateTime = new Date(formData.startDate);
      const endDateTime = new Date(formData.endDate);

      // Agregar las horas si están presentes
      if (formData.startTime) {
        const [hours, minutes] = formData.startTime.split(':');
        startDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      }

      if (formData.endTime) {
        const [hours, minutes] = formData.endTime.split(':');
        endDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      }

      if (endDateTime <= startDateTime) {
        setError('La fecha de fin debe ser posterior a la fecha de inicio');
        return;
      }

      await createTrip({
        ...formData,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        createdBy: user.uid,
        cities: [],
        notes: []
      });

      if (onSuccess) {
        onSuccess();
      }

      // Limpiar formulario
      setFormData({
        name: '',
        description: '',
        startDate: new Date().toISOString(),
        startTime: '',
        endDate: new Date(Date.now() + 86400000).toISOString(),
        endTime: '',
        travelers: [{ email: user?.email, role: 'admin' }],
        cities: []
      });
    } catch (error) {
      setError('Error al crear el viaje: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Nombre del Viaje
          <span className={styles.charCount}>{formData.name.length}/100</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength={50}
          className={styles.input}
          placeholder="Ej: Vacaciones en Europa"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.input}
          rows="3"
          placeholder="Describe tu viaje..."
        />
      </div>

      <DateRangePicker
        startDate={formData.startDate}
        endDate={formData.endDate}
        onChange={([start, end]) => {
          setFormData(prev => ({
            ...prev,
            startDate: start,
            endDate: end
          }));
        }}
        label="Fechas del viaje"
      />

      <div className={styles.travelers}>
        <label className={styles.label}>Viajeros</label>
        <div className={styles.travelersList}>
          {formData.travelers.map(traveler => (
            <div key={traveler.email} className={styles.travelerChip}>
              <span>{traveler.email}</span>
              {traveler.email !== user?.email && (
                <button
                  type="button"
                  onClick={() => removeTraveler(traveler.email)}
                  className={styles.removeButton}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submitButton}>
        Crear Viaje
      </button>
    </form>
  );
};
