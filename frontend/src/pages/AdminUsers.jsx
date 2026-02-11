import { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { 
  Search, ShieldAlert, Trash2, UserCheck, UserX, 
  ChevronLeft, ChevronRight, Mail, Eye, ShieldCheck, 
  Bot, Filter 
} from "lucide-react";

const AdminUsers = () => {
  const { users, getUsers, toggleBanUser, deleteUser, loading } = useAdminStore();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Assuming you update your store to accept role as 3rd param
    getUsers(page, search, roleFilter);
  }, [page, roleFilter, getUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getUsers(1, search, roleFilter);
  };

  if (loading && page === 1) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 🚀 1. Stats Bar */}
      <div className="stats shadow-sm border border-base-300 bg-base-100 w-full lg:w-fit">
        <div className="stat px-8">
          <div className="stat-title text-xs uppercase font-bold tracking-widest">Platform Users</div>
          <div className="stat-value text-primary flex items-baseline gap-2">
            {users.length}
            <span className="text-sm font-normal text-base-content/50 italic">on this page</span>
          </div>
          <div className="stat-desc mt-1">Total connected accounts</div>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">User Management</h1>
          <p className="text-base-content/60 mt-1">Audit users, manage permissions, and handle bans.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* 🚀 2. Role Filter */}
          <div className="flex items-center gap-2 bg-base-100 border border-base-300 rounded-lg px-3 py-1">
            <Filter size={14} className="opacity-50" />
            <select 
              className="select select-sm select-ghost focus:bg-transparent focus:outline-none font-medium"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered input-sm pl-10 w-64 focus:input-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm px-6">Search</button>
          </form>
        </div>
      </div>

      {/* Users Table */}
      <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-md">
            <thead className="bg-base-200/50">
              <tr>
                <th className="py-4">User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {users.map((user) => {
                const isMetaAI = user.email === "ai@chat.app";
                const isAdmin = user.role === "admin";

                return (
                  <tr key={user._id} className="hover:bg-base-200/30 transition-colors group">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder relative">
                          {/* 🚀 6. Online Indicator */}
                          {user.isOnline && (
                            <span className="absolute z-10 top-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-100"></span>
                          )}
                          <div className={`rounded-full w-10 ring ring-offset-base-100 ring-offset-2 ${isMetaAI ? 'ring-primary bg-primary/10' : 'bg-neutral ring-transparent'}`}>
                            {isMetaAI ? <Bot size={20} className="text-primary" /> : <span className="text-neutral-content text-xs">{user.fullName.charAt(0)}</span>}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            {user.fullName}
                            {isMetaAI && <span className="badge badge-primary badge-xs py-2 uppercase font-black text-[8px]">System AI</span>}
                          </div>
                          <div className="text-xs opacity-50 flex items-center gap-1"><Mail size={12} /> {user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-sm font-bold tracking-wide ${isAdmin ? 'badge-secondary' : 'badge-ghost'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {user.isBanned ? (
                        <div className="badge badge-error badge-outline gap-1 text-[10px] font-bold">
                          <ShieldAlert size={12} /> Banned
                        </div>
                      ) : (
                        <div className="badge badge-success badge-outline gap-1 text-[10px] font-bold">
                          <UserCheck size={12} /> Active
                        </div>
                      )}
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* 🚀 4. View Profile Button */}
                        <button 
                          className="btn btn-square btn-sm btn-ghost" 
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye size={16} />
                        </button>

                        {/* for now removing the ban...............[FUTURE FEATURE...]*/}
                        {/* 🚀 3. Prevent Admin/AI Banning
                        <button
                          className={`btn btn-square btn-sm ${user.isBanned ? "btn-success" : "btn-warning"}`}
                          disabled={isAdmin || isMetaAI}
                          onClick={() => toggleBanUser(user._id)}
                          title={isAdmin ? "Cannot ban admins" : "Toggle Ban"}
                        >
                          {user.isBanned ? <UserCheck size={16} /> : <UserX size={16} />}
                        </button> */}

                        {/* 🚀 Meta AI Protection */}
                        <button
                          className="btn btn-square btn-sm btn-error btn-outline"
                          disabled={isMetaAI || (isAdmin && user.email !== "your-email@admin.com")} // Only super-admin or protect all admins
                          onClick={() => document.getElementById(`delete_modal_${user._id}`).showModal()}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* 🚀 5. Confirm Modal */}
                      <dialog id={`delete_modal_${user._id}`} className="modal modal-bottom sm:modal-middle text-left">
                        <div className="modal-box border border-error/20">
                          <h3 className="font-bold text-lg text-error flex items-center gap-2">
                            <ShieldAlert /> Critical Action
                          </h3>
                          <p className="py-4">Are you sure you want to permanently delete <strong>{user.fullName}</strong>? This action cannot be undone and will remove all their data.</p>
                          <div className="modal-action">
                            <form method="dialog" className="flex gap-2">
                              <button className="btn btn-ghost btn-sm">Cancel</button>
                              <button className="btn btn-error btn-sm" onClick={() => deleteUser(user._id)}>Confirm Delete</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-base-200 flex items-center justify-between bg-base-200/10">
          <span className="text-xs font-bold opacity-40 uppercase tracking-tighter">Navigation — Page {page}</span>
          <div className="join shadow-sm">
            <button className="join-item btn btn-sm px-4" disabled={page === 1} onClick={() => setPage(prev => prev - 1)}><ChevronLeft size={16} /></button>
            <button className="join-item btn btn-sm no-animation bg-base-100 font-bold">{page}</button>
            <button className="join-item btn btn-sm px-4" onClick={() => setPage(prev => prev + 1)}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* 🚀 4. View Profile Modal Content */}
      {selectedUser && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-sm text-center">
            <div className="avatar placeholder mb-4">
              <div className="bg-primary text-primary-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-4">
                <span className="text-3xl">{selectedUser.fullName.charAt(0)}</span>
              </div>
            </div>
            <h3 className="font-bold text-xl">{selectedUser.fullName}</h3>
            <p className="text-sm opacity-60 mb-6">{selectedUser.email}</p>
            
            <div className="grid grid-cols-2 gap-4 text-left mb-6">
              <div className="bg-base-200 p-3 rounded-xl">
                <p className="text-[10px] uppercase opacity-50 font-bold">Role</p>
                <p className="font-semibold text-sm capitalize">{selectedUser.role}</p>
              </div>
              <div className="bg-base-200 p-3 rounded-xl">
                <p className="text-[10px] uppercase opacity-50 font-bold">Status</p>
                <p className="font-semibold text-sm capitalize">{selectedUser.isOnline ? "Online" : "Offline"}</p>
              </div>
              <div className="bg-base-200 p-3 rounded-xl col-span-2">
                <p className="text-[10px] uppercase opacity-50 font-bold">Member Since</p>
                <p className="font-semibold text-sm">
                  {new Date(selectedUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            
            <button className="btn btn-block btn-ghost btn-sm" onClick={() => setSelectedUser(null)}>Close Profile</button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedUser(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default AdminUsers;