

import { useState } from "react";
import { LogOut, Package, Menu, X } from "lucide-react"; 
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { useGetMeQuery } from "@/redux/api/userApi";
import { logout as logoutAction } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/api/authApi";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const user = data?.user || null;

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileLogout = () => {
    handleLogout();
    closeMobileMenu();
  };


  const navLinks = (
    <>
      <Link
        to="/"
        className="text-gray-700 hover:text-blue-600 transition block px-3 py-2 rounded-md text-base md:text-sm font-medium"
        onClick={closeMobileMenu}
      >
        Home
      </Link>
      <Link
        to="/about"
        className="text-gray-700 hover:text-blue-600 transition block px-3 py-2 rounded-md text-base md:text-sm font-medium"
        onClick={closeMobileMenu}
      >
        About
      </Link>
      <Link
        to="/contact"
        className="text-gray-700 hover:text-blue-600 transition block px-3 py-2 rounded-md text-base md:text-sm font-medium"
        onClick={closeMobileMenu}
      >
        Contact
      </Link>
      <Link
        to="/tracking"
        className="text-gray-700 hover:text-blue-600 transition block px-3 py-2 rounded-md text-base md:text-sm font-medium"
        onClick={closeMobileMenu}
      >
        Track Parcel
      </Link>
    </>
  );

 
  const roleLinks = (
    <>
      {user?.role === "sender" && (
        <Link
          to="/sender-dashboard"
          className="text-gray-700 hover:text-blue-600 transition block px-3 py-2 rounded-md text-base md:text-sm font-medium"
          onClick={closeMobileMenu}
        >
          Sender Dashboard
        </Link>
      )}
      {user?.role === "receiver" && (
        <Link
          to="/receiver-dashboard"
          className="text-gray-700 hover:text-blue-600 transition block px-3 py-2 rounded-md text-base md:text-sm font-medium"
          onClick={closeMobileMenu}
        >
          Receiver Dashboard
        </Link>
      )}
      {user?.role === "admin" && (
        <Link
          to="/admin-dashboard"
          className="text-gray-700 hover:text-blue-600 transition block px-3 py-2 rounded-md text-base md:text-sm font-medium"
          onClick={closeMobileMenu}
        >
          Admin Dashboard
        </Link>
      )}
    </>
  );

 
  const desktopAuthLinks = (
    <div className="flex items-center space-x-4">
      {isLoading ? (
     
        <>
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
        </>
      ) : user ? (
     
        <>
          <span className="text-gray-900 font-medium">{user.name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </>
      ) : (
       
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
    </div>
  );

  const mobileAuthLinks = (
    <div className="pt-4 pb-3 border-t border-gray-200">
      {isLoading ? (
        
        <div className="px-5">
          <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      ) : user ? (
        
        <div className="px-5">
          <div className="text-base font-medium text-gray-900">
            {user.name}
          </div>
          {user.email && (
            <div className="text-sm font-medium text-gray-500 mt-1">
              {user.email}
            </div>
          )}
          <button
            onClick={handleMobileLogout}
            className="mt-3 w-full flex items-center justify-center space-x-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <div className="px-5 space-y-3">
          <Link
            to="/login"
            className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={closeMobileMenu}
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div>
      
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
         
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                ParcelPro
              </span>
            </Link>

        
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                {navLinks}
                {roleLinks}
              </div>
              {desktopAuthLinks}
            </div>

           
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>

  
        <div
          className={`
            ${isMobileMenuOpen ? 'block' : 'hidden'} 
            md:hidden 
            absolute top-16 left-0 w-full bg-white shadow-xl
            transition-all duration-300 ease-in-out
          `}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks}
            {roleLinks}
          </div>
          {mobileAuthLinks}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;