import { useState } from "react";
import { X, Image } from "lucide-react";
import { useStatusStore } from "../store/useStatusStore";

const AddStatusModal = ({ onClose }) => {
  const { createStatus, isUploadingStatus } = useStatusStore();

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!text.trim() && !file) return;

    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("media", file);

    await createStatus(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-base-100 w-full max-w-md rounded-lg p-4">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Add Status</h3>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            <X />
          </button>
        </div>

        {/* TEXT */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="textarea textarea-bordered w-full mb-3"
        />

        {/* MEDIA PICKER */}
        <label className="flex items-center gap-2 cursor-pointer mb-3">
          <Image size={18} />
          <span className="text-sm">Add image / video</span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            hidden
          />
        </label>

        {/* PREVIEW */}
        {preview && (
          <div className="mb-3">
            {file.type.startsWith("image") ? (
              <img
                src={preview}
                alt="preview"
                className="max-h-60 rounded"
              />
            ) : (
              <video
                src={preview}
                controls
                className="max-h-60 rounded"
              />
            )}
          </div>
        )}

        {/* ACTION */}
        <button
          onClick={handleSubmit}
          disabled={isUploadingStatus}
          className="btn btn-primary w-full"
        >
          {isUploadingStatus ? "Uploading..." : "Post Status"}
        </button>
      </div>
    </div>
  );
};

export default AddStatusModal;
