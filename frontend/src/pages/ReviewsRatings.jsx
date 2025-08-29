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
    const [filteredReviews, setFilteredReviews] = useState(data?.reviews?.data || []);
    const [selectedReviews, setSelectedReviews] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [viewJobModal, setViewJobModal] = useState({ open: false, job: null });
    const [bulkActionModal, setBulkActionModal] = useState({ open: false, action: null });
    const [bulkForm, setBulkForm] = useState({ status: '', note: '' });

    // Update filtered reviews when search or filters change
    useEffect(() => {
        if (!data?.reviews?.data) {
            setFilteredReviews([]);
            return;
        }

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
    }, [searchQuery, ratingFilter, statusFilter, dateFilter, data?.reviews?.data]);

    // Handle individual review selection
    const handleReviewSelect = (reviewId, isSelected) => {
        if (isSelected) {
            setSelectedReviews([...selectedReviews, reviewId]);
        } else {
            setSelectedReviews(selectedReviews.filter(id => id !== reviewId));
        }
    };

    // Handle select all toggle
    const handleSelectAll = (isSelected) => {
        setSelectAll(isSelected);
        if (isSelected) {
            setSelectedReviews(filteredReviews.map(review => review.id));
        } else {
            setSelectedReviews([]);
        }
    };

    // Update selectAll when individual selections change
    useEffect(() => {
        if (filteredReviews.length > 0) {
            setSelectAll(selectedReviews.length === filteredReviews.length);
        }
    }, [selectedReviews, filteredReviews]);

    // Handle View Job action
    const handleViewJob = (review) => {
        const job = data?.jobs?.data?.find(job => job.id === review.jobId);
        setViewJobModal({ open: true, job });
    };

    // Handle bulk action initiation
    const handleBulkAction = (action) => {
        if (selectedReviews.length === 0) {
            alert('Please select at least one review.');
            return;
        }
        setBulkActionModal({ open: true, action });
        setBulkForm({ status: action === 'publish' ? 'PUBLISHED' : '', note: '' });
    };

    // Handle bulk action submission
    const handleBulkActionSubmit = async () => {
        try {
            const updatedReviews = data.reviews.data.map(review => {
                if (selectedReviews.includes(review.id)) {
                    const updates = { status: bulkForm.status };
                    if (bulkForm.note) {
                        updates.moderationNote = bulkForm.note;
                    }
                    return { ...review, ...updates };
                }
                return review;
            });

            // Get only the reviews that were actually updated
            const reviewsToUpdate = updatedReviews.filter(review => 
                selectedReviews.includes(review.id)
            );

            await setData(
                {
                    reviews: {
                        ...data.reviews,
                        data: updatedReviews,
                    },
                },
                {
                    endpoint: 'reviews',
                    updatedItems: reviewsToUpdate, // Pass multiple items
                }
            );

            setBulkActionModal({ open: false, action: null });
            setBulkForm({ status: '', note: '' });
            setSelectedReviews([]);
            setSelectAll(false);
        } catch (error) {
            console.error('Error updating reviews:', error);
            alert('Failed to update reviews. Please try again.');
        }
    };

    if (!data) {
        return <div>Error: AppContext is not available. Ensure Dashboard is wrapped in Router.</div>;
    }

    if (data.reviews?.isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading reviews data...</div>
            </div>
        );
    }

    if (data.reviews?.error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">Error: {data.reviews.error}</div>
            </div>
        );
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
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
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

                {/* Bulk Actions Bar */}
                <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    Select All ({filteredReviews.length} reviews)
                                </span>
                            </label>
                            {selectedReviews.length > 0 && (
                                <span className="text-sm text-blue-600 font-medium">
                                    {selectedReviews.length} selected
                                </span>
                            )}
                        </div>

                        {selectedReviews.length > 0 && (
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                                    onClick={() => handleBulkAction('publish')}
                                >
                                    Publish Selected
                                </button>
                                <button
                                    className="px-4 py-2 text-sm bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100"
                                    onClick={() => handleBulkAction('review')}
                                >
                                    Mark Under Review
                                </button>
                                <button
                                    className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                                    onClick={() => handleBulkAction('flag')}
                                >
                                    Flag Selected
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {filteredReviews.map((review, index) => (
                    <div key={review.id || index} className="bg-white rounded-lg shadow-sm p-6 border">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedReviews.includes(review.id || index)}
                                    onChange={(e) => handleReviewSelect(review.id || index, e.target.checked)}
                                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-900">{review.reviewer} reviewed {review.reviewee}</h3>
                                    <p className="text-sm text-gray-600">Job #{review.jobId} • {review.date}</p>
                                </div>
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

                        <div className="mb-4 ml-8">
                            <p className="text-gray-700">{review.comment}</p>
                        </div>

                        <div className="flex gap-2 ml-8">
                            <button
                                className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                                onClick={() => handleViewJob(review)}
                            >
                                View Job
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
                                <p><strong>Amount:</strong> R{viewJobModal.job.amount?.toFixed(2)}</p>
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

            {/* Bulk Action Modal */}
            {bulkActionModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            {bulkActionModal.action === 'publish' ? 'Publish Reviews' :
                             bulkActionModal.action === 'review' ? 'Mark Reviews Under Review' :
                             'Flag Reviews'}
                        </h2>
                        <p className="mb-4">
                            You are about to update {selectedReviews.length} selected review(s).
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Status</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={bulkForm.status}
                                    onChange={(e) => setBulkForm({ ...bulkForm, status: e.target.value })}
                                >
                                    <option value="PUBLISHED">PUBLISHED</option>
                                    <option value="UNDER REVIEW">UNDER REVIEW</option>
                                    <option value="FLAGGED">FLAGGED</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Note (Optional)</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={bulkForm.note}
                                    onChange={(e) => setBulkForm({ ...bulkForm, note: e.target.value })}
                                    placeholder="Enter bulk action note..."
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setBulkActionModal({ open: false, action: null })}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                onClick={handleBulkActionSubmit}
                            >
                                Update {selectedReviews.length} Review(s)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewsRatings;