/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useGetAllParcelsQuery, useUpdateParcelMutation } from "@/redux/api/parcelApi";
import type { TParcelStatus } from "@/types/parcel.types";

export default function AdminParcelsTable() {
  const { data, refetch, isLoading } = useGetAllParcelsQuery();
  const [updateParcel] = useUpdateParcelMutation();

  const handleStatusChange = async (parcelId: string, newStatus: string) => {
    try {
      const res = await updateParcel({ 
        id: parcelId, 
        payload: { status: newStatus as TParcelStatus } 
      }).unwrap();

      if (res?.success) {
        toast.success(`Status updated to "${newStatus}" ✅`, {
          style: { background: '#18181b', color: '#fff', border: '1px solid #f59e0b' }
        });
        refetch();
      } else {
        toast.error(res?.message || "Failed to update status ❌");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong ❌");
    }
  };

  if (isLoading) return <p className="text-amber-500 animate-pulse">Loading parcels...</p>;

  const parcels = data?.data || [];

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-white">All Parcels</h2>
        <p className="text-zinc-400 text-sm">Manage and track all shipments in the system.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-800/50 text-zinc-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4 border-b border-zinc-800">#</th>
              <th className="p-4 border-b border-zinc-800">Tracking ID</th>
              <th className="p-4 border-b border-zinc-800">Receiver</th>
              <th className="p-4 border-b border-zinc-800">Address</th>
              <th className="p-4 border-b border-zinc-800">Phone</th>
              <th className="p-4 border-b border-zinc-800 text-center">Weight (kg)</th>
              <th className="p-4 border-b border-zinc-800">Status</th>
              <th className="p-4 border-b border-zinc-800">Sender</th>
              <th className="p-4 border-b border-zinc-800">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {parcels.map((parcel: any, index: number) => (
              <tr key={parcel._id} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="p-4 text-zinc-500">{index + 1}</td>
                <td className="p-4 font-mono text-zinc-300 text-xs">{parcel._id || "N/A"}</td>
                <td className="p-4 text-white font-medium">{parcel.receiverName}</td>
                <td className="p-4 text-zinc-400 max-w-[200px] truncate">{parcel.receiverAddress}</td>
                <td className="p-4 text-zinc-400">{parcel.receiverPhone}</td>
                <td className="p-4 text-center text-amber-500 font-semibold">{parcel.weight}</td>
                <td className="p-4">
                  <Select
                    defaultValue={parcel.status}
                    onValueChange={(value) => handleStatusChange(parcel._id, value)}
                  >
                    <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700 text-zinc-200 focus:ring-amber-500">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                      <SelectItem value="pending" className="focus:bg-amber-600 focus:text-white">Pending</SelectItem>
                      <SelectItem value="picked" className="focus:bg-amber-600 focus:text-white">Picked</SelectItem>
                      <SelectItem value="in-transit" className="focus:bg-amber-600 focus:text-white">In-Transit</SelectItem>
                      <SelectItem value="delivered" className="focus:bg-amber-600 focus:text-white">Delivered</SelectItem>
                      <SelectItem value="cancelled" className="focus:bg-amber-600 focus:text-white">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-4 text-zinc-300">{parcel.senderId?.name || "N/A"}</td>
                <td className="p-4 text-zinc-500">
                  {parcel.createdAt ? format(new Date(parcel.createdAt), "dd MMM yyyy") : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {parcels.length === 0 && (
        <div className="p-20 text-center">
          <p className="text-zinc-500">No parcels found in the records.</p>
        </div>
      )}
    </div>
  );
}