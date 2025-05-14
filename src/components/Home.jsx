import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginButton } from './auth/LoginButton';
import { TripForm } from './trips/TripForm';
import { TripList } from './trips/TripList';
import { Layout } from './layout/Layout';
import styles from './Home.module.css';
import commonStyles from '../styles/common.module.css';

export const Home = () => {
  const { user } = useAuth();

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
          <div className={commonStyles.contentGrid}>
            {/* Sidebar - Create Trip Form */}
            <div className={`${commonStyles.pageContainer} ${styles.formContainer}`}>
              <h2 className={styles.sidebarTitle}>Crear Nuevo Viaje</h2>
              <TripForm />
            </div>

            {/* Main Content - Trip List */}
            <div className={`${commonStyles.pageContainer} ${styles.tripListContainer}`}>
              <TripList />
            </div>
          </div>
        )}
    </Layout>
  );
};
