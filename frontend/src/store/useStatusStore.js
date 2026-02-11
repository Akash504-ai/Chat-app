import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { persist } from "zustand/middleware";

export const useStatusStore = create(
  persist(
    (set, get) => ({
      statuses: [],
      selectedStatus: null,
      viewers: [],
      isStatusLoading: false,
      isUploadingStatus: false,

      /* ---------------- GET ALL STATUSES ---------------- */
      getStatuses: async () => {
        set({ isStatusLoading: true });
        try {
          const res = await axiosInstance.get("/status");
          set({ statuses: res.data });
        } catch {
          toast.error("Failed to load statuses");
        } finally {
          set({ isStatusLoading: false });
        }
      },

      /* ---------------- CREATE STATUS (CLOUDINARY) ---------------- */
      createStatus: async (formData) => {
        set({ isUploadingStatus: true });
        try {
          const res = await axiosInstance.post("/status", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          set((state) => ({
            statuses: [res.data, ...state.statuses],
          }));

          toast.success("Status uploaded");
        } catch {
          toast.error("Failed to upload status");
        } finally {
          set({ isUploadingStatus: false });
        }
      },

      /* ---------------- VIEW STATUS ---------------- */
      viewStatus: async (status) => {
        set({ selectedStatus: status });
        try {
          await axiosInstance.post(`/status/${status._id}/view`);
        } catch {
          // silent fail
        }
      },

      /* ---------------- DELETE STATUS ---------------- */
      deleteStatus: async (statusId) => {
        try {
          await axiosInstance.delete(`/status/${statusId}`);

          set((state) => ({
            statuses: state.statuses.filter((s) => s._id !== statusId),
            selectedStatus:
              state.selectedStatus?._id === statusId
                ? null
                : state.selectedStatus,
          }));

          toast.success("Status deleted");
        } catch {
          toast.error("Failed to delete status");
        }
      },

      /* ---------------- CLEAR SELECTED STATUS ---------------- */
      clearSelectedStatus: () =>
        set({
          selectedStatus: null,
          viewers: [],
        }),
    }),
    {
      name: "status-ui-state",
      partialize: () => ({}),
    },
  ),
);
