import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../hooks/useTrips';
import { Layout } from './layout/Layout';
import { LoginButton } from './auth/LoginButton';
import { TripList } from './trips/TripList';
import { TripForm } from './trips/TripForm';
import styles from './Home.module.css';
// Importamos iconos de Lucide
import { PlusCircle, MapPin, Globe } from 'lucide-react';
import commonStyles from '../styles/common.module.css';

export const Home = () => {
  const { user } = useAuth();
  const { trips } = useTrips();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleTripCreated = () => {
    setShowCreateForm(false);
  };

  return (
    <Layout>
      {!user ? (
        <div className={styles.heroSection}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Descubre el mundo con <span className={styles.brandName}>Travel Tracker</span></h1>
            <p className={styles.heroDescription}>
              Organiza tus viajes, registra tus aventuras y mantén un seguimiento de todos tus destinos favoritos.
            </p>
            <div className={styles.heroActions}>
              <LoginButton />
              <button className={styles.learnMoreButton}>Saber más</button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Viajes" />
          </div>
        </div>
      ) : (
        <div className={styles.dashboardContainer}>
          <div className={styles.dashboardHeader}>
            <div className={styles.dashboardHeaderContent}>
              <h1 className={styles.dashboardTitle}>
                <Globe size={24} className={styles.titleIcon} /> 
                Mis Viajes
              </h1>
              <p className={styles.dashboardSubtitle}>Organiza y planifica tus próximas aventuras</p>
            </div>
            <button 
              className={styles.createTripButton}
              onClick={() => setShowCreateForm(true)}
            >
              <span className={styles.buttonIcon}><PlusCircle size={16} /></span>
              <span>Nuevo Viaje</span>
            </button>
          </div>

          {trips.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>✈️</div>
              <h3 className={styles.emptyStateTitle}>No tienes viajes aún</h3>
              <p className={styles.emptyStateDescription}>Comienza creando tu primer viaje</p>
              <button 
                className={styles.createTripButton}
                onClick={() => setShowCreateForm(true)}
              >
                <span className={styles.buttonIcon}>+</span>
                <span>Crear mi primer viaje</span>
              </button>
            </div>
          ) : (
            <div className={styles.tripsContainer}>
              <TripList trips={trips} />
            </div>
          )}

          {showCreateForm && (
            <div className={styles.modalOverlay} onClick={() => setShowCreateForm(false)}>
              <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>Crear nuevo viaje</h2>
                  <button 
                    className={styles.closeButton}
                    onClick={() => setShowCreateForm(false)}
                    aria-label="Cerrar"
                  >
                    &times;
                  </button>
                </div>
                <div className={styles.modalBody}>
                  <TripForm onTripCreated={handleTripCreated} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};
