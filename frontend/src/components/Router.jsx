// src/components/Router.jsx
import React, { useState } from 'react';
import AppContext from '../context/AppContext';
import mockData from '../data/mockData';


const Router = ({ children }) => {
    const [currentRoute, setCurrentRoute] = useState(window.location.hash.slice(1) || 'dashboard');

    React.useEffect(() => {
        const handleHashChange = () => {
            setCurrentRoute(window.location.hash.slice(1) || 'dashboard');
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <AppContext.Provider value={{ currentRoute, setCurrentRoute, data: mockData }}>
            {children}
        </AppContext.Provider>
    );
};

export default Router;