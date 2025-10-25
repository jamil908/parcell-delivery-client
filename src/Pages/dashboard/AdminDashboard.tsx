


import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Package,
  Users,
  BarChart3,
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

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "parcels" | "users"
  >("overview");
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
  <div className="bg-gray-50 min-h-screen ">
      <div className="hidden md:block">
        <Navbar />
      </div>

  <div className=" flex">
      {/* Sidebar */}
    <aside
      className={`fixed md:static z-40 top-0 left-0 min-h-screen w-64 bg-white border-r shadow-md transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
        <button
          className="md:hidden text-gray-600"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="mt-6 flex flex-col space-y-2 px-4">
        <Link
          to="/"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700"
        >
          <Home className="w-5 h-5 text-blue-600" />
          <span>Home</span>
        </Link>

        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "overview"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-50 text-gray-700"
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("parcels")}
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "parcels"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-50 text-gray-700"
          }`}
        >
          <Package className="w-5 h-5" />
          <span>Parcels</span>
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-50 text-gray-700"
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Users</span>
        </button>
      </nav>
    </aside>

    {/* Main Content */}
    <div className="flex-1 p-2 md:p-8 overflow-x-hidden">
  
      {/* Mobile menu toggle */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

      {/* Overview */}
      {activeTab === "overview" && (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center space-x-3">
                <Package className="text-blue-600" />
                <div>
                  <p className="text-gray-600">Total Parcels</p>
                  <h3 className="text-xl font-semibold">{parcels.length}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center space-x-3">
                <Users className="text-green-600" />
                <div>
                  <p className="text-gray-600">Total Users</p>
                  <h3 className="text-xl font-semibold">{users.length}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center space-x-3">
                <BarChart3 className="text-yellow-600" />
                <div>
                  <p className="text-gray-600">Delivered Parcels</p>
                  <h3 className="text-xl font-semibold">{delivered}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">Parcel Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" label>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">Monthly Parcels</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="parcels" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Parcels Tab */}
      {activeTab === "parcels" && (
        <div className="bg-white rounded-xl shadow md:p-4 p-1">
          <AdminParcelsTable />
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="bg-white rounded-xl shadow  md:p-4 p-1">
          <AdminUsersTable />
        </div>
      )}
    </div>
  </div>
  </div>
);
};

export default AdminDashboard;
