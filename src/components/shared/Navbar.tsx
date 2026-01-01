
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

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/tracking", label: "Track Parcel" },
  ];

  const getDashboardLink = () => {
    if (user?.role === "sender") return { to: "/sender-dashboard", label: "Dashboard" };
    if (user?.role === "receiver") return { to: "/receiver-dashboard", label: "Dashboard" };
    if (user?.role === "admin") return { to: "/admin-dashboard", label: "Admin" };
    return null;
  };

  const dashboardLink = getDashboardLink();

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ParcelPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-zinc-300 hover:text-purple-400 transition-colors px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            {dashboardLink && (
              <Link
                to={dashboardLink.to}
                className="text-zinc-300 hover:text-purple-400 transition-colors px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5"
              >
                {dashboardLink.label}
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <>
                <div className="h-6 w-20 bg-white/10 rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse"></div>
              </>
            ) : user ? (
              <>
                <span className="text-zinc-300 font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-zinc-300 hover:text-red-400 transition-colors group"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-zinc-300 hover:text-purple-400 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-300 hover:text-purple-400 focus:outline-none transition-colors"
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

      {/* Mobile Menu */}
      <div
        className={`
          ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} 
          md:hidden 
          overflow-hidden
          transition-all duration-300 ease-in-out
          bg-black/95 backdrop-blur-xl border-t border-white/10
        `}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block text-zinc-300 hover:text-purple-400 hover:bg-white/5 transition-all px-4 py-3 rounded-lg text-base font-medium"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          {dashboardLink && (
            <Link
              to={dashboardLink.to}
              className="block text-zinc-300 hover:text-purple-400 hover:bg-white/5 transition-all px-4 py-3 rounded-lg text-base font-medium"
              onClick={closeMobileMenu}
            >
              {dashboardLink.label}
            </Link>
          )}

          {/* Mobile Auth */}
          <div className="pt-6 mt-6 border-t border-white/10">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-6 w-1/2 bg-white/10 rounded animate-pulse"></div>
                <div className="h-12 w-full bg-white/10 rounded-lg animate-pulse"></div>
              </div>
            ) : user ? (
              <div>
                <div className="text-base font-bold text-white mb-1">
                  {user.name}
                </div>
                {user.email && (
                  <div className="text-sm text-zinc-400 mb-4">
                    {user.email}
                  </div>
                )}
                <button
                  onClick={handleMobileLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-base font-bold text-white bg-gradient-to-r from-red-600 to-pink-600 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3 rounded-lg text-base font-bold text-zinc-300 hover:text-purple-400 hover:bg-white/5 transition-all"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;