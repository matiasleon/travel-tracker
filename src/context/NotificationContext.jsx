import React, { createContext, useContext, useState, useCallback } from 'react';

// Tipos de notificaciones
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

// Crear el contexto
const NotificationContext = createContext();

// Hook personalizado para usar el contexto
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe usarse dentro de un NotificationProvider');
  }
  return context;
};

// Proveedor del contexto
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Añadir una nueva notificación
  const addNotification = useCallback((message, type = NOTIFICATION_TYPES.INFO, duration = 3000) => {
    const id = Date.now().toString();
    
    // Añadir la notificación al estado
    setNotifications(prev => [...prev, { id, message, type, duration }]);
    
    // Eliminar automáticamente después de la duración especificada
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    
    return id;
  }, []);

  // Eliminar una notificación por ID
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Métodos de conveniencia para diferentes tipos de notificaciones
  const showSuccess = useCallback((message, duration) => 
    addNotification(message, NOTIFICATION_TYPES.SUCCESS, duration), [addNotification]);
  
  const showError = useCallback((message, duration) => 
    addNotification(message, NOTIFICATION_TYPES.ERROR, duration), [addNotification]);
  
  const showInfo = useCallback((message, duration) => 
    addNotification(message, NOTIFICATION_TYPES.INFO, duration), [addNotification]);
  
  const showWarning = useCallback((message, duration) => 
    addNotification(message, NOTIFICATION_TYPES.WARNING, duration), [addNotification]);

  // Valor del contexto
  const value = {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
