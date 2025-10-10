import React, { createContext, useContext } from 'react';
import useAuthStore from '../store/authStore';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { token, login: setToken, logout: clearToken } = useAuthStore();

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    clearToken();
  };

  const getUser = () => {
    if (!token) return null;
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Invalid token:', error);
      logout();
      return null;
    }
  };

  const value = {
    token,
    login,
    logout,
    user: getUser(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};