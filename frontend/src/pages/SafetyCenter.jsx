import React, { createContext, useContext } from 'react';
import {Shield,AlertTriangle} from 'lucide-react';
import StatCard from '../components/StatCard';
import AppContext from '../context/AppContext';


// Safety Center Component
const SafetyCenter = () => {
    const { data } = useContext(AppContext);
if(!data){
    return <div>Error: AppContext is not available. Ensure Dashboard is wrapped in Router.</div>;

}
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="text-blue-500" />
                    Safety Center
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="High Priority Alerts" value="3" subtitle="Immediate attention required" color="red" />
                    <StatCard title="Medium Priority" value="12" subtitle="Review within 24 hours" color="yellow" />
                    <StatCard title="Background Checks" value="156" subtitle="Completed this month" color="blue" />
                    <StatCard title="Safety Score" value="98.7%" subtitle="Platform safety rating" color="green" />
                </div>
            </div>

            <div className="space-y-4 mb-6">
                {data.safetyAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'Emergency Alert' ? 'bg-red-50 border-red-500' :
                            alert.type === 'Safety Violation' ? 'bg-yellow-50 border-yellow-500' :
                                'bg-green-50 border-green-500'
                    }`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle size={20} className={
                                        alert.type === 'Emergency Alert' ? 'text-red-600' :
                                            alert.type === 'Safety Violation' ? 'text-yellow-600' :
                                                'text-green-600'
                                    } />
                                    <h3 className="font-semibold">{alert.type}:</h3>
                                </div>
                                <p className="text-gray-700 mb-2">{alert.message}</p>
                                {alert.location && <p className="text-sm text-gray-600">Location: {alert.location}</p>}
                                {alert.incident && <p className="text-sm text-gray-600">Incident Report {alert.incident} - Filed: 2024-08-22</p>}
                            </div>
                            <div className="flex gap-2">
                                {alert.type === 'Emergency Alert' && (
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                        Emergency Response
                                    </button>
                                )}
                                {alert.type === 'Safety Violation' && (
                                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                                        Investigate
                                    </button>
                                )}
                                {alert.type === 'Background Check Complete' && (
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                        Approve
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Safety Incident Reporting</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Safety Violation</option>
                        <option>Emergency</option>
                        <option>Theft</option>
                        <option>Property Damage</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>High - Immediate</option>
                        <option>Medium - 24 hours</option>
                        <option>Low - Review</option>
                    </select>
                    <input type="text" placeholder="User ID or name" className="px-4 py-2 border border-gray-300 rounded-lg" />
                    <input type="text" placeholder="Job ID (if applicable)" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>

                <textarea
                    placeholder="Detailed description of the incident..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
                />

                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Create Incident Report
                </button>
            </div>
        </div>
    );
};

export default SafetyCenter;