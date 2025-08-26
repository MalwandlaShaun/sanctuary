// src/components/Router.jsx
import React, { useState, useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import AppContext from '../context/AppContext';

// Fetch functions for each endpoint - NOW WITH AUTHENTICATION
const fetchData = async (endpoint, token) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  // Add Authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`http://localhost:4000/${endpoint}`, {
    headers
  });
  
  if (!res.ok) {
    throw new Error(`Error fetching ${endpoint} data: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

const Router = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash.slice(1) || 'dashboard');
  const [auth, setAuth] = useState({
      isAuthenticated: !!localStorage.getItem('authToken'),
      token: localStorage.getItem('authToken') || null
  });

  const endpoints = [
      'dashboard',
      'users',
      'workers',
      'jobs',
      'reviews',
      'payments',
      'safetyAlerts',
  ];

  const queries = useQueries({
      queries: endpoints.map((endpoint) => ({
          queryKey: [endpoint, auth.token], // Include token in query key for cache invalidation
          queryFn: () => fetchData(endpoint, auth.token), // Pass token to fetchData
          enabled: auth.isAuthenticated, // Only fetch when authenticated
          retry: (failureCount, error) => {
            // Don't retry on 401 errors (authentication failures)
            if (error?.message?.includes('401')) {
              return false;
            }
            return failureCount < 3;
          }
      })),
  });

  const data = endpoints.reduce((acc, endpoint, index) => {
      const query = queries[index];
      acc[endpoint] = {
          data: query.data,
          isLoading: query.isLoading,
          error: query.error,
      };
      return acc;
  }, {});

// add data to the endpoints
  
  useEffect(() => {
      const handleHashChange = () => {
          setCurrentRoute(window.location.hash.slice(1) || 'dashboard');
      };

      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Verify token on mount
  useEffect(() => {
      const verifyToken = async () => {
          if (!auth.token) return;
          
          try {
              const response = await fetch('http://localhost:4000/verify-token', {
                  headers: { 
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                  }
              });
              if (!response.ok) {
                  console.log('Token verification failed');
                  localStorage.removeItem('authToken');
                  setAuth({ isAuthenticated: false, token: null });
              }
          } catch (error) {
              console.error('Token verification error:', error);
              localStorage.removeItem('authToken');
              setAuth({ isAuthenticated: false, token: null });
          }
      };
      
      verifyToken();
  }, [auth.token]);

  // Handle authentication errors from queries
  useEffect(() => {
    const hasAuthError = queries.some(query => 
      query.error?.message?.includes('401') || 
      query.error?.message?.includes('Unauthorized')
    );
    
    if (hasAuthError && auth.isAuthenticated) {
      console.log('Authentication error detected, logging out');
      localStorage.removeItem('authToken');
      setAuth({ isAuthenticated: false, token: null });
    }
  }, [queries, auth.isAuthenticated]);

  // Show loading only if authenticated and some queries are loading
  if (auth.isAuthenticated && queries.some((query) => query.isLoading)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading dashboard data...</div>
        </div>
      );
  }

  // Show error only if authenticated and there are non-auth errors
  const nonAuthError = queries.find((query) => 
    query.error && !query.error.message?.includes('401')
  )?.error;
  
  if (nonAuthError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">Error: {nonAuthError.message}</div>
        </div>
      );
  }

  return (
      <AppContext.Provider value={{ currentRoute, setCurrentRoute, data, auth, setAuth }}>
          {children}
      </AppContext.Provider>
  );
};

export default Router;