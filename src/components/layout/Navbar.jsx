import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import commonStyles from '../../styles/common.module.css';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <Link to="/" className={styles.title}>
          <span>✈️</span> Travel Tracker
        </Link>
        {user && (
          <div className={styles.userInfo}>
            <span className={styles.userName}>Hola, {user.displayName}</span>
            <button 
              onClick={logout} 
              className={commonStyles.deleteButton}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
