import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Menu, MessageSquare, Settings, User, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [open, setOpen] = useState(false);

  return (
    // 🔥 FIX: sticky instead of fixed
    <header className="sticky top-0 z-40 w-full border-b border-base-300 bg-base-100/80 backdrop-blur">
      <div className="container mx-auto h-16 px-4">
        <div className="flex h-full items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-semibold"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <span>PASO</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/settings" className="btn btn-ghost btn-sm gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-ghost btn-sm gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-outline btn-error btn-sm gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden btn btn-ghost btn-sm"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-base-300 bg-base-100 px-4 py-3">
          <div className="flex flex-col gap-2">
            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="btn btn-ghost btn-sm justify-start gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="btn btn-ghost btn-sm justify-start gap-2"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="btn btn-outline btn-error btn-sm justify-start gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
