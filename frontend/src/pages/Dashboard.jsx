import React, { createContext, useContext } from 'react';
import {
    Users,
    Briefcase,
    DollarSign,
    
    UserCheck,
   
} from 'lucide-react';
import AppContext from '../context/AppContext';
import StatCard from '../components/StatCard';

// Global Context for app state
// const context = useContext(AppContext);

// // Check if context is undefined
// if (!context) {
//     return <div>Error: AppContext is not available. Ensure App is wrapped in Router.</div>;
// }

// Dashboard Component
const Dashboard = () => {
    const context = useContext(AppContext);

    // Check if context is undefined
    if (!context) {
        return <div>Error: AppContext is not available. Ensure Dashboard is wrapped in Router.</div>;
    }

    const { data } = useContext(AppContext);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
                <p className="text-gray-600">Complete platform management system</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Users"
                    value="2,847"
                    subtitle="+12% from last month"
                    color="blue"
                    icon={Users}
                />
                <StatCard
                    title="Active Workers"
                    value="1,234"
                    subtitle="Currently available"
                    color="green"
                    icon={UserCheck}
                />
                <StatCard
                    title="Completed Jobs"
                    value="5,621"
                    subtitle="65% completion rate"
                    color="yellow"
                    icon={Briefcase}
                />
                <StatCard
                    title="Total Revenue"
                    value="R847k"
                    subtitle="Platform commission earned"
                    color="green"
                    icon={DollarSign}
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                        <span>New worker registration: John Smith</span>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span>Job completed: House Cleaning</span>
                        <span className="text-sm text-gray-500">3 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span>Payment processed: R420</span>
                        <span className="text-sm text-gray-500">5 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;