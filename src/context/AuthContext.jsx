import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Usuario mock siempre autenticado
  const mockUser = {
    uid: 'mock-user-id',
    email: 'usuario@ejemplo.com',
    displayName: 'Usuario de Prueba'
  };

  const [user] = useState(mockUser);
  const [loading] = useState(false);

  const login = () => {
    // Login deshabilitado - usando usuario mock
  };

  const logout = () => {
    // Logout deshabilitado - usando usuario mock
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
