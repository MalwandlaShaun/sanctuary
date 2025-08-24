import React, { useState, createContext, useContext } from 'react';
import {
   
    Star,
    
} from 'lucide-react';
import AppContext from '../context/AppContext';
import StatCard from '../components/StatCard';



// Reviews & Ratings Component
const ReviewsRatings = () => {
    const { data } = useContext(AppContext);
if(!data){
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
                    />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>All Ratings</option>
                        <option>5 Stars</option>
                        <option>4 Stars</option>
                        <option>3 Stars</option>
                        <option>2 Stars</option>
                        <option>1 Star</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Under Review</option>
                        <option>Flagged</option>
                    </select>
                    <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>

            <div className="space-y-4">
                {data.reviews.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6 border">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">{review.reviewer} reviewed {review.reviewee}</h3>
                                <p className="text-sm text-gray-600">Job #{review.jobId} - House Cleaning • {review.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} />
                                    ))}
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    review.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                  {review.status}
                </span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-700">{review.comment}</p>
                        </div>

                        <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                                View Job
                            </button>
                            <button className="px-4 py-2 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                                Moderate
                            </button>
                            <button className="px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                                {review.status === 'PUBLISHED' ? 'Published' : 'Publish'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsRatings;