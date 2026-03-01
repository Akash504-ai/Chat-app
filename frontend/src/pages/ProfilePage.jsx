import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  ArrowLeft,
  Camera,
  Mail,
  User,
  Save,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(null);
  const [fullName, setFullName] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (authUser) setFullName(authUser.fullName);
  }, [authUser]);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setSelectedImg(reader.result);
      setIsDirty(true);
    };
  };

  const handleSave = async () => {
    if (!isDirty) return;

    await updateProfile({
      fullName,
      profilePic: selectedImg,
    });

    setIsDirty(false);
    setSelectedImg(null); // Reset preview after success
  };

  return (
    <div className="h-full overflow-y-auto bg-base-100 pt-24 px-4 pb-8 mt-[-50px]">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="btn btn-ghost btn-circle btn-sm sm:btn-md"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
              <p className="text-sm text-base-content/60">
                Manage your account settings
              </p>
            </div>
          </div>

          {isDirty && (
            <button
              onClick={handleSave}
              disabled={isUpdatingProfile}
              className="btn btn-primary shadow-lg shadow-primary/20 animate-in fade-in zoom-in"
            >
              {isUpdatingProfile ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Save Changes</span>
            </button>
          )}
        </div>

        {/* Main Profile Section */}
        <div className="grid gap-8">
          {/* Profile Card */}
          <div className="bg-base-200/50 border border-base-300 rounded-3xl p-6 sm:p-8 space-y-8 backdrop-blur-sm">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="relative h-32 w-32 sm:h-40 sm:w-40">
                  <img
                    src={selectedImg || authUser?.profilePic || "/avatar.png"}
                    alt={`${authUser?.fullName || "User"} profile picture`}
                    onError={(e) => {
                      e.currentTarget.src = "/avatar.png";
                    }}
                    className={`h-full w-full rounded-full object-cover ring-4 ring-base-100 shadow-2xl transition-all duration-300 ${
                      isUpdatingProfile
                        ? "opacity-50 blur-[2px]"
                        : "group-hover:brightness-90"
                    }`}
                  />

                  {isUpdatingProfile && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                  )}
                </div>

                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-2 right-2 p-3 rounded-full bg-primary text-primary-content cursor-pointer shadow-xl transition-all hover:scale-110 active:scale-95 ${
                    isUpdatingProfile ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <Camera className="h-5 w-5" />
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageSelect}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-xs text-base-content/40 italic">
                Click the camera to update photo
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2 font-semibold">
                    <User className="h-4 w-4 text-primary" /> Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setIsDirty(true);
                  }}
                  className="input input-bordered bg-base-100 focus:input-primary transition-all w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2 font-semibold">
                    <Mail className="h-4 w-4 text-primary" /> Email Address
                  </span>
                </label>
                <div className="input input-bordered bg-base-100 flex items-center opacity-70 cursor-not-allowed">
                  {authUser?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Account Stats */}
          <div className="bg-base-200/50 border border-base-300 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-success" />
              Account Verification
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-base-100 border border-base-300 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">
                    Member Since
                  </p>
                  <p className="font-medium">
                    {authUser?.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-base-100 border border-base-300 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10 text-success">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">
                    Account Status
                  </p>
                  <p className="text-success font-bold">Verified Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
