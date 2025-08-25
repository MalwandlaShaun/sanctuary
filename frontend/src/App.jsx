// src/App.jsx
import React, { useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import Header from './components/Header';
import AppContext from './context/AppContext';
import Router from './components/Router';
import ErrorBoundary from './components/ErrorBoundary';
// Global Context for app state
import Dashboard from './pages/Dashboard';
import UsersManagement from './pages/UsersManagement';
import WorkersManagement from './pages/WorkersManagement';
import JobManagement from './pages/JobManagement';
import PaymentManagement from './pages/PaymentManagement';
import ReviewsRatings from './pages/ReviewsRatings';
import ReportsAnalytics from './pages/ReportsAnalytics';
import SafetyCenter from './pages/SafetyCenter';
import SettingsComponent from './pages/Settings';
import CustomerFocus from './pages/CustomerFocus';

const queryClient = new QueryClient();

// Main App Component
const App = () => {
    const context = useContext(AppContext);

    // Check if context is undefined
    if (!context) {
        return <div>Error: AppContext is not available. Ensure App is wrapped in Router.</div>;
    }

    const { currentRoute } = context;
    const renderPage = () => {
        switch(currentRoute) {
            case 'dashboard': return <Dashboard />;
            case 'users': return <UsersManagement />;
            case 'workers': return <WorkersManagement />;
            case 'jobs': return <JobManagement />;
            case 'payments': return <PaymentManagement />;
            case 'reviews': return <ReviewsRatings />;
            case 'reports': return <ReportsAnalytics />;
            case 'safety': return <SafetyCenter />;
            case 'settings': return <SettingsComponent/>;
            case 'customers': return <CustomerFocus />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <ErrorBoundary>
                <Navigation />
            </ErrorBoundary>
            <div className="flex-1">
                <Header />
                <main>
                    <ErrorBoundary>{renderPage()}</ErrorBoundary>
                </main>
            </div>
        </div>
    );
};

// Root Component with Router
export default function SanctuaryAdminCMS() {
    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
                <Router>
                    <App />
                </Router>
            </ErrorBoundary>
        </QueryClientProvider>
    );
}