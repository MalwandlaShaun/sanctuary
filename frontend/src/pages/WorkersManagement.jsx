import React, { createContext, useContext } from 'react';
import {Star, UserCheck,} from 'lucide-react';
import AppContext from '../context/AppContext';
import StatCard from '../components/StatCard';




// Workers Management Component
const WorkersManagement = () => {
    const { data } = useContext(AppContext);

    if(!data){
        return <div>Error: AppContext is not available. Ensure Dashboard is wrapped in Router.</div>;

    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <UserCheck className="text-blue-500" />
                    Workers Management
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Active Workers" value="1,234" subtitle="Currently available" color="blue" />
                    <StatCard title="Verified Workers" value="1,089" subtitle="88% verification rate" color="green" />
                    <StatCard title="Pending Applications" value="145" subtitle="Awaiting review" color="yellow" />
                    <StatCard title="Top Rated Workers" value="456" subtitle="4.5+ star rating" color="green" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Worker Profile & Skills Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <input type="text" placeholder="Full name" className="px-4 py-2 border rounded-lg" />
                    <input type="email" placeholder="worker@email.com" className="px-4 py-2 border rounded-lg" />
                    <input type="tel" placeholder="+27 XX XXX XXXX" className="px-4 py-2 border rounded-lg" />
                    <input type="text" placeholder="Coverage area" className="px-4 py-2 border rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <select className="px-4 py-2 border rounded-lg">
                        <option>House Cleaning</option>
                        <option>Garden Maintenance</option>
                        <option>Plumbing</option>
                        <option>Electrical Work</option>
                        <option>Painting</option>
                    </select>
                    <input type="number" placeholder="150.00" className="px-4 py-2 border rounded-lg" />
                    <select className="px-4 py-2 border rounded-lg">
                        <option>Beginner (0-1 years)</option>
                        <option>Intermediate (2-5 years)</option>
                        <option>Expert (5+ years)</option>
                    </select>
                    <select className="px-4 py-2 border rounded-lg">
                        <option>Completed - Clear</option>
                        <option>Pending Review</option>
                        <option>Failed</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skills</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jobs Completed</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Earnings (Month)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.workers.map(worker => (
                        <tr key={worker.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{worker.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{worker.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{worker.skills}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < Math.floor(worker.rating) ? 'currentColor' : 'none'} />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">{worker.rating}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{worker.jobsCompleted}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{worker.earnings.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {worker.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-900">Profile</button>
                                    <button className="text-green-600 hover:text-green-900">Edit</button>
                                    <button className="text-orange-600 hover:text-orange-900">Promote</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkersManagement;