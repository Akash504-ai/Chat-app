import { NavLink } from "react-router-dom";
// Tip: Install lucide-react for clean, lightweight icons
import { LayoutDashboard, Users, FileBarChart, Settings } from "lucide-react";

const AdminSidebar = () => {
  const navItems = [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} />, end: true },
    { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
    { to: "/admin/reports", label: "Reports", icon: <FileBarChart size={18} /> },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-base-100 border-r border-base-300">
      {/* Header / Logo Section */}
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold">
            A
          </div>
          <h2 className="text-xl font-bold tracking-tight">AdminPanel</h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-primary text-primary-content shadow-md" 
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }`
            }
          >
            <span className="shrink-0">{item.icon}</span>
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / User Section */}
      {/* <div > //className="p-4 border-t border-base-300" */}
        {/* <button className="btn btn-ghost btn-sm w-full justify-start gap-3 opacity-70 hover:opacity-100">
          <Settings size={18} />
          Settings
        </button> */}
      {/* </div> */}
    </div>
  );
};

export default AdminSidebar;