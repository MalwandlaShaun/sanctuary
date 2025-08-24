// src/components/Navigation.jsx
import React, { useContext } from 'react'; // Add useContext import
import {
    Users,
    Briefcase,
    DollarSign,
    BarChart3,
    Settings,
    Shield,
    Star,
    UserCheck,
    Home,
} from 'lucide-react';
import AppContext from '../context/AppContext';

// Navigation Component
const Navigation = () => {
    const { currentRoute } = useContext(AppContext); // Use useContext to access AppContext

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'workers', label: 'Workers', icon: UserCheck },
        { id: 'jobs', label: 'Job Management', icon: Briefcase },
        { id: 'payments', label: 'Payments', icon: DollarSign },
        { id: 'reviews', label: 'Reviews', icon: Star },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'safety', label: 'Safety Center', icon: Shield },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <nav className="bg-gradient-to-b from-blue-600 to-purple-700 text-white w-64 min-h-screen">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <Shield className="text-2xl" />
                    <h1 className="text-xl font-bold">Sanctuary Admin</h1>
                </div>

                <div className="space-y-1">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    currentRoute === item.id
                                        ? 'bg-white bg-opacity-20 text-white'
                                        : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
                                }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;