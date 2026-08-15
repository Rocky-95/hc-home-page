import React from "react";

const UploadProgressBar = ({ percent }) => (
  <div className="admin-upload-progress mt-1">
    <div className="admin-upload-progress-track">
      <div className="admin-upload-progress-fill" style={{ width: `${percent}%` }} />
    </div>
    <span className="admin-upload-progress-label">Uploading... {percent}%</span>
  </div>
);

export default UploadProgressBar;
