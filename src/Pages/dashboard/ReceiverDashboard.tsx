import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Filter, Eye, CheckCircle, TrendingUp, Inbox, Truck, Clock } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import toast from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';
import { useGetAllParcelsQuery, useUpdateParcelMutation } from '@/redux/api/parcelApi';
import { getStatusColor, getStatusLabel, formatDate } from '@/utils/helpers';
import Navbar from '@/components/shared/Navbar';

const ReceiverDashboard: React.FC = () => {
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: parcelsData, isLoading } = useGetAllParcelsQuery();
  const [updateParcel] = useUpdateParcelMutation();

  const allParcels = parcelsData?.data || [];
  const incomingParcels = allParcels.filter(
    p => p.receiverName.toLowerCase() === user?.name?.toLowerCase() 
  );

  const stats = {
    total: incomingParcels.length,
    delivered: incomingParcels.filter(p => p.status === 'delivered').length,
    inTransit: incomingParcels.filter(p => p.status === 'in-transit').length,
    pending: incomingParcels.filter(p => p.status === 'pending').length,
  };

  const statusData = [
    { name: 'Delivered', value: stats.delivered, color: '#8b5cf6' },
    { name: 'In Transit', value: stats.inTransit, color: '#06b6d4' },
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

  const filteredParcels = incomingParcels.filter(p => {
    const matchesSearch = p?.senderId?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.receiverAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredParcels.length / itemsPerPage);
  const paginatedParcels = filteredParcels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Receiver Dashboard
          </h1>
          <p className="text-zinc-400 mt-2">View and confirm your incoming parcels</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Inbox, label: 'Total Parcels', value: stats.total, gradient: 'from-purple-500 to-pink-500', trend: '+5%' },
            { icon: CheckCircle, label: 'Delivered', value: stats.delivered, gradient: 'from-green-500 to-emerald-500', trend: '+12%' },
            { icon: Truck, label: 'In Transit', value: stats.inTransit, gradient: 'from-cyan-500 to-blue-500', trend: '+3%' },
            { icon: Clock, label: 'Pending', value: stats.pending, gradient: 'from-yellow-500 to-orange-500', trend: '-2%' }
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-purple-500/50 transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center text-xs font-bold text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.trend}
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <h3 className="text-xl font-black text-white mb-6">Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent as number * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <h3 className="text-xl font-black text-white mb-6">Monthly Parcels</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="total" fill="#8b5cf6" name="Total" />
                  <Bar dataKey="delivered" fill="#06b6d4" name="Delivered" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Parcel Table */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-black text-white">My Incoming Parcels</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search by sender name or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder-zinc-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-black/40 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition appearance-none cursor-pointer"
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
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                </div>
              ) : paginatedParcels.length === 0 ? (
                <div className="p-12 text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 text-zinc-700" />
                  <p className="text-zinc-500">No parcels found</p>
                </div>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Sender</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Weight</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedParcels.map((parcel, idx) => (
                      <tr key={parcel._id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-purple-400">
                          {parcel.trackingId || parcel._id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                          {parcel.senderId.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-400 max-w-xs truncate">
                          {parcel.receiverAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                          {parcel.weight} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(parcel.status)}`}>
                            {getStatusLabel(parcel.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                          {formatDate(parcel.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center space-x-3">
                            <Link to={`/tracking?id=${parcel._id}`} className="text-cyan-400 hover:text-cyan-300 transition-colors" title="View Details">
                              <Eye className="w-5 h-5" />
                            </Link>
                            {parcel.status === 'in-transit' && (
                              <button
                                onClick={() => handleConfirmDelivery(parcel._id, parcel.status)}
                                className="text-green-400 hover:text-green-300 transition-colors"
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
              <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                <p className="text-sm text-zinc-400">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredParcels.length)} of {filteredParcels.length} parcels
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white font-medium"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white font-medium"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
