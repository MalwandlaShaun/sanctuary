// src/components/Router.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import AppContext from '../context/AppContext';

// Fetch functions for each endpoint - NOW WITH AUTHENTICATION
const fetchData = async (endpoint, token) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`https://r2bnik9np0.execute-api.eu-west-1.amazonaws.com/dev/${endpoint}`, {
    headers,
  });
  
  if (!res.ok) {
    throw new Error(`Error fetching ${endpoint} data: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

// Function to update data on the backend
const updateData = async (endpoint, token, updatedData, id) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`http://localhost:4000/${endpoint}/${id}`, {
    method: 'PUT', // or 'PATCH' depending on your backend API
    headers,
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    throw new Error(`Error updating ${endpoint} data: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

const Router = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash.slice(1) || 'dashboard');
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem('authToken'),
    token: localStorage.getItem('authToken') || null,
  });
  const [data, setDataState] = useState({}); // Manage data state

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
      queryKey: [endpoint, auth.token],
      queryFn: () => fetchData(endpoint, auth.token),
      enabled: auth.isAuthenticated,
      retry: (failureCount, error) => {
        if (error?.message?.includes('401')) {
          return false;
        }
        return failureCount < 3;
      },
      // Removed onSuccess - it's deprecated and causes issues
    })),
  });

  // Extract query states to stable values for dependency tracking
  const queryStates = useMemo(() => {
    return queries.map(query => ({
      data: query.data,
      isLoading: query.isLoading,
      error: query.error,
      status: query.status
    }));
  }, [queries.map(q => q.status).join(','), queries.map(q => q.dataUpdatedAt).join(',')]);

  // Update data state when queries change
  useEffect(() => {
    const newData = {};
    
    endpoints.forEach((endpoint, index) => {
      const queryState = queryStates[index];
      newData[endpoint] = {
        data: queryState.data || null,
        isLoading: queryState.isLoading,
        error: queryState.error,
      };
    });
    
    setDataState(newData);
    console.log('Updated data state:', newData);
  }, [queryStates]); // Now depends on stable queryStates

  // Implement setData function
  const setData = async (newData, options = {}) => {
    // Optimistically update local state
    setDataState((prev) => ({
      ...prev,
      ...newData,
    }));

    // If this is just a local update (no backend sync needed), return early
    if (options.localOnly) {
      return;
    }

    // Update backend for specific modified items
    if (options.updatedItem && options.endpoint) {
      try {
        await updateData(options.endpoint, auth.token, options.updatedItem, options.updatedItem.id);
        console.log(`Successfully updated ${options.endpoint} item:`, options.updatedItem.id);
      } catch (error) {
        console.error(`Failed to update ${options.endpoint} on backend:`, error);
        // Revert optimistic update on error
        setDataState((prev) => ({
          ...prev,
          [options.endpoint]: {
            ...prev[options.endpoint],
            error: error.message,
          },
        }));
      }
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.slice(1) || 'dashboard');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      if (!auth.token) return;
      
      try {
        const response = await fetch('http://localhost:4000/verify-token', {
          headers: { 
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
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

  useEffect(() => {
    const hasAuthError = queryStates.some(queryState => 
      queryState.error?.message?.includes('401') || 
      queryState.error?.message?.includes('Unauthorized')
    );
    
    if (hasAuthError && auth.isAuthenticated) {
      console.log('Authentication error detected, logging out');
      localStorage.removeItem('authToken');
      setAuth({ isAuthenticated: false, token: null });
    }
  }, [queryStates, auth.isAuthenticated]);

  if (auth.isAuthenticated && queryStates.some((queryState) => queryState.isLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  const nonAuthError = queryStates.find((queryState) => 
    queryState.error && !queryState.error.message?.includes('401')
  )?.error;
  
  if (nonAuthError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {nonAuthError.message}</div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ currentRoute, setCurrentRoute, data, setData, auth, setAuth }}>
      {/* {console.log('Context value provided:', { data })} */}
      {children}
    </AppContext.Provider>
  );
};

export default Router;