import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Package,
  Users,
  BarChart3,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

import { useGetAllParcelsQuery } from "@/redux/api/parcelApi";
import { useGetAllUsersQuery } from "@/redux/api/userApi";

import AdminUsersTable from "@/components/Module/AdminUsersTable";
import AdminParcelsTable from "@/components/Module/AdminPatcelsTable";
import Navbar from "@/components/shared/Navbar";

const COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b"]; 

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "parcels" | "users">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: parcelsData } = useGetAllParcelsQuery();
  const { data: usersData } = useGetAllUsersQuery();

  const parcels = parcelsData?.data || [];
  const users = usersData?.data || [];

  const delivered = parcels.filter((p) => p.status === "delivered").length;
  const inTransit = parcels.filter((p) => p.status === "in-transit").length;
  const pending = parcels.filter((p) => p.status === "pending").length;

  const pieData = [
    { name: "Delivered", value: delivered },
    { name: "In Transit", value: inTransit },
    { name: "Pending", value: pending },
  ];

  const monthlyData = [
    { month: "Jan", parcels: 12 },
    { month: "Feb", parcels: 18 },
    { month: "Mar", parcels: 22 },
    { month: "Apr", parcels: 15 },
    { month: "May", parcels: 28 },
  ];

  return (
    <div className="bg-black text-zinc-100 min-h-screen">
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:static z-40 top-0 left-0 min-h-screen w-64 bg-black/60 backdrop-blur-xl border-r border-white/10 shadow-2xl transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:translate-x-0`}
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              ADMIN PANEL
            </h1>
            <button className="md:hidden text-zinc-400 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col space-y-2 px-4">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-purple-400 transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/50"
                  : "hover:bg-white/5 text-zinc-300 hover:text-purple-400"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("parcels")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === "parcels"
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/50"
                  : "hover:bg-white/5 text-zinc-300 hover:text-purple-400"
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Parcels</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === "users"
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/50"
                  : "hover:bg-white/5 text-zinc-300 hover:text-purple-400"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 text-zinc-100 hover:text-purple-400 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <h2 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-8">
            Admin Dashboard
          </h2>

          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Package, label: "Total Parcels", value: parcels.length, gradient: "from-purple-500 to-pink-500", trend: "+12%" },
                  { icon: UserCheck, label: "Total Users", value: users.length, gradient: "from-cyan-500 to-blue-500", trend: "+8%" },
                  { icon: BarChart3, label: "Delivered", value: delivered, gradient: "from-green-500 to-emerald-500", trend: "+15%" },
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

              <div className="grid md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                    <h3 className="text-xl font-black text-white mb-6">Parcel Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie 
                          data={pieData} 
                          dataKey="value" 
                          nameKey="name" 
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          stroke="none"
                        >
                          {pieData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                    <h3 className="text-xl font-black text-white mb-6">Monthly Delivery Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyData}>
                        <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          cursor={{fill: '#27272a'}}
                          contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                        />
                        <Bar dataKey="parcels" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table Sections */}
          {(activeTab === "parcels" || activeTab === "users") && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden p-1 md:p-4">
                {activeTab === "parcels" ? <AdminParcelsTable /> : <AdminUsersTable />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;