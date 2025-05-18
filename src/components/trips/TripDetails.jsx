import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrips } from '../../hooks/useTrips';
import { useAuth } from '../../context/AuthContext';
import { Layout } from '../layout/Layout';
import { ACTIVITY_STATUS, CITY_STATUS, TRIP_STATUS, getStatusText } from '../../constants/statusTypes';
import styles from './TripDetails.module.css';
import commonStyles from '../../styles/common.module.css';

import { useDateFormat } from '../../hooks/useDateFormat';
import { AddCityForm } from './AddCityForm';
import { TripUpdates } from './TripUpdates';
import { CityCard } from './CityCard';

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const TripDetails = () => {
  const [showAddCity, setShowAddCity] = useState(false);
  const { tripId } = useParams();
  const { user } = useAuth();
  const { trips, addCity, toggleCityStatus } = useTrips();
  
  const trip = trips.find(t => t.id === tripId);

  if (!trip) {
    return (
      <Layout>
        <div>Cargando...</div>
      </Layout>
    );
  }

  const isAdmin = trip.userRole === 'admin';

  const getTransportIcon = (type) => {
    switch (type) {
      case 'flight': return '✈️';
      case 'train': return '🚂';
      case 'bus': return '🚌';
      case 'car': return '🚗';
      default: return '🚊';
    }
  };

  const { formatDateForDisplay } = useDateFormat();

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div className={styles.tripIcon}>✈️</div>
            <div className={styles.tripInfo}>
              <h1 className={styles.title}>{trip.name}</h1>
              <div className={styles.dates}>
                <div className={styles.dateGroup}>
                  <span className={styles.dateLabel}>Inicio</span>
                  <span className={styles.dateValue}>{formatDateForDisplay(trip.startDate)}</span>
                </div>
                <div className={styles.dateGroup}>
                  <span className={styles.dateLabel}>Fin</span>
                  <span className={styles.dateValue}>{formatDateForDisplay(trip.endDate)}</span>
                </div>
              </div>
              <p className={styles.description}>{trip.description}</p>
            </div>
          </div>

          {trip.updates && trip.updates.length > 0 ? (
            <div className={styles.updatesSection}>
              <h2 className={styles.sectionTitle}>Actualizaciones</h2>
              <TripUpdates trip={trip} />
            </div>
          ) : null}

          <div className={styles.tripSummarySection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📊</span>
              <span>Resumen del Viaje</span>
            </h2>
            <div className={styles.tripSummaryStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Ciudades</span>
                <span className={styles.statValue}>
                  {trip.cities?.filter(city => city.status === CITY_STATUS.COMPLETED).length || 0}/{trip.cities?.length || 0}
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Actividades</span>
                <span className={styles.statValue}>
                  {trip.cities?.reduce((total, city) => 
                    total + (city.activities?.filter(act => act.status === ACTIVITY_STATUS.COMPLETED).length || 0), 0)}/
                  {trip.cities?.reduce((total, city) => 
                    total + (city.activities?.length || 0), 0)}
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Estado</span>
                <span className={`${styles.statValue} ${styles[trip.status]}`}>
                  {getStatusText(trip.status, 'trip')}
                </span>
              </div>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🌙️</span>
            <span>Ciudades a visitar</span>
            <span className={styles.citiesCount}>{trip.cities?.length || 0}</span>
          </h2>

          <div className={styles.timeline}>
            {trip.cities?.map((city, index) => (
              <div key={city.id} className={styles.cityTimelineItem}>
                <CityCard
                  city={city}
                  tripId={tripId}
                  isAdmin={isAdmin}
                  onToggleStatus={toggleCityStatus}
                  formatDate={formatDateForDisplay}
                  index={index}
                  totalCities={trip.cities.length}
                />
                {index < trip.cities.length - 1 && trip.transport?.[index] && (
                  <div key={`transport-${city.id}-${index}`} className={styles.transport}>
                    <span className={styles.transportIcon}>
                      {getTransportIcon(trip.transport[index].type)}
                    </span>
                    <div className={styles.transportDetails}>
                      <div className={styles.transportType}>
                        {trip.transport[index].type}
                      </div>
                      <div className={styles.transportTimes}>
                        {formatDate(trip.transport[index].startDate)} - 
                        {formatDate(trip.transport[index].endDate)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showAddCity && (
            <div className={styles.modal}>
              <AddCityForm
                onAddCity={async (newCity) => {
                  try {
                    await addCity(tripId, newCity);
                    setShowAddCity(false);
                  } catch (error) {
                    console.error('Error al agregar ciudad:', error);
                    alert('Error al agregar la ciudad');
                  }
                }}
                onCancel={() => setShowAddCity(false)}
              />
            </div>
          )}
        </div>

        <div className={styles.sidebar}>
          {isAdmin && (
            <button 
              onClick={() => setShowAddCity(true)}
              className={commonStyles.primaryButton}
            >
              + Agregar Ciudad
            </button>
          )}
          <button className={commonStyles.secondaryButton}>
            📍 Compartir Viaje
          </button>
          <button className={commonStyles.secondaryButton}>
            📅 Exportar Calendario
          </button>
          {isAdmin && (
            <button className={commonStyles.dangerButton}>
              🗑️ Eliminar Viaje
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};
