// src/pages/UsersManagement.jsx
import { useContext, useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import AppContext from '../context/AppContext';
import StatCard from '../components/StatCard';

const UsersManagement = () => {
  const { data, setData } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [dateFilter, setDateFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [viewModal, setViewModal] = useState({ open: false, user: null });
  const [editModal, setEditModal] = useState({ open: false, user: null });
  const [suspendModal, setSuspendModal] = useState({ open: false, user: null });
  const [editForm, setEditForm] = useState({});
  const [suspendReason, setSuspendReason] = useState('');

  // Update filtered users when search or filters change
  useEffect(() => {
    if (!data?.users?.data) {
      setFilteredUsers([]);
      return;
    }

    let result = data.users.data;
     
    if (searchQuery) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'All Status') {
      result = result.filter(user => user.status === statusFilter);
    }

    if (typeFilter !== 'All Types') {
      result = result.filter(user => user.type === typeFilter);
    }

    if (dateFilter) {
      result = result.filter(user => user.joinDate === dateFilter);
    }

    setFilteredUsers(result);
  }, [searchQuery, statusFilter, typeFilter, dateFilter, data?.users?.data]);

  const handleView = (user) => {
    setViewModal({ open: true, user });
  };

  const handleEdit = (user) => {
    setEditModal({ open: true, user });
    setEditForm({ ...user });
  };

  const handleSuspend = (user) => {
    setSuspendModal({ open: true, user });
    setSuspendReason('');
  };

  const handleEditSubmit = async () => {
    const updatedUser = { ...editForm };
    
    // Update local state
    const updatedUsers = data.users.data.map(user =>
      user.id === editModal.user.id ? updatedUser : user
    );
    
    // Call setData with the specific user to update
    await setData(
      {
        users: {
          ...data.users,
          data: updatedUsers,
        },
      },
      {
        updatedItem: updatedUser,
        endpoint: 'users'
      }
    );
    
    setEditModal({ open: false, user: null });
  };

  const handleSuspendSubmit = async () => {
    const updatedUser = { ...suspendModal.user, status: 'SUSPENDED' };
    
    // Update local state
    const updatedUsers = data.users.data.map(user =>
      user.id === suspendModal.user.id ? updatedUser : user
    );
    
    // Call setData with the specific user to update
    await setData(
      {
        users: {
          ...data.users,
          data: updatedUsers,
        },
      },
      {
        updatedItem: updatedUser,
        endpoint: 'users'
      }
    );
    
    setSuspendModal({ open: false, user: null });
    setSuspendReason('');
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: AppContext is not available. Ensure Dashboard is wrapped in Router.</div>
      </div>
    );
  }

  if (data.users?.isLoading) {
    console.log(data.users)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading user data...</div>
      </div>
    );
  }

  if (data.users?.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {data.users.error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="text-blue-500" />
          User Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Registered Users" value="2,847" subtitle="+12% from last month" color="blue" />
          <StatCard title="Verified Users" value="2,435" subtitle="85.5% verification rate" color="green" />
          <StatCard title="Pending Verification" value="312" subtitle="Requires attention" color="yellow" />
          <StatCard title="Suspended Users" value="100" subtitle="Safety violations" color="red" />
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>ACTIVE</option>
            <option>PENDING</option>
            <option>SUSPENDED</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option>All Types</option>
            <option>Customer</option>
            <option>Worker</option>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verification</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    user.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.verification === 'VERIFIED' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.verification}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleView(user)}
                    >
                      View
                    </button>
                    <button
                      className="text-green-600 hover:text-green-900"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleSuspend(user)}
                    >
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {viewModal.user.id}</p>
              <p><strong>Name:</strong> {viewModal.user.name}</p>
              <p><strong>Email:</strong> {viewModal.user.email}</p>
              <p><strong>Type:</strong> {viewModal.user.type}</p>
              <p><strong>Status:</strong> {viewModal.user.status}</p>
              <p><strong>Verification:</strong> {viewModal.user.verification}</p>
              <p><strong>Join Date:</strong> {viewModal.user.joinDate}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                onClick={() => setViewModal({ open: false, user: null })}
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
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
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
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={editForm.type || ''}
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                >
                  <option>Customer</option>
                  <option>Worker</option>
                </select>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Verification</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={editForm.verification || ''}
                  onChange={(e) => setEditForm({ ...editForm, verification: e.target.value })}
                >
                  <option>VERIFIED</option>
                  <option>PENDING</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                onClick={() => setEditModal({ open: false, user: null })}
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

      {/* Suspend Modal */}
      {suspendModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Suspend User</h2>
            <p className="mb-4">Are you sure you want to suspend <strong>{suspendModal.user.name}</strong>?</p>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason for Suspension</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Enter reason for suspension..."
              />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                onClick={() => setSuspendModal({ open: false, user: null })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleSuspendSubmit}
              >
                Suspend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;