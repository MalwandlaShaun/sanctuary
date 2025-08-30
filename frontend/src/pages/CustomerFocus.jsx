import { Users } from "lucide-react";
import StatCard from "../components/StatCard";

// Customer Focus Component
const CustomerFocus = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="text-blue-500" />
                    Users (Customer Focus)
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard title="Active Customers" value="1,834" subtitle="Monthly active users" color="blue" />
                    <StatCard title="Customer Retention" value="78%" subtitle="Return customer rate" color="green" />
                    <StatCard title="Avg. Spending" value="R1,240" subtitle="Per customer per month" color="yellow" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Profile Management</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <input type="text" placeholder="Full name" className="px-4 py-2 border border-gray-300 rounded-lg" />
                    <input type="email" placeholder="email@example.com" className="px-4 py-2 border border-gray-300 rounded-lg" />
                    <input type="tel" placeholder="+27 XX XXX XXXX" className="px-4 py-2 border border-gray-300 rounded-lg" />
                    <input type="text" placeholder="City, Province" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Suspended</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Fully Verified</option>
                        <option>Partially Verified</option>
                        <option>Unverified</option>
                    </select>
                    <input type="number" step="0.01" placeholder="0.00" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default CustomerFocus;