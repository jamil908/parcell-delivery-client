
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useGetAllParcelsQuery, useUpdateParcelMutation } from "@/redux/api/parcelApi";
import type { TParcelStatus } from "@/types/parcel.types";

export default function AdminParcelsTable() {
  const { data, refetch, isLoading } = useGetAllParcelsQuery();
  const [updateParcel ] = useUpdateParcelMutation();

  const handleStatusChange = async (parcelId: string, newStatus: string) => {
    try {
      const res =await updateParcel({ 
        id: parcelId, 
        payload: { status: newStatus as TParcelStatus } 
      }).unwrap();

      if (res?.success) {
        toast.success(`Status updated to "${newStatus}" ✅`);
        refetch(); // refresh parcel data
      } else {
        toast.error(res?.message || "Failed to update status ❌");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong ❌");
    }
  };

  if (isLoading) return <p>Loading parcels...</p>;

  const parcels = data?.data || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Parcels</h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Tracking ID</th>
              <th className="p-2 border">Receiver</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Weight (kg)</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Sender</th>
              <th className="p-2 border">Created</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel: any, index: number) => (
              <tr key={parcel._id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{parcel._id|| "N/A"}</td>
                <td className="p-2">{parcel.receiverName}</td>
                <td className="p-2">{parcel.receiverAddress}</td>
                <td className="p-2">{parcel.receiverPhone}</td>
                <td className="p-2">{parcel.weight}</td>
                <td className="p-2">
                  <Select
                    defaultValue={parcel.status}
                    onValueChange={(value) => handleStatusChange(parcel._id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="picked">Picked</SelectItem>
                      <SelectItem value="in-transit">In-Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-2">{parcel.senderId?.name || "N/A"}</td>
                <td className="p-2">{format(new Date(parcel.createdAt), "dd MMM yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
