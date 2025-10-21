import React, { useState } from 'react';
import { Link,  } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Package,  Plus, X, Search, Filter, Eye, XCircle, Truck, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { useCreateParcelMutation, useGetAllParcelsQuery, useUpdateParcelMutation } from '@/redux/api/parcelApi';
import { getStatusColor, getStatusLabel, formatDate } from '@/utils/helpers';
import toast from 'react-hot-toast';
import type { ICreateParcelPayload } from '@/types/parcel.types';
import { useGetMeQuery } from '@/redux/api/userApi';
import Navbar from '@/components/shared/Navbar';

const SenderDashboard: React.FC = () => {
 
  const { user } = useAuth();

    const {data}=useGetMeQuery()
    
   
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch parcels
  const { data: parcelsData, isLoading } = useGetAllParcelsQuery();
  const [createParcel, { isLoading: isCreating }] = useCreateParcelMutation();
  const [updateParcel] = useUpdateParcelMutation();
console.log(parcelsData,"inside sender dashboard")
  // Filter parcels for sender
  const allParcels = parcelsData?.data || [];
  const userParcels = allParcels.filter(p => p.senderId?._id === user?._id || p.senderId?.name === user?.name);

  // Calculate stats
  const stats = {
    total: userParcels.length,
    delivered: userParcels.filter(p => p.status === 'delivered').length,
    inTransit: userParcels.filter(p => p.status === 'in-transit').length,
    pending: userParcels.filter(p => p.status === 'pending').length,
  };

  // Prepare chart data
  const statusData = [
    { name: 'Delivered', value: stats.delivered, color: '#10b981' },
    { name: 'In Transit', value: stats.inTransit, color: '#3b82f6' },
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
  ];

  const monthlyData = userParcels.reduce((acc, parcel) => {
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

  // Filter and paginate
  const filteredParcels = userParcels.filter(p => {
    const matchesSearch = p.receiverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.receiverAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredParcels.length / itemsPerPage);
  const paginatedParcels = filteredParcels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Form handling
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ICreateParcelPayload>();
console.log(data,"inside sender dashboard user")
const onSubmitParcel = async (data: ICreateParcelPayload) => {
  if (!user?._id) {
    toast.error("User not logged in");
    return;
  }

  try {
    await createParcel({
      ...data,
      senderId: user._id, 
    }).unwrap();

    toast.success('Parcel created successfully!');
    setShowCreateModal(false);
    reset();
  } catch (error: any) {
    toast.error(error?.data?.message || 'Failed to create parcel');
  }
};

  const handleCancelParcel = async (id: string, status: string) => {
    if (status !== 'pending') {
      toast.error('Only pending parcels can be cancelled');
      return;
    }

    try {
      await updateParcel({ id, payload: { status: 'cancelled' } }).unwrap();
      toast.success('Parcel cancelled successfully');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to cancel parcel');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar></Navbar>
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sender Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your parcel deliveries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Parcels</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <Package className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.delivered}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Transit</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.inTransit}</p>
              </div>
              <Truck className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent as number * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
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

          {/* Bar Chart */}
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

        {/* Parcel Management */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">My Parcels</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Create Parcel</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by receiver name or address..."
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
          </div>

          {/* Table */}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receiver</th>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parcel.trackingId || parcel._id.slice(-6)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {parcel.receiverName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {parcel.receiverAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {parcel.weight} kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(parcel.status)}`}>
                          {getStatusLabel(parcel.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(parcel.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/tracking?id=${parcel._id}`}
                            className="text-blue-600 hover:text-blue-700"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          {parcel.status === 'pending' && (
                            <button
                              onClick={() => handleCancelParcel(parcel._id, parcel.status)}
                              className="text-red-600 hover:text-red-700"
                              title="Cancel Parcel"
                            >
                              <XCircle className="w-5 h-5" />
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

          {/* Pagination */}
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
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Parcel Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Create New Parcel</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmitParcel)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiver Name
                </label>
                <input
                  type="text"
                  {...register('receiverName', { required: 'Receiver name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiverName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiver Address
                </label>
                <textarea
                  {...register('receiverAddress', { required: 'Address is required' })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main St, City"
                />
                {errors.receiverAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiverAddress.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiver Phone
                </label>
                <input
                  type="text"
                  {...register('receiverPhone', { required: 'Phone number is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+880 1234-567890"
                />
                {errors.receiverPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiverPhone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
             <input
  type="number"
  step="0.1"
  {...register('weight', {
    valueAsNumber: true, // ✅ Converts to number automatically
    required: 'Weight is required',
    min: { value: 0.1, message: 'Weight must be at least 0.1 kg' },
  })}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
  placeholder="2.5"
/>
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isCreating ? 'Creating...' : 'Create Parcel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SenderDashboard;