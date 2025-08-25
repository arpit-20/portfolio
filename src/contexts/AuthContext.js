import { createContext, useState, useContext, useEffect } from 'react';
import { getUserFromToken } from '../utils/authMiddleware';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        // Verify and decode the token
        const userData = getUserFromToken(storedToken);
        if (userData) {
          // If token is valid, set user and token
          setUser(userData);
          setToken(storedToken);
        } else {
          // If token is invalid or expired, remove it
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Failed to parse stored token', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      // Make API call to login endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const userData = await response.json();
      
      // Extract token from response
      const { token: authToken, ...userWithoutToken } = userData;
      
      // Save token to localStorage
      localStorage.setItem('token', authToken);
      
      // Save user data to state
      setUser(userWithoutToken);
      setToken(authToken);
      
      return userWithoutToken;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };
  
  // Get auth header for API requests
  const getAuthHeader = () => {
    if (token) {
      return {
        Authorization: `Bearer ${token}`
      };
    }
    return {};
  };
  
  // Check if user is admin
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    getAuthHeader,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}