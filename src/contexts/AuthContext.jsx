import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  name: 'Priya Singh',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
  role: 'user', // 'user' or 'admin'
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  city: 'New Delhi',
  emergencyPin: '1234',
  createdDate: '2026-01-15'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nariraksha_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('nariraksha_auth');
    return savedAuth ? JSON.parse(savedAuth) : true; // Default logged in for smooth demo experience
  });

  useEffect(() => {
    localStorage.setItem('nariraksha_user', JSON.stringify(user));
    localStorage.setItem('nariraksha_auth', JSON.stringify(isAuthenticated));
  }, [user, isAuthenticated]);

  const login = (email, password, role = 'user') => {
    const nameFromEmail = email.split('@')[0] || 'User';
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    const loggedUser = {
      ...DEFAULT_USER,
      email,
      name: formattedName,
      role: role
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    return { success: true, user: loggedUser };
  };

  const signup = (userData) => {
    const newUser = {
      ...DEFAULT_USER,
      ...userData,
      role: 'user',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
