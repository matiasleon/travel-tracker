import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTrips } from '../../hooks/useTrips';
import { TripSummary } from '../trips/TripSummary';
import { TripTimeline } from '../trips/TripTimeline';
import TrackingEventsList from '../tracking/TrackingEventsList';
import { ACTIVITY_STATUS, CITY_STATUS, TRIP_STATUS, getStatusText } from '../../constants/statusTypes';
import { Calendar, MapPin, Check, Clock, MessageSquare, Activity } from 'lucide-react';
import styles from './SharedTripView.module.css';

export const SharedTripView = () => {
  const { tripId } = useParams();
  const location = useLocation();
  const { trips } = useTrips();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');
  const [updates, setUpdates] = useState([]);
  
  // Verificar si hay un parámetro tab en la URL para establecer la pestaña activa
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && ['summary', 'cities', 'updates', 'tracking'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  useEffect(() => {
    // Simular carga de datos
    setLoading(true);
    
    // Buscar el viaje por ID
    const foundTrip = trips.find(t => t.id === tripId);
    
    if (foundTrip) {
      setTrip(foundTrip);
      
      // Generar actualizaciones simuladas basadas en el estado actual del viaje
      const simulatedUpdates = generateUpdates(foundTrip);
      setUpdates(simulatedUpdates);
    }
    
    setLoading(false);
  }, [tripId, trips]);

  // Función para generar actualizaciones simuladas basadas en el estado del viaje
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
        icon: <MapPin size={16} />
      });
      
      // Actualizaciones de actividades por ciudad
      if (city.activities && city.activities.length > 0) {
        city.activities.forEach((activity, index) => {
          updates.push({
            id: `update-activity-${city.id}-${index}`,
            type: 'ACTIVITY_STATUS',
            date: new Date(city.startDate).toISOString(),
            content: `Actividad "${activity.name}" en ${city.name}: ${getStatusText(activity.status || 'planned', 'activity')}`,
            icon: <Check size={16} />
          });
        });
      }
    });
    
    // Ordenar actualizaciones por fecha (más recientes primero)
    return updates.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  if (loading) {
    return <div className={styles.loading}>Cargando información del viaje...</div>;
  }

  if (!trip) {
    return <div className={styles.notFound}>El viaje solicitado no existe o no está disponible.</div>;
  }

  return (
    <div className={styles.sharedTripContainer}>
      <div className={styles.header}>
        <div className={styles.tripInfo}>
          <h1 className={styles.tripName}>{trip.name}</h1>
          <p className={styles.tripDestination}>{trip.destination}</p>
          <p className={styles.tripDates}>
            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.tripImage}>
          {trip.imageUrl && <img src={trip.imageUrl} alt={trip.name} />}
        </div>
      </div>
      
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'summary' ? styles.active : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            <Calendar size={16} /> Resumen
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'cities' ? styles.active : ''}`}
            onClick={() => setActiveTab('cities')}
          >
            <MapPin size={16} /> Ciudades
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'tracking' ? styles.active : ''}`}
            onClick={() => setActiveTab('tracking')}
          >
            <Activity size={16} /> Seguimiento
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'updates' ? styles.active : ''}`}
            onClick={() => setActiveTab('updates')}
          >
            <Clock size={16} /> Actualizaciones
          </button>
        </div>
        
        <div className={styles.tabContent}>
          {activeTab === 'summary' && (
            <div className={styles.summaryTab}>
              <TripSummary trip={trip} />
              <div className={styles.tripNotes}>
                <h3>Notas del viaje</h3>
                <p>{trip.notes || 'No hay notas disponibles para este viaje.'}</p>
              </div>
              <div className={styles.tripTimeline}>
                <h3>Cronología de ciudades</h3>
                <TripTimeline cities={trip.cities} />
              </div>
            </div>
          )}
          
          {activeTab === 'cities' && (
            <div className={styles.citiesTab}>
              <h2>Ciudades del viaje</h2>
              <div className={styles.citiesList}>
                {trip.cities.map(city => (
                  <div key={city.id} className={styles.cityCard}>
                    <div className={styles.cityHeader}>
                      <h3 className={styles.cityName}>{city.name}</h3>
                      <span className={`${styles.cityStatus} ${styles[city.status]}`}>
                        {getStatusText(city.status, 'city')}
                      </span>
                    </div>
                    <div className={styles.cityDates}>
                      <span className={styles.dateLabel}>Desde:</span> {new Date(city.startDate).toLocaleDateString()}
                      <span className={styles.dateLabel}>Hasta:</span> {new Date(city.endDate).toLocaleDateString()}
                    </div>
                    
                    {city.observations && (
                      <div className={styles.cityObservations}>
                        <h4>Observaciones</h4>
                        <p>{city.observations}</p>
                      </div>
                    )}
                    
                    <div className={styles.cityActivities}>
                      <h4>Actividades</h4>
                      {city.activities && city.activities.length > 0 ? (
                        <ul className={styles.activitiesList}>
                          {city.activities.map((activity, index) => (
                            <li 
                              key={index} 
                              className={`${styles.activityItem} ${activity.status === ACTIVITY_STATUS.COMPLETED ? styles.completed : ''}`}
                            >
                              <span className={styles.activityName}>{activity.name}</span>
                              <span className={styles.activityStatus}>
                                {getStatusText(activity.status || 'planned', 'activity')}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className={styles.noActivities}>No hay actividades planeadas para esta ciudad.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'tracking' && (
            <div className={styles.trackingTab}>
              <div className={styles.trackingHeader}>
                <h2>Seguimiento del Viaje</h2>
                <p className={styles.trackingDescription}>
                  Aquí puedes ver el progreso del viaje y los últimos eventos registrados.
                </p>
              </div>
              
              <div className={styles.timelineSection}>
                <h3 className={styles.sectionTitle}>Progreso del Itinerario</h3>
                <TripTimeline tripId={tripId} cities={trip.cities || []} showEvents={true} />
              </div>
              
              <div className={styles.eventsSection}>
                <h3 className={styles.sectionTitle}>Historial de Eventos</h3>
                <TrackingEventsList tripId={tripId} />
              </div>
              
              <div className={styles.tripStatusCard}>
                <div className={styles.statusHeader}>
                  <h3>Estado actual del viaje</h3>
                </div>
                <div className={styles.statusContent}>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Estado:</span>
                    <span className={`${styles.statusValue} ${styles[trip.status]}`}>
                      {getStatusText(trip.status, 'trip')}
                    </span>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Ciudades visitadas:</span>
                    <span className={styles.statusValue}>
                      {trip.cities?.filter(city => city.status === CITY_STATUS.COMPLETED).length || 0}/{trip.cities?.length || 0}
                    </span>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Actividades completadas:</span>
                    <span className={styles.statusValue}>
                      {trip.cities?.reduce((total, city) => 
                        total + (city.activities?.filter(act => act.status === ACTIVITY_STATUS.COMPLETED).length || 0), 0)}/
                      {trip.cities?.reduce((total, city) => 
                        total + (city.activities?.length || 0), 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'updates' && (
            <div className={styles.updatesTab}>
              <h2>Actualizaciones del viaje</h2>
              <div className={styles.updatesList}>
                {updates.length > 0 ? (
                  updates.map(update => (
                    <div key={update.id} className={styles.updateItem}>
                      <div className={styles.updateIcon}>
                        {update.icon}
                      </div>
                      <div className={styles.updateContent}>
                        <span className={styles.updateDate}>
                          {new Date(update.date).toLocaleString()}
                        </span>
                        <p className={styles.updateText}>{update.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.noUpdates}>No hay actualizaciones disponibles para este viaje.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.footer}>
        <p className={styles.sharedInfo}>
          Esta información se actualiza automáticamente cuando el organizador del viaje realiza cambios.
        </p>
      </div>
    </div>
  );
};
