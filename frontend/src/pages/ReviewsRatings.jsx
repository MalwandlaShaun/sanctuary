import React, { useContext, useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import AppContext from '../context/AppContext';
import StatCard from '../components/StatCard';

const ReviewsRatings = () => {
    const { data, setData } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [ratingFilter, setRatingFilter] = useState('All Ratings');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [dateFilter, setDateFilter] = useState('');
    const [filteredReviews, setFilteredReviews] = useState(data?.reviews.data || []);
    const [viewJobModal, setViewJobModal] = useState({ open: false, job: null });
    const [moderateModal, setModerateModal] = useState({ open: false, review: null });
    const [publishModal, setPublishModal] = useState({ open: false, review: null });
    const [moderateForm, setModerateForm] = useState({ status: '', note: '' });

    // Update filtered reviews when search or filters change
    useEffect(() => {
        if (!data?.reviews) return;

        let result = data.reviews.data;

        if (searchQuery) {
            result = result.filter(review =>
                review.reviewer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.reviewee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.comment.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (ratingFilter !== 'All Ratings') {
            const ratingValue = parseInt(ratingFilter);
            result = result.filter(review => review.rating === ratingValue);
        }

        if (statusFilter !== 'All Status') {
            result = result.filter(review => review.status === statusFilter.toUpperCase());
        }

        if (dateFilter) {
            result = result.filter(review => review.date === dateFilter);
        }

        setFilteredReviews(result);
    }, [searchQuery, ratingFilter, statusFilter, dateFilter, data]);

    // Handle View Job action
    const handleViewJob = (review) => {
        const job = data.jobs.data.find(job => job.id === review.jobId);
        setViewJobModal({ open: true, job });
    };

    // Handle Moderate action
    const handleModerate = (review) => {
        setModerateModal({ open: true, review });
        setModerateForm({ status: review.status, note: '' });
    };

    // Handle Publish action
    const handlePublish = (review) => {
        if (review.status !== 'PUBLISHED') {
            setPublishModal({ open: true, review });
        }
    };

    // Handle Moderate form submission
    const handleModerateSubmit = () => {
        const updatedReviews = data.reviews.map(review =>
            review.id === moderateModal.review.id ? { ...review, status: moderateForm.status } : review
        );
        setData({ ...data, reviews: updatedReviews });
        setModerateModal({ open: false, review: null });
        setModerateForm({ status: '', note: '' });
        // In a real app, moderateForm.note would be sent to a backend
    };

    // Handle Publish submission
    const handlePublishSubmit = () => {
        const updatedReviews = data.reviews.map(review =>
            review.id === publishModal.review.id ? { ...review, status: 'PUBLISHED' } : review
        );
        setData({ ...data, reviews: updatedReviews });
        setPublishModal({ open: false, review: null });
    };

    if (!data) {
        return <div>Error: AppContext is not available. Ensure Dashboard is wrapped in Router.</div>;
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="text-blue-500" />
                    Reviews & Ratings Management
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Reviews" value="12,456" subtitle="All platform reviews" color="blue" />
                    <StatCard title="Average Rating" value="4.7" subtitle="Platform-wide average" color="green" />
                    <StatCard title="Flagged Reviews" value="23" subtitle="Requires moderation" color="yellow" />
                    <StatCard title="Disputed Reviews" value="8" subtitle="Under investigation" color="red" />
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by reviewer, worker, or content..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                    >
                        <option>All Ratings</option>
                        <option>5 Stars</option>
                        <option>4 Stars</option>
                        <option>3 Stars</option>
                        <option>2 Stars</option>
                        <option>1 Star</option>
                    </select>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>PUBLISHED</option>
                        <option>UNDER REVIEW</option>
                        <option>FLAGGED</option>
                    </select>
                    <input
                        type="date"
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {filteredReviews.map((review, index) => (
                    <div key={review.id} className="bg-white rounded-lg shadow-sm p-6 border">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">{review.reviewer} reviewed {review.reviewee}</h3>
                                <p className="text-sm text-gray-600">Job #{review.jobId} - {review.service || 'House Cleaning'} • {review.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} />
                                    ))}
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    review.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                                    review.status === 'UNDER REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {review.status}
                                </span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-700">{review.comment}</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                                onClick={() => handleViewJob(review)}
                            >
                                View Job
                            </button>
                            <button
                                className="px-4 py-2 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100"
                                onClick={() => handleModerate(review)}
                            >
                                Moderate
                            </button>
                            <button
                                className={`px-4 py-2 text-sm rounded-lg ${
                                    review.status === 'PUBLISHED'
                                        ? 'bg-green-50 text-green-600 cursor-not-allowed opacity-50'
                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                }`}
                                onClick={() => handlePublish(review)}
                                disabled={review.status === 'PUBLISHED'}
                            >
                                {review.status === 'PUBLISHED' ? 'Published' : 'Publish'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View Job Modal */}
            {viewJobModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Job Details</h2>
                        {viewJobModal.job ? (
                            <div className="space-y-2">
                                <p><strong>Job ID:</strong> {viewJobModal.job.id}</p>
                                <p><strong>Customer:</strong> {viewJobModal.job.customer}</p>
                                <p><strong>Worker:</strong> {viewJobModal.job.worker}</p>
                                <p><strong>Service:</strong> {viewJobModal.job.service}</p>
                                <p><strong>Amount:</strong> R{viewJobModal.job.amount.toFixed(2)}</p>
                                <p><strong>Status:</strong> {viewJobModal.job.status}</p>
                                <p><strong>Date:</strong> {viewJobModal.job.date}</p>
                            </div>
                        ) : (
                            <p className="text-red-600">Job not found</p>
                        )}
                        <div className="mt-6 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setViewJobModal({ open: false, job: null })}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Moderate Modal */}
            {moderateModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Moderate Review</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700">Review by {moderateModal.review.reviewer} for {moderateModal.review.reviewee}</p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={moderateForm.status}
                                    onChange={(e) => setModerateForm({ ...moderateForm, status: e.target.value })}
                                >
                                    <option>PUBLISHED</option>
                                    <option>UNDER REVIEW</option>
                                    <option>FLAGGED</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Moderation Note</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={moderateForm.note}
                                    onChange={(e) => setModerateForm({ ...moderateForm, note: e.target.value })}
                                    placeholder="Enter moderation note..."
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setModerateModal({ open: false, review: null })}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                onClick={handleModerateSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Publish Modal */}
            {publishModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Publish Review</h2>
                        <p className="mb-4">Are you sure you want to publish the review by <strong>{publishModal.review.reviewer}</strong> for <strong>{publishModal.review.reviewee}</strong>?</p>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setPublishModal({ open: false, review: null })}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                onClick={handlePublishSubmit}
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewsRatings;