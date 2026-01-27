import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { ArrowLeft, Camera, Mail, User, Save } from "lucide-react";
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
  };

  return (
    <div className="min-h-screen bg-base-100 pt-20 px-4">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost btn-sm gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div>
            <h1 className="text-xl font-semibold">Profile</h1>
            <p className="text-sm text-base-content/60">
              Edit your profile information
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="rounded-xl border border-base-300 bg-base-200 p-6 space-y-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border-4 border-base-300"
              />

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-1 right-1 rounded-full bg-primary p-2 cursor-pointer transition hover:scale-105"
              >
                <Camera className="h-4 w-4 text-primary-content" />
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
          </div>

          {/* Editable Info */}
          <div className="space-y-5">
            <div>
              <label className="mb-1 flex items-center gap-2 text-sm text-base-content/60">
                <User className="h-4 w-4" />
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setIsDirty(true);
                }}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="mb-1 flex items-center gap-2 text-sm text-base-content/60">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <div className="rounded-lg border border-base-300 bg-base-100 px-4 py-2.5">
                {authUser?.email}
              </div>
            </div>
          </div>

          {/* Save */}
          {isDirty && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isUpdatingProfile}
                className="btn btn-primary btn-sm gap-2"
              >
                {isUpdatingProfile ? "Saving..." : <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>}
              </button>
            </div>
          )}
        </div>

        {/* Account Info */}
        <div className="rounded-xl border border-base-300 bg-base-200 p-6">
          <h2 className="mb-4 text-lg font-medium">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-base-300 pb-2">
              <span className="text-base-content/60">Member Since</span>
              <span>{authUser?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Account Status</span>
              <span className="text-success font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage