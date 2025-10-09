import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Package, LogOut, Search, Filter, Eye, CheckCircle, Truck, Clock } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import toast from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/redux/hooks';
import { logout as logoutAction } from '@/redux/features/authSlice';
import { useLogoutMutation } from '@/redux/api/authApi';
import { useGetAllParcelsQuery, useUpdateParcelMutation } from '@/redux/api/parcelApi';
import { getStatusColor, getStatusLabel, formatDate } from '@/utils/helpers';

const ReceiverDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const [logoutMutation] = useLogoutMutation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: parcelsData, isLoading } = useGetAllParcelsQuery();
  const [updateParcel] = useUpdateParcelMutation();

  // Filter parcels for receiver
  const allParcels = parcelsData?.data || [];
  const incomingParcels = allParcels.filter(
    p => p.receiverName.toLowerCase() === user?.name?.toLowerCase() ||
         p.receiverPhone === user?.phone
  );

  // Stats
  const stats = {
    total: incomingParcels.length,
    delivered: incomingParcels.filter(p => p.status === 'delivered').length,
    inTransit: incomingParcels.filter(p => p.status === 'in-transit').length,
    pending: incomingParcels.filter(p => p.status === 'pending').length,
  };

  const statusData = [
    { name: 'Delivered', value: stats.delivered, color: '#10b981' },
    { name: 'In Transit', value: stats.inTransit, color: '#3b82f6' },
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
  ];

  const monthlyData = incomingParcels.reduce((acc, parcel) => {
    const month = new Date(parcel.createdAt).toLocaleString('default', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.total += 1;
      if (parcel.status === 'delivered') existing.delivered += 1;
    } else {
      acc.push({ month, total: 1, delivered: parcel.status === 'delivered' ? 1 : 0 });
    }
    return acc;
  }, [] as { month: string; total: number; delivered: number }[]);

  // Filter & paginate
  const filteredParcels = incomingParcels.filter(p => {
    const matchesSearch = p.senderName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.receiverAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredParcels.length / itemsPerPage);
  const paginatedParcels = filteredParcels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Confirm delivery
  const handleConfirmDelivery = async (id: string, status: string) => {
    if (status !== 'in-transit') {
      toast.error('Only in-transit parcels can be confirmed');
      return;
    }

    try {
      await updateParcel({ id, payload: { status: 'delivered' } }).unwrap();
      toast.success('Parcel confirmed as delivered');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update parcel');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logoutAction());
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      dispatch(logoutAction());
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ParcelPro</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/tracking" className="text-gray-700 hover:text-blue-600">Track Parcel</Link>
              <span className="text-sm text-gray-600">{user?.name}</span>
              <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                <LogOut className="w-5 h-5" /><span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Receiver Dashboard</h1>
          <p className="text-gray-600 mt-2">View and confirm your incoming parcels</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Total Parcels</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Delivered</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{stats.delivered}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">In Transit</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{stats.inTransit}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Parcels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3b82f6" name="Total" />
                <Bar dataKey="delivered" fill="#10b981" name="Delivered" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Parcel Table */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">My Incoming Parcels</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 p-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by sender name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="picked">Picked</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : paginatedParcels.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No parcels found</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedParcels.map((parcel) => (
                    <tr key={parcel._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{parcel.trackingId || parcel._id.slice(-6)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parcel.senderName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{parcel.receiverAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parcel.weight} kg</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(parcel.status)}`}>
                          {getStatusLabel(parcel.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(parcel.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <Link to={`/tracking?id=${parcel._id}`} className="text-blue-600 hover:text-blue-700" title="View Details">
                            <Eye className="w-5 h-5" />
                          </Link>
                          {parcel.status === 'in-transit' && (
                            <button
                              onClick={() => handleConfirmDelivery(parcel._id, parcel.status)}
                              className="text-green-600 hover:text-green-700"
                              title="Confirm Delivery"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredParcels.length)} of {filteredParcels.length} parcels
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >Previous</button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
