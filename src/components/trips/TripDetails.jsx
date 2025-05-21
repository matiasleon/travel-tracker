import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTrips } from '../../hooks/useTrips';
import { useAuth } from '../../context/AuthContext';
import { Layout } from '../layout/Layout';
import { ACTIVITY_STATUS, CITY_STATUS, getStatusText } from '../../constants/statusTypes';
import styles from './TripDetails.module.css';
import commonStyles from '../../styles/common.module.css';
// Using common styles for buttons

import { useDateFormat } from '../../hooks/useDateFormat';
import { AddCityForm } from './AddCityForm';
import { TripUpdates } from './TripUpdates';
import { CityCard } from './CityCard';
import { TripTimeline } from './TripTimeline';
import { ShareTripButton } from '../share/ShareTripButton';
import TrackingEventsList from '../tracking/TrackingEventsList';
import { PlusCircle, Trash, Map, Clock, Calendar, List, Activity, Share2 } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('itinerary');
  const [updates, setUpdates] = useState([]);
  const { tripId } = useParams();
  const { user } = useAuth();
  const { trips, addCity, toggleCityStatus } = useTrips();
  
  const trip = trips.find(t => t.id === tripId);
  
  // Generar actualizaciones simuladas basadas en el estado del viaje
  useEffect(() => {
    if (trip) {
      const simulatedUpdates = generateUpdates(trip);
      setUpdates(simulatedUpdates);
    }
  }, [trip]);
  
  // Función para generar actualizaciones simuladas
  const generateUpdates = (trip) => {
    if (!trip) return [];
    
    const updates = [];
    
    // Actualización del estado del viaje
    updates.push({
      id: `update-trip-${Date.now()}`,
      type: 'TRIP_STATUS',
      date: new Date().toISOString(),
      content: `El viaje está actualmente en estado: ${getStatusText(trip.status, 'trip')}`,
      icon: <Calendar size={16} />
    });
    
    // Actualizaciones de ciudades
    trip.cities.forEach(city => {
      updates.push({
        id: `update-city-${city.id}`,
        type: 'CITY_STATUS',
        date: new Date(city.startDate).toISOString(),
        content: `${city.name}: ${getStatusText(city.status, 'city')}`,
        icon: <Map size={16} />
      });
      
      // Actualizaciones de actividades por ciudad
      if (city.activities && city.activities.length > 0) {
        city.activities.forEach((activity, index) => {
          updates.push({
            id: `update-activity-${city.id}-${index}`,
            type: 'ACTIVITY_STATUS',
            date: new Date(city.startDate).toISOString(),
            content: `Actividad "${activity.name}" en ${city.name}: ${getStatusText(activity.status || 'planned', 'activity')}`,
            icon: <Activity size={16} />
          });
        });
      }
    });
    
    // Ordenar actualizaciones por fecha (más recientes primero)
    return updates.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

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
            {isAdmin && (
              <div className={styles.shareButtonContainer}>
                <ShareTripButton tripId={tripId} />
              </div>
            )}
          </div>
          
          <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tabButton} ${activeTab === 'itinerary' ? styles.active : ''}`}
                onClick={() => setActiveTab('itinerary')}
              >
                <Map size={16} /> Itinerario
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'tracking' ? styles.active : ''}`}
                onClick={() => setActiveTab('tracking')}
              >
                <Activity size={16} /> Seguimiento
              </button>
              {trip.updates && trip.updates.length > 0 && (
                <button 
                  className={`${styles.tabButton} ${activeTab === 'updates' ? styles.active : ''}`}
                  onClick={() => setActiveTab('updates')}
                >
                  <Clock size={16} /> Actualizaciones
                </button>
              )}
            </div>
          </div>

          <div className={styles.tabContent}>
            {/* Pestaña de Itinerario */}
            {activeTab === 'itinerary' && (
              <div className={styles.itineraryTab}>
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
                  <span className={styles.sectionIcon}>🗺️</span>
                  <span>Itinerario</span>
                  <span className={styles.citiesCount}>{trip.cities?.length || 0}</span>
                </h2>
                
                {/* Timeline visual de ciudades */}
                <TripTimeline cities={trip.cities || []} />

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
              </div>
            )}
            
            {/* Pestaña de Seguimiento */}
            {activeTab === 'tracking' && (
              <div className={styles.trackingTab}>
                <div className={styles.trackingHeader}>
                  <h2 className={styles.sectionTitle}>
                    <Activity size={20} className={styles.sectionIcon} />
                    <span>Seguimiento del Viaje</span>
                  </h2>
                  <p className={styles.trackingDescription}>
                    Aquí puedes ver el progreso de tu viaje y compartirlo con tus familiares.
                  </p>
                </div>
                
                {/* Timeline visual de ciudades con eventos */}
                <div className={styles.timelineSection}>
                  <h3 className={styles.subsectionTitle}>Progreso del Itinerario</h3>
                  <TripTimeline tripId={tripId} cities={trip.cities || []} showEvents={true} />
                </div>
                
                <div className={styles.eventsSection}>
                  <h3 className={styles.subsectionTitle}>Historial de Eventos</h3>
                  <TrackingEventsList tripId={tripId} />
                </div>
                
                <div className={styles.trackingInfo}>
                  <div className={styles.infoHeader}>
                    <Share2 size={18} />
                    <h3>Compartir Seguimiento</h3>
                  </div>
                  <p>
                    Utiliza el botón "Compartir" en la parte superior para generar un enlace que puedes enviar a tus familiares.
                    Ellos podrán ver el progreso de tu viaje sin necesidad de iniciar sesión.
                  </p>
                  {isAdmin && (
                    <div className={styles.shareAction}>
                      <ShareTripButton tripId={tripId} variant="inline" />
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Pestaña de Actualizaciones */}
            {activeTab === 'updates' && trip.updates && trip.updates.length > 0 && (
              <div className={styles.updatesTab}>
                <h2 className={styles.sectionTitle}>Actualizaciones</h2>
                <TripUpdates trip={trip} />
              </div>
            )}

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
        </div>

        <div className={styles.sidebar}>
          {isAdmin && (
            <button 
              onClick={() => setShowAddCity(true)}
              className={styles.tealButton}
            >
              <PlusCircle size={16} /> Agregar Ciudad
            </button>
          )}
          {isAdmin && (
            <button className={commonStyles.dangerButton}>
              <Trash size={16} /> Eliminar Viaje
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};
