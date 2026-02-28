import Status from "../models/status.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createStatus = async (req, res) => {
  try {
    const { text } = req.body;
    let mediaUrl = "";

    // ✅ If file is uploaded, send to Cloudinary
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "statuses",
        resource_type: "auto",
      });

      mediaUrl = uploadResult.secure_url;
    }

    const status = await Status.create({
      user: req.user._id,
      text,
      mediaUrl,
    });

    res.status(201).json(status);
  } catch (error) {
    console.error("Create status error:", error);
    res.status(500).json({ message: "Failed to create status" });
  }
};

export const getStatuses = async (req, res) => {
  const statuses = await Status.find()
    .populate("user", "fullName profilePic")
    .populate("viewers", "fullName profilePic")
    .sort({ createdAt: -1 });

  res.json(statuses);
};

export const viewStatus = async (req, res) => {
  const { statusId } = req.params;

  await Status.findByIdAndUpdate(statusId, {
    $addToSet: { viewers: req.user._id },
  });

  res.json({ success: true });
};

export const deleteStatus = async (req, res) => {
  try {
    const { statusId } = req.params;

    const status = await Status.findById(statusId);

    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }

    if (status.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (status.mediaUrl) {
      try {
        const urlParts = status.mediaUrl.split("/");
        const fileWithExt = urlParts[urlParts.length - 1];
        const folder = urlParts[urlParts.length - 2];
        const publicId = `${folder}/${fileWithExt.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId);
      } catch (cloudErr) {
        console.error("Cloudinary delete failed:", cloudErr.message);
        // Do NOT stop deletion if Cloudinary fails
      }
    }

    await status.deleteOne();

    res.json({ success: true });
  } catch (err) {
    console.error("Delete status error:", err);
    res.status(500).json({ message: "Failed to delete status" });
  }
};