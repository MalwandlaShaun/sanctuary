import React, { useContext, useState, useEffect } from 'react';
import { Star, UserCheck } from 'lucide-react';
import AppContext from '../context/AppContext';
import StatCard from '../components/StatCard';

const WorkersManagement = () => {
    const { data, setData } = useContext(AppContext);
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchCoverage, setSearchCoverage] = useState('');
    const [skillFilter, setSkillFilter] = useState('All Skills');
    const [experienceFilter, setExperienceFilter] = useState('All Experience');
    const [backgroundFilter, setBackgroundFilter] = useState('All Background');
    const [filteredWorkers, setFilteredWorkers] = useState(data?.workers.data || []);
    const [profileModal, setProfileModal] = useState({ open: false, worker: null });
    const [editModal, setEditModal] = useState({ open: false, worker: null });
    const [promoteModal, setPromoteModal] = useState({ open: false, worker: null });
    const [editForm, setEditForm] = useState({});
    const [promoteNote, setPromoteNote] = useState('');

    // Update filtered workers when search or filters change
    useEffect(() => {
        if (!data?.workers) return;

        let result = data.workers.data;

        if (searchName) {
            result = result.filter(worker =>
                worker.name.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        if (searchEmail) {
            result = result.filter(worker =>
                worker.email?.toLowerCase().includes(searchEmail.toLowerCase())
            );
        }

        if (searchCoverage) {
            result = result.filter(worker =>
                worker.coverageArea?.toLowerCase().includes(searchCoverage.toLowerCase())
            );
        }

        if (skillFilter !== 'All Skills') {
            result = result.filter(worker =>
                worker.skills.toLowerCase().includes(skillFilter.toLowerCase())
            );
        }

        if (experienceFilter !== 'All Experience') {
            result = result.filter(worker => {
                if (experienceFilter === 'Beginner (0-1 years)') return worker.jobsCompleted < 50;
                if (experienceFilter === 'Intermediate (2-5 years)') return worker.jobsCompleted >= 50 && worker.jobsCompleted < 100;
                if (experienceFilter === 'Expert (5+ years)') return worker.jobsCompleted >= 100;
                return true;
            });
        }

        if (backgroundFilter !== 'All Background') {
            result = result.filter(worker =>
                worker.status === backgroundFilter.toUpperCase())
        }

        setFilteredWorkers(result);
    }, [searchName, searchEmail, searchCoverage, skillFilter, experienceFilter, backgroundFilter, data]);

    // Handle Profile action
    const handleProfile = (worker) => {
        setProfileModal({ open: true, worker });
    };

    // Handle Edit action
    const handleEdit = (worker) => {
        setEditModal({ open: true, worker });
        setEditForm({ ...worker });
    };

    // Handle Promote action
    const handlePromote = (worker) => {
        setPromoteModal({ open: true, worker });
        setPromoteNote('');
    };

    // Handle Edit form submission
    const handleEditSubmit = () => {
        const updatedWorkers = data.workers.data.map(worker =>
            worker.id === editModal.worker.id ? { ...worker, ...editForm } : worker
        );
        setData({ ...data, workers: updatedWorkers });
        setEditModal({ open: false, worker: null });
    };

    // Handle Promote submission
    const handlePromoteSubmit = () => {
        // In a real app, this could update a worker's status or add a promotion flag
        const updatedWorkers = data.workers.map(worker =>
            worker.id === promoteModal.worker.id ? { ...worker, status: 'ACTIVE' } : worker
        );
        setData({ ...data, workers: updatedWorkers });
        setPromoteModal({ open: false, worker: null });
        setPromoteNote('');
        // In a real app, promoteNote would be sent to a backend
    };

    if (!data) {
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
                    <input
                        type="text"
                        placeholder="Full name"
                        className="px-4 py-2 border rounded-lg"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="worker@email.com"
                        className="px-4 py-2 border rounded-lg"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="+27 XX XXX XXXX"
                        className="px-4 py-2 border rounded-lg"
                        disabled
                    />
                    <input
                        type="text"
                        placeholder="Coverage area"
                        className="px-4 py-2 border rounded-lg"
                        value={searchCoverage}
                        onChange={(e) => setSearchCoverage(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <select
                        className="px-4 py-2 border rounded-lg"
                        value={skillFilter}
                        onChange={(e) => setSkillFilter(e.target.value)}
                    >
                        <option>All Skills</option>
                        <option>House Cleaning</option>
                        <option>Garden Maintenance</option>
                        <option>Plumbing</option>
                        <option>Electrical Work</option>
                        <option>Painting</option>
                    </select>
                    <input
                        type="number"
                        placeholder="150.00"
                        className="px-4 py-2 border rounded-lg"
                        disabled
                    />
                    <select
                        className="px-4 py-2 border rounded-lg"
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                    >
                        <option>All Experience</option>
                        <option>Beginner (0-1 years)</option>
                        <option>Intermediate (2-5 years)</option>
                        <option>Expert (5+ years)</option>
                    </select>
                    <select
                        className="px-4 py-2 border rounded-lg"
                        value={backgroundFilter}
                        onChange={(e) => setBackgroundFilter(e.target.value)}
                    >
                        <option>All Background</option>
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
                        {filteredWorkers.map(worker => (
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
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        worker.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                        worker.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {worker.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                        <button
                                            className="text-blue-600 hover:text-blue-900"
                                            onClick={() => handleProfile(worker)}
                                        >
                                            Profile
                                        </button>
                                        <button
                                            className="text-green-600 hover:text-green-900"
                                            onClick={() => handleEdit(worker)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-orange-600 hover:text-orange-900"
                                            onClick={() => handlePromote(worker)}
                                        >
                                            Promote
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Profile Modal */}
            {profileModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Worker Profile</h2>
                        <div className="space-y-2">
                            <p><strong>ID:</strong> {profileModal.worker.id}</p>
                            <p><strong>Name:</strong> {profileModal.worker.name}</p>
                            <p><strong>Skills:</strong> {profileModal.worker.skills}</p>
                            <p><strong>Rating:</strong> {profileModal.worker.rating}</p>
                            <p><strong>Jobs Completed:</strong> {profileModal.worker.jobsCompleted}</p>
                            <p><strong>Earnings (Month):</strong> R{profileModal.worker.earnings.toLocaleString()}</p>
                            <p><strong>Status:</strong> {profileModal.worker.status}</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setProfileModal({ open: false, worker: null })}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Worker</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={editForm.name || ''}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Skills</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={editForm.skills || ''}
                                    onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rating</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={editForm.rating || ''}
                                    onChange={(e) => setEditForm({ ...editForm, rating: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Jobs Completed</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={editForm.jobsCompleted || ''}
                                    onChange={(e) => setEditForm({ ...editForm, jobsCompleted: parseInt(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Earnings (Month)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={editForm.earnings || ''}
                                    onChange={(e) => setEditForm({ ...editForm, earnings: parseInt(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={editForm.status || ''}
                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                >
                                    <option>ACTIVE</option>
                                    <option>PENDING</option>
                                    <option>SUSPENDED</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setEditModal({ open: false, worker: null })}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                onClick={handleEditSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Promote Modal */}
            {promoteModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Promote Worker</h2>
                        <p className="mb-4">Are you sure you want to promote <strong>{promoteModal.worker.name}</strong>?</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Promotion Note</label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                value={promoteNote}
                                onChange={(e) => setPromoteNote(e.target.value)}
                                placeholder="Enter reason for promotion..."
                            />
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setPromoteModal({ open: false, worker: null })}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                onClick={handlePromoteSubmit}
                            >
                                Promote
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkersManagement;