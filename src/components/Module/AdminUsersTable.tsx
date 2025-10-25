
import { Button } from "../ui/button";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserBlockStatusMutation, useUpdateUserRoleMutation } from "@/redux/api/userApi";
import toast from "react-hot-toast";
import type { TUserRole } from "@/types/user.types";


const AdminUsersTable = () => {
    const { data, refetch, isLoading } = useGetAllUsersQuery();

  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserBlockStatus] = useUpdateUserBlockStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <p>Loading users...</p>;

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await updateUserRole({ id, payload: { role: role as TUserRole } }).unwrap();
      toast.success("✅ User role updated successfully!");
      refetch()
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update role");
    }
  };

  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    try {
      await updateUserBlockStatus({ id, payload: { isBlocked: !isBlocked } }).unwrap();
      alert(`User ${isBlocked ? "unblocked" : "blocked"} successfully`);
    } catch (err) {
      console.error(err);
      alert("Failed to update block status");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id).unwrap();
      alert("🗑️ User deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">👥 User Management</h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border   px-1  md:px-3  md:py-2">Name</th>
            <th className="border  px-1  md:px-3  md:py-2">Email</th>
            <th className="border  px-1  md:px-3  md:py-2">Role</th>
            <th className="border  px-1  md:px-3  md:py-2">Status</th>
            <th className="border  px-1  md:px-3  md:py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((user) => (
            <tr key={user._id}>
              <td className="border  px-1  md:px-3  md:py-2">{user.name}</td>
              <td className="border  px-1  md:px-3  md:py-2">{user.email}</td>

              {/* Role select dropdown */}
              <td className="border  px-1  md:px-3  md:py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="admin">Admin</option>
                  <option value="sender">Sender</option>
                  <option value="receiver">Receiver</option>
                  <option value="customer">Customer</option>
                </select>
              </td>

              <td className="border  px-1  md:px-3  md:py-2">
                {user.isBlocked ? (
                  <span className="text-red-600 font-medium">Blocked</span>
                ) : (
                  <span className="text-green-600 font-medium">Active</span>
                )}
              </td>

              <td className="border  px-1  md:px-3  md:py-2 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default AdminUsersTable;
