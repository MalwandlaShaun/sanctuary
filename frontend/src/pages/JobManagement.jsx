import React, { useContext } from 'react';
import {
    Briefcase,
  
} from 'lucide-react';
import AppContext from '../context/AppContext';
import StatCard from '../components/StatCard';



// Job Management Component
const JobManagement = () => {
    const { data } = useContext(AppContext);

    if(!data){
        return <div>Error: AppContext is not available. Ensure Dashboard is wrapped in Router.</div>;
    }
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="text-blue-500" />
                    Job Management
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Jobs" value="8,642" subtitle="All time jobs posted" color="blue" />
                    <StatCard title="Completed Jobs" value="5,621" subtitle="65% completion rate" color="green" />
                    <StatCard title="Active Jobs" value="1,234" subtitle="Currently in progress" color="yellow" />
                    <StatCard title="Disputed Jobs" value="87" subtitle="Requires resolution" color="red" />
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by job ID, customer, or worker..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>All Status</option>
                        <option>Completed</option>
                        <option>In Progress</option>
                        <option>Disputed</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>All Categories</option>
                        <option>House Cleaning</option>
                        <option>Garden Maintenance</option>
                    </select>
                    <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.jobs.map(job => (
                        <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.customer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.worker}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.service}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{job.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      job.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {job.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                                    <button className="text-green-600 hover:text-green-900">Track</button>
                                    <button className="text-orange-600 hover:text-orange-900">Contact</button>
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

export default JobManagement;