import { useLocation, Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { 
  Bell, 
  User, 
  ChevronRight, 
  Moon, 
  Sun, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const AdminLayout = ({ children }) => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="flex h-screen bg-base-200/50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Section */}
        <header className="h-16 border-b border-base-300 bg-base-100 flex items-center justify-between px-8 shrink-0">
          
          {/* Breadcrumbs */}
          <div className="text-sm breadcrumbs py-0">
            <ul>
              <li className="text-base-content/50">
                <Link to="/admin">Admin</Link>
              </li>
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                return value === "admin" ? null : (
                  <li
                    key={to}
                    className={last ? "text-base-content font-bold" : "text-base-content/50"}
                  >
                    <Link to={to} className="capitalize">
                      {value}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle (Optional: uncomment if needed) */}
            {/* <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
              <input type="checkbox" className="theme-controller" value="dark" />
              <Sun className="swap-on" size={20} />
              <Moon className="swap-off" size={20} />
            </label> 
            */}

            <div className="divider divider-horizontal mx-1"></div>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 cursor-pointer hover:bg-base-200 p-1 pr-3 rounded-full transition-colors"
              >
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-8 ring ring-offset-base-100 ring-offset-1">
                    {authUser?.profilePic ? (
                      <img src={authUser.profilePic} alt="profile" />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold leading-none">
                    {authUser?.fullName || "Admin User"}
                  </p>
                  <p className="text-[10px] opacity-50 uppercase mt-0.5 font-black tracking-tighter text-primary">
                    Super Admin
                  </p>
                </div>
              </div>

              {/* Dropdown Content */}
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 border border-base-300 rounded-box w-52 mt-4 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary" />
                    <span>Settings</span>
                  </Link>
                </li>
                
                <div className="divider my-1 border-base-300 px-2"></div>
                
                <li>
                  <button 
                    className="flex items-center gap-2 text-error font-bold hover:bg-error/10" 
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;