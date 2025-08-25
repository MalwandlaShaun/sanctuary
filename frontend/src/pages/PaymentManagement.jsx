import React, { useState, createContext, useContext } from 'react';
import {
 
    DollarSign,
    
} from 'lucide-react';
import AppContext from '../context/AppContext';
import StatCard from '../components/StatCard';



// Payment Management Component
const PaymentManagement = () => {
    const { data } = useContext(AppContext);
 if(!data){
    return <div>Error: AppContext is not available. Ensure Dashboard is wrapped in Router.</div>;

 }
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="text-blue-500" />
                    Payment Management
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Revenue" value="R847k" subtitle="Platform commission earned" color="blue" />
                    <StatCard title="Processed Payments" value="R2.8M" subtitle="Successfully processed" color="green" />
                    <StatCard title="Pending Payouts" value="R156k" subtitle="Awaiting processing" color="yellow" />
                    <StatCard title="Failed Transactions" value="23" subtitle="Requires attention" color="red" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">📊 Revenue trends, payment volumes, and commission analytics would be displayed here</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.payments.data.map(payment => (
                        <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{payment.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{payment.commission.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.user}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-900">View Receipt</button>
                                    <button className="text-orange-600 hover:text-orange-900">Refund</button>
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

export default PaymentManagement;