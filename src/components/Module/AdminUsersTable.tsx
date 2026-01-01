import { Button } from "../ui/button";
import { 
  useDeleteUserMutation, 
  useGetAllUsersQuery, 
  useUpdateUserBlockStatusMutation, 
  useUpdateUserRoleMutation 
} from "@/redux/api/userApi";
import toast from "react-hot-toast";
import type { TUserRole } from "@/types/user.types";

const AdminUsersTable = () => {
  const { data, refetch, isLoading } = useGetAllUsersQuery();

  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserBlockStatus] = useUpdateUserBlockStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <p className="text-amber-500 animate-pulse p-4">Loading users...</p>;

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await updateUserRole({ id, payload: { role: role as TUserRole } }).unwrap();
      toast.success("✅ User role updated successfully!", {
        style: { background: '#18181b', color: '#fff', border: '1px solid #f59e0b' }
      });
      refetch();
    } catch (err) {
      toast.error("❌ Failed to update role");
    }
  };

  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    try {
      await updateUserBlockStatus({ id, payload: { isBlocked: !isBlocked } }).unwrap();
      toast.success(`User ${isBlocked ? "unblocked" : "blocked"} successfully`, {
        style: { background: '#18181b', color: '#fff', border: '1px solid #f59e0b' }
      });
      refetch();
    } catch (err) {
      toast.error("Failed to update block status");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id).unwrap();
      toast.success("🗑️ User deleted successfully", {
        style: { background: '#18181b', color: '#fff', border: '1px solid #ef4444' }
      });
      refetch();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-white">👥 User Management</h2>
        <p className="text-zinc-400 text-sm">Assign roles and manage access for all registered users.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-800/50 text-zinc-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4 border-b border-zinc-800">Name</th>
              <th className="p-4 border-b border-zinc-800">Email</th>
              <th className="p-4 border-b border-zinc-800">Role</th>
              <th className="p-4 border-b border-zinc-800">Status</th>
              <th className="p-4 border-b border-zinc-800">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {data?.data?.map((user: any) => (
              <tr key={user._id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="p-4 text-white font-medium">{user.name}</td>
                <td className="p-4 text-zinc-400">{user.email}</td>

                {/* Role select dropdown */}
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-md px-2 py-1 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="sender">Sender</option>
                    <option value="receiver">Receiver</option>
                    <option value="customer">Customer</option>
                  </select>
                </td>

                <td className="p-4">
                  {user.isBlocked ? (
                    <span className="bg-red-900/20 text-red-500 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide border border-red-900/50">
                      Blocked
                    </span>
                  ) : (
                    <span className="bg-emerald-900/20 text-emerald-500 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide border border-emerald-900/50">
                      Active
                    </span>
                  )}
                </td>

                <td className="p-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-black hover:bg-zinc-800 hover:text-white"
                    onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-600/10 text-red-500 border border-red-600/20 hover:bg-red-600 hover:text-white transition-all"
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

      {data?.data?.length === 0 && (
        <div className="p-20 text-center">
          <p className="text-zinc-500">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsersTable;