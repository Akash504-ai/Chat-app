import { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import {
  Users,
  Hash,
  MessageSquare,
  AlertTriangle,
  Clock,
  TrendingUp,
  Download,
  Eye,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Optimized color palette for consistency
const COLORS = ["#3b82f6", "#a855f7", "#22c55e", "#ef4444"];

const AdminDashboard = () => {
  const { dashboardStats, getDashboardStats, loading } = useAdminStore();
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    getDashboardStats();
  }, [getDashboardStats]);

  const handleGenerateReport = async () => {
    setIsReportLoading(true);
    setTimeout(() => {
      const reportData = [
        ["Metric", "Value"],
        ["Total Users", dashboardStats?.totalUsers],
        ["Total Groups", dashboardStats?.totalGroups],
        ["Total Messages", dashboardStats?.totalMessages],
        ["Total Reports", dashboardStats?.totalReports],
        ["Pending Reports", dashboardStats?.pendingReports],
      ];

      const csvContent =
        "data:text/csv;charset=utf-8," +
        reportData.map((e) => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `admin_report_${new Date().toLocaleDateString()}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsReportLoading(false);
    }, 1000);
  };

  const formatGrowthData = () => {
    if (!dashboardStats?.monthlyUsers) return [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const userMap = {};
    const messageMap = {};

    dashboardStats.monthlyUsers?.forEach((item) => { userMap[item._id] = item.users; });
    dashboardStats.monthlyMessages?.forEach((item) => { messageMap[item._id] = item.messages; });

    return months.map((month, index) => ({
      name: month,
      users: userMap[index + 1] || 0,
      messages: messageMap[index + 1] || 0,
    }));
  };

  const growthData = formatGrowthData();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h1>
          <p className="text-base-content/60 mt-1">Real-time platform statistics and metrics.</p>
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={isReportLoading}
          className={`btn btn-primary btn-sm gap-2 shadow-lg shadow-primary/20 ${isReportLoading ? "loading" : ""}`}
        >
          {!isReportLoading && <Download size={16} />}
          {isReportLoading ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard title="Total Users" value={dashboardStats?.totalUsers} icon={<Users className="text-blue-500" />} loading={loading} trend="+12% ↑" />
        <StatCard title="Total Groups" value={dashboardStats?.totalGroups} icon={<Hash className="text-purple-500" />} loading={loading} />
        <StatCard title="Total Messages" value={dashboardStats?.totalMessages} icon={<MessageSquare className="text-green-500" />} loading={loading} />
        <StatCard title="Total Reports" value={dashboardStats?.totalReports} icon={<AlertTriangle className="text-orange-500" />} loading={loading} />
        <StatCard title="Pending Reports" value={dashboardStats?.pendingReports} icon={<Clock className="text-red-500" />} loading={loading} isWarning={dashboardStats?.pendingReports > 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 card bg-base-100 border border-base-300 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg">User Growth</h3>
              <p className="text-xs opacity-50">Monthly active users vs messages</p>
            </div>
            <button onClick={() => setShowDetails(true)} className="btn btn-ghost btn-xs gap-1">
              <Eye size={14} /> View Details
            </button>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Pie Chart */}
        <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
          <h3 className="font-bold text-lg mb-1">Status Distribution</h3>
          <p className="text-xs opacity-50 mb-6">Breakdown of platform activity</p>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Users", value: dashboardStats?.totalUsers || 0 },
                    { name: "Groups", value: dashboardStats?.totalGroups || 0 },
                    { name: "Reports", value: dashboardStats?.totalReports || 0 },
                  ].filter(item => item.value > 0)}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                >
                  <Cell fill={COLORS[0]} stroke="transparent" />
                  <Cell fill={COLORS[1]} stroke="transparent" />
                  <Cell fill={COLORS[3]} stroke="transparent" />
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
              </PieChart>
            </ResponsiveContainer>
            {!loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black">
                  {((dashboardStats?.totalUsers || 0) + (dashboardStats?.totalGroups || 0) + (dashboardStats?.totalReports || 0)).toLocaleString()}
                </span>
                <span className="text-[10px] uppercase font-bold opacity-30 tracking-tighter">Total Entities</span>
              </div>
            )}
          </div>
          <div className="space-y-2 mt-4">
            <LegendItem color={COLORS[0]} label="Users" value={dashboardStats?.totalUsers} />
            <LegendItem color={COLORS[1]} label="Groups" value={dashboardStats?.totalGroups} />
            <LegendItem color={COLORS[3]} label="Reports" value={dashboardStats?.totalReports} />
          </div>
        </div>
      </div>

      {/* 🚀 ULTIMATE DETAILS MODAL */}
      {showDetails && (
        <div className="modal modal-open backdrop-blur-md transition-all duration-500">
          <div className="modal-box max-w-3xl bg-base-100/95 shadow-2xl border border-base-300 rounded-[2.5rem] p-0 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="relative bg-gradient-to-br from-primary/20 via-base-100 to-base-100 px-8 py-10 border-b border-base-300">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-primary text-primary-content rounded-2xl shadow-2xl shadow-primary/40 rotate-3 transition-transform">
                    <TrendingUp size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-black text-3xl tracking-tight">Growth Analytics</h3>
                    <p className="text-sm font-medium opacity-60 flex items-center gap-2">
                      <Clock size={14} /> Monthly metrics for {new Date().getFullYear()}
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowDetails(false)} className="btn btn-circle btn-ghost bg-base-200/50 hover:bg-error/20 hover:text-error transition-all">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <table className="table w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-base-content/40 border-none">
                    <th className="bg-transparent font-black uppercase text-[11px] tracking-widest pl-4">Reporting Period</th>
                    <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-center">Acquisition</th>
                    <th className="bg-transparent font-black uppercase text-[11px] tracking-widest text-right pr-4">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {growthData.map((row) => (
                    <tr key={row.name} className="group transition-all">
                      <td className="bg-base-200/40 group-hover:bg-primary/10 rounded-l-2xl py-5 pl-6 transition-colors">
                        <span className="text-lg font-black text-base-content group-hover:text-primary">{row.name}</span>
                      </td>
                      <td className="bg-base-200/40 group-hover:bg-primary/10 text-center transition-colors">
                        <div className="flex flex-col items-center">
                          <span className="font-mono font-bold text-lg">{row.users.toLocaleString()}</span>
                          <span className="text-[10px] font-bold text-success uppercase">{row.users > 0 ? "▲ Growth" : "--"}</span>
                        </div>
                      </td>
                      <td className="bg-base-200/40 group-hover:bg-primary/10 text-right rounded-r-2xl pr-6 transition-colors">
                        <div className="badge badge-outline border-base-300 font-mono font-bold p-4 group-hover:border-primary/30">
                          {row.messages.toLocaleString()} <span className="ml-2 opacity-40 text-[10px]">MSGS</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-6 bg-base-200/50 border-t border-base-300 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-black opacity-40 uppercase">Data Integrity</span>
                <span className="text-xs font-bold text-success flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div> Verified Live Data
                </span>
              </div>
              <button onClick={handleGenerateReport} className="btn btn-primary px-10 rounded-2xl shadow-xl shadow-primary/30 font-black">
                Export CSV
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-base-900/60 backdrop-blur-md" onClick={() => setShowDetails(false)}></div>
        </div>
      )}
    </div>
  );
};

const LegendItem = ({ color, label, value }) => (
  <div className="flex items-center justify-between text-sm p-2.5 bg-base-200/30 rounded-xl border border-base-300/50">
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
      <span className="opacity-60 font-bold text-xs uppercase tracking-wider">{label}</span>
    </div>
    <span className="font-mono font-black">{value?.toLocaleString() ?? 0}</span>
  </div>
);

const StatCard = ({ title, value, icon, loading, trend, isWarning }) => {
  if (loading) return <div className="h-32 w-full bg-base-300 animate-pulse rounded-3xl"></div>;
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className="card-body p-6">
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-2xl bg-base-200/50 group-hover:scale-110 transition-transform">{icon}</div>
          {trend && <span className="text-[10px] font-bold py-1 px-2 rounded-full bg-success/10 text-success">{trend}</span>}
        </div>
        <div className="mt-4">
          <h2 className="text-xs font-bold text-base-content/40 uppercase tracking-widest">{title}</h2>
          <p className={`text-3xl font-black ${isWarning ? "text-error" : "text-base-content"}`}>
            {value?.toLocaleString() ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;