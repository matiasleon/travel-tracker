import React from 'react';
import { Navbar } from './Navbar';
import styles from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};
