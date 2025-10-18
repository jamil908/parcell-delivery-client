import React, { useState } from "react";
import {
  Package,
  Users,
 
  BarChart3,
  
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { useGetAllParcelsQuery } from "@/redux/api/parcelApi";
import {  useGetAllUsersQuery, } from "@/redux/api/userApi";

import AdminUsersTable from "@/components/Module/AdminUsersTable";
import AdminParcelsTable from "@/components/Module/AdminPatcelsTable";
import Navbar from "@/components/shared/Navbar";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard: React.FC = () => {
 
  const [activeTab, setActiveTab] = useState<"overview" | "parcels" | "users">("overview");

  const { data: parcelsData } = useGetAllParcelsQuery();
  const { data: usersData } = useGetAllUsersQuery();
  const parcels = parcelsData?.data || [];
  const users = usersData?.data || [];

  // ✅ Parcel Status Count
  const delivered = parcels.filter((p) => p.status === "delivered").length;
  const inTransit = parcels.filter((p) => p.status === "in-transit").length;
  const pending = parcels.filter((p) => p.status === "pending").length;

  // ✅ Pie Chart Data
  const pieData = [
    { name: "Delivered", value: delivered },
    { name: "In Transit", value: inTransit },
    { name: "Pending", value: pending },
  ];

  // ✅ Bar Chart Data (Monthly)
  const monthlyData = [
    { month: "Jan", parcels: 12 },
    { month: "Feb", parcels: 18 },
    { month: "Mar", parcels: 22 },
    { month: "Apr", parcels: 15 },
    { month: "May", parcels: 28 },
  ];

  return (
    <div className=" bg-gray-50 min-h-screen">
      <Navbar></Navbar>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["overview", "parcels", "users"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            {tab === "overview"
              ? "Overview"
              : tab === "parcels"
              ? "Parcels"
              : "Users"}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
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
            {/* Pie Chart */}
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

            {/* Bar Chart */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">Monthly Parcels</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="parcels" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Parcels Tab */}
      {activeTab === "parcels" && (
       <AdminParcelsTable></AdminParcelsTable>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
       <AdminUsersTable></AdminUsersTable>
      )}
    </div>
  );
};

export default AdminDashboard;
