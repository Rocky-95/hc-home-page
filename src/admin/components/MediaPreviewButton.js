import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import Modal from "./Modal";

const ALLOWED_VIDEO_TYPES = [".mp4", ".webm", ".mov"];

const looksLikeVideo = (url) => {
  const clean = (url || "").split("?")[0].toLowerCase();
  return ALLOWED_VIDEO_TYPES.some((ext) => clean.endsWith(ext));
};

// Never renders the raw URL/path as text — just a button that pops a modal with the
// actual image or video in it. `kind` overrides the auto-detection from the file
// extension when the caller already knows (e.g. a mixed image/video field).
const MediaPreviewButton = ({ url, kind, label = "Preview" }) => {
  const [open, setOpen] = useState(false);
  if (!url) return <span className="text-muted small">No file uploaded</span>;

  const isVideo = kind === "video" ? true : kind === "image" ? false : looksLikeVideo(url);

  return (
    <>
      <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => setOpen(true)}>
        <FiEye size={13} className="me-1" />
        {label}
      </button>
      {open && (
        <Modal title="Preview" onClose={() => setOpen(false)}>
          <div className="text-center">
            {isVideo ? (
              <video src={url} controls autoPlay muted style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: 8 }} />
            ) : (
              <img src={url} alt="preview" style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: 8 }} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default MediaPreviewButton;
