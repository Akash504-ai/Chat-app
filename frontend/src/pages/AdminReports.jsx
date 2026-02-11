import { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { AlertCircle, CheckCircle2, Eye, ShieldAlert, User, ArrowRight } from "lucide-react";

const AdminReports = () => {
  const { reports, getReports, updateReportStatus, banUserFromReport, loading } = useAdminStore();

  useEffect(() => {
    getReports();
  }, [getReports]);

  const handleStatusUpdate = async (id, status) => {
    await updateReportStatus(id, status);
    getReports();
  };

  const handleBanUser = async (id) => {
    if (!window.confirm("Ban this user and resolve report?")) return;
    await banUserFromReport(id);
    getReports();
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <div className="badge badge-warning badge-outline gap-1 font-bold text-[10px] uppercase">Pending</div>;
      case "reviewed":
        return <div className="badge badge-info badge-outline gap-1 font-bold text-[10px] uppercase">Reviewed</div>;
      case "resolved":
        return <div className="badge badge-success badge-outline gap-1 font-bold text-[10px] uppercase">Resolved</div>;
      default:
        return <div className="badge badge-ghost uppercase text-[10px]">{status}</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-base-content">Reports Management</h1>
        <p className="text-base-content/60 mt-1">Review and take action on user-reported content.</p>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-md">
            <thead className="bg-base-200/50">
              <tr>
                <th className="py-4">Entities Involved</th>
                <th>Reason & Context</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {reports.map((report) => (
                <tr key={report._id} className="hover:bg-base-200/20 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold flex items-center gap-1.5">
                          <User size={14} className="opacity-50" /> {report.reporter?.fullName}
                        </span>
                        <span className="text-xs opacity-50">{report.reporter?.email}</span>
                      </div>
                      <ArrowRight size={16} className="text-base-content/30" />
                      <div className="flex flex-col">
                        <span className="font-bold text-error">
                          {report.reportedUser?.fullName || "Message Content"}
                        </span>
                        <span className="text-xs opacity-50">
                          {report.reportedUser?.email || "N/A"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="max-w-xs overflow-hidden">
                      <p className="text-sm font-medium leading-relaxed">{report.reason}</p>
                      <span className="text-[10px] opacity-40 uppercase font-bold tracking-widest italic">
                        Reference ID: {report._id.slice(-6)}
                      </span>
                    </div>
                  </td>

                  <td>{getStatusBadge(report.status)}</td>

                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      {report.status === "pending" && (
                        <>
                          <button
                            className="btn btn-sm btn-ghost hover:bg-info/10 hover:text-info gap-2"
                            onClick={() => handleStatusUpdate(report._id, "reviewed")}
                          >
                            <Eye size={16} />
                            Review
                          </button>
                          
                          {report.reportedUser && (
                            <button
                              className="btn btn-sm btn-error btn-outline gap-2"
                              onClick={() => handleBanUser(report._id)}
                            >
                              <ShieldAlert size={16} />
                              Ban
                            </button>
                          )}
                        </>
                      )}
                      
                      {report.status !== "pending" && (
                         <div className="text-success flex items-center gap-1 text-xs font-bold px-3">
                           <CheckCircle2 size={16} /> Handled
                         </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-12">
                    <div className="flex flex-col items-center opacity-30">
                      <AlertCircle size={48} />
                      <p className="mt-2 font-medium">No reports found.</p>
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