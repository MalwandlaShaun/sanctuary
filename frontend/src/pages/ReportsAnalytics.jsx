import {BarChart3} from 'lucide-react';




// Reports & Analytics Component
const ReportsAnalytics = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="text-blue-500" />
                    Reports & Analytics
                </h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Generate Custom Report</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option>User Activity Report</option>
                            <option>Revenue Report</option>
                            <option>Job Performance Report</option>
                            <option>Safety Report</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                        <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                        <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option>PDF Report</option>
                            <option>Excel</option>
                            <option>CSV</option>
                        </select>
                    </div>
                </div>

                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Generate Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">User Growth Trends</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">📈 User registration and activity growth charts</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">💰 Revenue trends and payment volume analysis</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Job Categories Performance</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">🔧 Service category popularity and success rates</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Geographic Heat Map</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">🗺️ Service demand and user distribution by location</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;