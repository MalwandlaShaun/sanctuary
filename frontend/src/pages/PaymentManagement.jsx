import React, { useContext, useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import AppContext from '../context/AppContext';
import StatCard from '../components/StatCard';

const PaymentManagement = () => {
    const { data, setData } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [dateFilter, setDateFilter] = useState('');
    const [filteredPayments, setFilteredPayments] = useState(data?.payments.data || []);
    const [viewModal, setViewModal] = useState({ open: false, payment: null });
    const [refundModal, setRefundModal] = useState({ open: false, payment: null });
    const [refundReason, setRefundReason] = useState('');

    // Update filtered payments when search or filters change
    useEffect(() => {
        if (!data?.payments) return;

        let result = data.payments.data;

        if (searchQuery) {
            result = result.filter(payment =>
                payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.user.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== 'All Status') {
            result = result.filter(payment => payment.status === statusFilter.toUpperCase());
        }

        if (typeFilter !== 'All Types') {
            result = result.filter(payment => payment.type === typeFilter);
        }

        if (dateFilter) {
            result = result.filter(payment => payment.date === dateFilter);
        }

        setFilteredPayments(result);
    }, [searchQuery, statusFilter, typeFilter, dateFilter, data]);

    // Handle View Receipt action
    const handleView = (payment) => {
        setViewModal({ open: true, payment });
    };

    // Handle Refund action
    const handleRefund = (payment) => {
        setRefundModal({ open: true, payment });
        setRefundReason('');
    };

    // Handle Refund submission
    const handleRefundSubmit = () => {
        const updatedPayments = data.payments.map(payment =>
            payment.id === refundModal.payment.id ? { ...payment, status: 'REFUNDED' } : payment
        );
        setData({ ...data, payments: updatedPayments });
        setRefundModal({ open: false, payment: null });
        setRefundReason('');
        // In a real app, refundReason would be sent to a backend
    };

    if (!data) {
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

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by transaction ID or user..."
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
                        <option>PENDING</option>
                        <option>FAILED</option>
                        <option>REFUNDED</option>
                    </select>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option>All Types</option>
                        <option>PAYMENT</option>
                        <option>PAYOUT</option>
                    </select>
                    <input
                        type="date"
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
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
                        {filteredPayments.map(payment => (
                            <tr key={payment.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{payment.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{payment.commission.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.user}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        payment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                        payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                        payment.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                        <button
                                            className="text-blue-600 hover:text-blue-900"
                                            onClick={() => handleView(payment)}
                                        >
                                            View Receipt
                                        </button>
                                        <button
                                            className="text-orange-600 hover:text-orange-900"
                                            onClick={() => handleRefund(payment)}
                                        >
                                            Refund
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Receipt Modal */}
            {viewModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Transaction Receipt</h2>
                        <div className="space-y-2">
                            <p><strong>Transaction ID:</strong> {viewModal.payment.id}</p>
                            <p><strong>Type:</strong> {viewModal.payment.type}</p>
                            <p><strong>Amount:</strong> R{viewModal.payment.amount.toFixed(2)}</p>
                            <p><strong>Commission:</strong> R{viewModal.payment.commission.toFixed(2)}</p>
                            <p><strong>User:</strong> {viewModal.payment.user}</p>
                            <p><strong>Status:</strong> {viewModal.payment.status}</p>
                            <p><strong>Date:</strong> {viewModal.payment.date}</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setViewModal({ open: false, payment: null })}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Refund Modal */}
            {refundModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Refund Transaction</h2>
                        <p className="mb-4">Are you sure you want to refund <strong>R{refundModal.payment.amount.toFixed(2)}</strong> for transaction <strong>{refundModal.payment.id}</strong>?</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Refund Reason</label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                value={refundReason}
                                onChange={(e) => setRefundReason(e.target.value)}
                                placeholder="Enter reason for refund..."
                            />
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setRefundModal({ open: false, payment: null })}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                onClick={handleRefundSubmit}
                            >
                                Refund
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentManagement;