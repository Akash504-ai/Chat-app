import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAdminStore = create((set, get) => ({
  // =========================
  // STATE
  // =========================
  users: [],
  reports: [],
  dashboardStats: null,
  loading: false,
  error: null,

  // =========================
  // DASHBOARD STATS
  // =========================
  getDashboardStats: async () => {
    try {
      set({ loading: true, error: null });

      const res = await axiosInstance.get("/admin/dashboard");

      set({ dashboardStats: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching stats",
        loading: false,
      });
    }
  },

  // =========================
  // USERS
  // =========================
  getUsers: async (page = 1, search = "", role = "") => {
    try {
      set({ loading: true, error: null });

      const res = await axiosInstance.get(
        `/admin/users?page=${page}&search=${search}&role=${role}`
      );

      set({ users: res.data.users, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching users",
        loading: false,
      });
    }
  },

  toggleBanUser: async (userId) => {
    try {
      await axiosInstance.patch(`/admin/users/${userId}/ban`);

      // optional: refresh users
      get().getUsers();
    } catch (error) {
      console.error("Ban user error:", error);
    }
  },

  deleteUser: async (userId) => {
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);

      set((state) => ({
        users: state.users.filter((u) => u._id !== userId),
      }));
    } catch (error) {
      console.error("Delete user error:", error);
    }
  },

  // =========================
  // REPORTS
  // =========================
  getReports: async (status = "") => {
    try {
      set({ loading: true, error: null });

      const url = status
        ? `/reports?status=${status}`
        : "/reports";

      const res = await axiosInstance.get(url);

      set({ reports: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching reports",
        loading: false,
      });
    }
  },

  updateReportStatus: async (reportId, status) => {
    try {
      await axiosInstance.patch(`/reports/${reportId}/status`, { status });

      // refresh reports
      get().getReports();
    } catch (error) {
      console.error("Update report error:", error);
    }
  },

  deleteReportedMessage: async (reportId) => {
    try {
      await axiosInstance.patch(
        `/reports/${reportId}/delete-message`
      );

      // refresh reports
      get().getReports();
    } catch (error) {
      console.error("Delete message error:", error);
    }
  },

  banUserFromReport: async (reportId) => {
    try {
      await axiosInstance.patch(`/reports/${reportId}/ban-user`);

      // refresh reports
      get().getReports();
    } catch (error) {
      console.error("Ban from report error:", error);
    }
  },

  deleteReport: async (reportId) => {
    try {
      await axiosInstance.delete(`/reports/${reportId}`);

      set((state) => ({
        reports: state.reports.filter((r) => r._id !== reportId),
      }));
    } catch (error) {
      console.error("Delete report error:", error);
    }
  },
}));
