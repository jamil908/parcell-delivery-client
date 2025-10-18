import { useLogoutMutation } from '@/redux/api/authApi';
import { useGetMeQuery } from '@/redux/api/userApi';
import { useAppDispatch } from '@/redux/hooks';
import { LogOut, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { logout as logoutAction } from "@/redux/features/authSlice";

const Navbar = () => {

      const dispatch = useAppDispatch();
      const navigate = useNavigate();
    
  const { data, isLoading } = useGetMeQuery(undefined, {
      refetchOnMountOrArgChange: true, 
    });
    
    console.log("Full API Response Data:", data);
  
      console.log(data);
const user = data?.user || null; 
    
    console.log("Extracted User Object:", user);
    console.log(user);
    
      const [logoutMutation] = useLogoutMutation();
    
      const handleLogout = async () => {
        try {
          await logoutMutation().unwrap();
          dispatch(logoutAction());
          toast.success("Logged out successfully");
          navigate("/login");
        } catch {
          dispatch(logoutAction());
          navigate("/login");
        }
      };
    
  return (
    <div>
            {/* Navbar */}
              <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                      <Package className="w-8 h-8 text-blue-600" />
                      <span className="text-2xl font-bold text-gray-900">
                        ParcelProsss
                      </span>
                    </div>
        
                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                      <Link
                        to="/"
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        Home
                      </Link>
                      <Link
                        to="/about"
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        About
                      </Link>
                      <Link
                        to="/contact"
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        Contact
                      </Link>
                      <Link
                        to="/tracking"
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        Track Parcel
                      </Link>
        
                      {/* Role-based Dashboards */}
                      {user?.role === "sender" && (
                        <Link
                          to="/sender-dashboard"
                          className="text-gray-700 hover:text-blue-600 transition"
                        >
                          Sender Dashboard
                        </Link>
                      )}
                      {user?.role === "receiver" && (
                        <Link
                          to="/receiver-dashboard"
                          className="text-gray-700 hover:text-blue-600 transition"
                        >
                          Receiver Dashboard
                        </Link>
                      )}
                      {user?.role === "admin" && (
                        <Link
                          to="/sender-admin"
                          className="text-gray-700 hover:text-blue-600 transition"
                        >
                          Admin Dashboard
                        </Link>
                      )}
        
                      {/* Auth Buttons */}
                      {!isLoading && !user && (
                        <>
                          <Link
                            to="/login"
                            className="text-gray-700 hover:text-blue-600 transition"
                          >
                            Login
                          </Link>
                          <Link
                            to="/register"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                          >
                            Get Started
                          </Link>
                        </>
                      )}
        
        {!isLoading && user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-900">{user.name}</span>
            <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Get Started</Link>
          </>
        )}
                    </div>
        
                    {/* Mobile menu login button */}
                    <div className="md:hidden">
                      {!user && (
                        <Link
                          to="/login"
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </nav>
        


    </div>
  )
}

export default Navbar