import { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  ShieldAlert,
  Trash2,
  User,
  ArrowRight,
  Filter,
  MoreVertical,
  Flag,
  MessageSquare,
} from "lucide-react";

const AdminReports = () => {
  const {
    reports,
    getReports,
    updateReportStatus,
    banUserFromReport,
    deleteReportedMessage,
    deleteReport,
    loading,
  } = useAdminStore();

  const [filter, setFilter] = useState("");

  useEffect(() => {
    getReports(filter);
  }, [filter, getReports]);

  const getStatusBadge = (status) => {
    const styles = {
      pending: "badge-warning bg-warning/10 text-warning border-warning/20",
      reviewed: "badge-info bg-info/10 text-info border-info/20",
      resolved: "badge-success bg-success/10 text-success border-success/20",
      rejected: "badge-error bg-error/10 text-error border-error/20",
    };
    return (
      <div className={`badge font-black text-[10px] uppercase tracking-wider py-3 px-4 ${styles[status] || "badge-ghost"}`}>
        {status}
      </div>
    );
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Fetching Reports...</p>
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-error/10 text-error rounded-2xl shadow-inner">
            <Flag size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Reports</h1>
            <p className="text-base-content/50 font-medium">
              Priority moderation queue & user safety management.
            </p>
          </div>
        </div>

        {/* Filter UI */}
        <div className="flex items-center gap-3 bg-base-200/50 p-2 rounded-2xl border border-base-300">
          <div className="pl-3 text-base-content/40">
            <Filter size={16} />
          </div>
          <select
            className="select select-ghost select-sm focus:bg-transparent font-bold text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Reports</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="card bg-base-100 border border-base-300 shadow-xl rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-lg w-full border-separate border-spacing-0">
            <thead className="bg-base-200/30">
              <tr className="text-base-content/40 border-none">
                <th className="py-6 font-black uppercase text-[11px] tracking-widest pl-8">Entities Involved</th>
                <th className="py-6 font-black uppercase text-[11px] tracking-widest">Reason & Content</th>
                <th className="py-6 font-black uppercase text-[11px] tracking-widest">Status</th>
                <th className="py-6 font-black uppercase text-[11px] tracking-widest text-right pr-8">Management</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-base-200">
              {reports.map((report) => (
                <tr key={report._id} className="group hover:bg-base-200/40 transition-all">
                  
                  {/* Entities Column */}
                  <td className="pl-8 py-6">
                    <div className="flex items-center gap-4">
                      {/* Reporter */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-black opacity-30 uppercase tracking-tighter">Reporter</span>
                        <div className="flex items-center gap-2">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-lg w-8">
                              <span className="text-xs uppercase">{report.reporter?.fullName?.charAt(0)}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">{report.reporter?.fullName}</div>
                            <div className="text-[10px] opacity-40 font-mono">{report.reporter?.email}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 bg-base-300/50 rounded-full">
                        <ArrowRight size={14} className="opacity-40" />
                      </div>

                      {/* Reported Entity */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-error/60 uppercase tracking-tighter">Target</span>
                        <div className="flex items-center gap-2">
                          <div className="avatar placeholder">
                            <div className="bg-error/10 text-error rounded-lg w-8">
                              <span className="text-xs font-bold uppercase">
                                {report.reportedUser?.fullName?.charAt(0) || "M"}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-sm text-error">
                              {report.reportedUser?.fullName || "Chat Message"}
                            </div>
                            <div className="text-[10px] opacity-40 font-mono">{report.reportedUser?.email || "Content Report"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Reason & Preview Column */}
                  <td className="max-w-md py-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-warning mt-1 shrink-0" />
                        <p className="text-sm font-medium leading-relaxed">{report.reason}</p>
                      </div>
                      
                      {report.reportedMessage?.text && (
                        <div className="relative bg-base-200 rounded-2xl rounded-tl-none p-3 border border-base-300 shadow-inner group-hover:bg-base-100 transition-colors">
                          <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 mb-1">
                            <MessageSquare size={10} /> Reported Message Snippet
                          </div>
                          <p className="text-xs italic opacity-70 truncate">{report.reportedMessage.text}</p>
                        </div>
                      )}
                      <span className="text-[10px] font-mono opacity-25">ID: {report._id}</span>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="py-6">{getStatusBadge(report.status)}</td>

                  {/* Actions Column */}
                  <td className="text-right pr-8 py-6">
                    <div className="flex justify-end items-center gap-2">
                      {report.status === "pending" ? (
                        <div className="flex gap-1 bg-base-300/30 p-1.5 rounded-2xl">
                          <button
                            title="Mark as Reviewed"
                            className="btn btn-square btn-sm btn-ghost hover:bg-info/20 hover:text-info"
                            onClick={() => updateReportStatus(report._id, "reviewed")}
                          >
                            <Eye size={18} />
                          </button>

                          {report.reportedMessage && (
                            <button
                              title="Delete Message"
                              className="btn btn-square btn-sm btn-ghost hover:bg-warning/20 hover:text-warning"
                              onClick={() => deleteReportedMessage(report._id)}
                            >
                              <Trash2 size={18} />
                            </button>
                          )}

                          {report.reportedUser && (
                            <button
                              title="Ban User"
                              className="btn btn-square btn-sm btn-ghost hover:bg-error/20 hover:text-error"
                              onClick={() => banUserFromReport(report._id)}
                            >
                              <ShieldAlert size={18} />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-success/5 border border-success/20 rounded-2xl text-success font-black text-[10px] uppercase tracking-widest">
                          <CheckCircle2 size={14} strokeWidth={3} /> Resolution Logged
                        </div>
                      )}

                      <div className="divider divider-horizontal mx-1 opacity-20"></div>

                      <button
                        title="Permanently Remove Report"
                        className="btn btn-square btn-sm btn-ghost text-base-content/20 hover:text-error hover:bg-error/10"
                        onClick={() => deleteReport(report._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {reports.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-32">
                    <div className="flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                      <div className="p-6 bg-base-200 rounded-full">
                        <CheckCircle2 size={64} strokeWidth={1} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black">All Clear</h3>
                        <p className="font-medium uppercase tracking-widest text-xs">No pending reports found in this filter</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;