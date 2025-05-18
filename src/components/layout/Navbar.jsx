import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>✈️</span>
              <span className={styles.logoText}>Travel Tracker</span>
            </div>
          </Link>
        </div>

        <div className={styles.navContainer}>
          {user && (
            <>
              <div className={styles.desktopNav}>
                <div className={styles.navLinks}>
                  <Link to="/" className={styles.navLink}>Inicio</Link>
                  <Link to="/" className={styles.navLink}>Mis Viajes</Link>
                </div>
                <div className={styles.userSection}>
                  <div className={styles.userInfo}>
                    <span className={styles.greeting}>Hola, </span>
                    <span className={styles.userName}>{user.displayName || 'Usuario de Prueba'}</span>
                  </div>
                  <button 
                    onClick={logout} 
                    className={styles.logoutButton}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>

              <div className={styles.mobileNav}>
                <button 
                  className={styles.menuButton} 
                  onClick={toggleMenu}
                  aria-label="Menú"
                >
                  <span className={styles.menuIcon}></span>
                </button>
                {isMenuOpen && (
                  <div className={styles.mobileMenu}>
                    <div className={styles.mobileMenuLinks}>
                      <Link to="/" className={styles.mobileNavLink}>Inicio</Link>
                      <Link to="/" className={styles.mobileNavLink}>Mis Viajes</Link>
                      <button 
                        onClick={logout} 
                        className={styles.mobileLogoutButton}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
