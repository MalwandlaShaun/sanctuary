// src/components/Router.jsx
import React, { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import AppContext from '../context/AppContext';

// Fetch functions for each endpoint
const fetchData = async (endpoint) => {
  const res = await fetch(`http://localhost:4000/${endpoint}`);
  if (!res.ok) throw new Error(`Error fetching ${endpoint} data`);
  return res.json();
};

// Define all endpoints
const endpoints = [
  'dashboard',
  'users',
  'workers',
  'jobs',
  'reviews',
  'payments',
  'safetyAlerts',
];

const Router = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash.slice(1) || 'dashboard');

  // Use useQueries to fetch data from all endpoints
  const queries = useQueries({
    queries: endpoints.map((endpoint) => ({
      queryKey: [endpoint],
      queryFn: () => fetchData(endpoint),
    })),
  });

  // Combine query results into a single data object
  const data = endpoints.reduce((acc, endpoint, index) => {
    const query = queries[index];
    acc[endpoint] = {
      data: query.data,
      isLoading: query.isLoading,
      error: query.error,
    };
    return acc;
  }, {});

  // Handle loading and error states
  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error)?.error;

  // Always call useEffect, regardless of loading or error state
  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.slice(1) || 'dashboard');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Move conditional rendering after all hooks
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <AppContext.Provider value={{ currentRoute, setCurrentRoute, data }}>
      {children}
    </AppContext.Provider>
  );
};

export default Router;