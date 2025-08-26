import React, { useContext, useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import AppContext from '../context/AppContext';
import StatCard from '../components/StatCard';

const JobManagement = () => {
    const { data, setData } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [dateFilter, setDateFilter] = useState('');
    const [filteredJobs, setFilteredJobs] = useState(data?.jobs.data || []);
    const [viewModal, setViewModal] = useState({ open: false, job: null });
    const [trackModal, setTrackModal] = useState({ open: false, job: null });
    const [contactModal, setContactModal] = useState({ open: false, job: null });
    const [trackForm, setTrackForm] = useState({ status: '' });
    const [contactForm, setContactForm] = useState({ recipient: '', message: '' });

    // Update filtered jobs when search or filters change
    useEffect(() => {
        if (!data?.jobs) return;

        let result = data.jobs.data;

        if (searchQuery) {
            result = result.filter(job =>
                job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.worker.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== 'All Status') {
            result = result.filter(job => job.status === statusFilter.toUpperCase());
        }

        if (categoryFilter !== 'All Categories') {
            result = result.filter(job => job.service === categoryFilter);
        }

        if (dateFilter) {
            result = result.filter(job => job.date === dateFilter);
        }

        setFilteredJobs(result);
    }, [searchQuery, statusFilter, categoryFilter, dateFilter, data]);

    // Handle View Details action
    const handleView = (job) => {
        setViewModal({ open: true, job });
    };

    // Handle Track action
    const handleTrack = (job) => {
        setTrackModal({ open: true, job });
        setTrackForm({ status: job.status });
    };

    // Handle Contact action
    const handleContact = (job) => {
        setContactModal({ open: true, job });
        setContactForm({ recipient: 'customer', message: '' });
    };

    // Handle Track form submission
    const handleTrackSubmit = () => {
        const updatedJobs = data.jobs.map(job =>
            job.id === trackModal.job.id ? { ...job, status: trackForm.status } : job
        );
        setData({ ...data, jobs: updatedJobs });
        setTrackModal({ open: false, job: null });
    };

    // Handle Contact form submission
    const handleContactSubmit = () => {
        // In a real app, this would send a message to the selected recipient
        console.log(`Sending message to ${contactForm.recipient} for job ${contactModal.job.id}: ${contactForm.message}`);
        setContactModal({ open: false, job: null });
        setContactForm({ recipient: '', message: '' });
    };

    if (!data) {
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>COMPLETED</option>
                        <option>IN PROGRESS</option>
                        <option>DISPUTED</option>
                    </select>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option>All Categories</option>
                        <option>House Cleaning</option>
                        <option>Garden Maintenance</option>
                    </select>
                    <input
                        type="date"
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
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
                        {filteredJobs.map(job => (
                            <tr key={job.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.customer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.worker}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{job.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        job.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                        job.status === 'IN PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                        <button
                                            className="text-blue-600 hover:text-blue-900"
                                            onClick={() => handleView(job)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="text-green-600 hover:text-green-900"
                                            onClick={() => handleTrack(job)}
                                        >
                                            Track
                                        </button>
                                        <button
                                            className="text-orange-600 hover:text-orange-900"
                                            onClick={() => handleContact(job)}
                                        >
                                            Contact
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Details Modal */}
            {viewModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Job Details</h2>
                        <div className="space-y-2">
                            <p><strong>Job ID:</strong> {viewModal.job.id}</p>
                            <p><strong>Customer:</strong> {viewModal.job.customer}</p>
                            <p><strong>Worker:</strong> {viewModal.job.worker}</p>
                            <p><strong>Service:</strong> {viewModal.job.service}</p>
                            <p><strong>Amount:</strong> R{viewModal.job.amount.toFixed(2)}</p>
                            <p><strong>Status:</strong> {viewModal.job.status}</p>
                            <p><strong>Date:</strong> {viewModal.job.date}</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setViewModal({ open: false, job: null })}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Track Modal */}
            {trackModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Track Job</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700">Job ID: {trackModal.job.id}</p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Update Status</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={trackForm.status}
                                    onChange={(e) => setTrackForm({ status: e.target.value })}
                                >
                                    <option>COMPLETED</option>
                                    <option>IN PROGRESS</option>
                                    <option>DISPUTED</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setTrackModal({ open: false, job: null })}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                onClick={handleTrackSubmit}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {contactModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Contact</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700">Job ID: {contactModal.job.id}</p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Recipient</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={contactForm.recipient}
                                    onChange={(e) => setContactForm({ ...contactForm, recipient: e.target.value })}
                                >
                                    <option value="customer">Customer ({contactModal.job.customer})</option>
                                    <option value="worker">Worker ({contactModal.job.worker})</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    placeholder="Enter your message..."
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setContactModal({ open: false, job: null })}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                onClick={handleContactSubmit}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobManagement;