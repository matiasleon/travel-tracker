import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../hooks/useTrips';
import { LoginButton } from './auth/LoginButton';
import { TripForm } from './trips/TripForm';
import { TripList } from './trips/TripList';
import { Layout } from './layout/Layout';
import styles from './Home.module.css';
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
        <div className={styles.welcomeContainer}>
          <h2 className={styles.welcomeText}>Bienvenido a Travel Tracker</h2>
          <p className={styles.welcomeDescription}>
            Organiza tus viajes y mantén un registro de todas tus aventuras
          </p>
          <LoginButton />
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <button 
            onClick={() => setShowCreateForm(true)}
            className={styles.fab}
          >
            +
          </button>

          <div className={styles.content}>
            <TripList />
          </div>

          {showCreateForm && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                  <h2>Crear Nuevo Viaje</h2>
                  <button 
                    onClick={() => setShowCreateForm(false)}
                    className={styles.closeButton}
                  >
                    ✕
                  </button>
                </div>
                <TripForm onSuccess={handleTripCreated} />
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};
