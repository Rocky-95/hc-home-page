export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

const MAX_IMAGE_SIZE_MB = 5;
const MAX_VIDEO_SIZE_MB = 50;

// Client-side gatekeeper before a file ever reaches the upload API — checks it's an
// actual accepted image/video type (not just relying on the <input accept> hint, which
// browsers don't enforce) and within a sane size limit.
export const validateMediaFile = (file, { allowVideo = true } = {}) => {
  const allowedTypes = allowVideo ? [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES] : ALLOWED_IMAGE_TYPES;
  if (!allowedTypes.includes(file.type)) {
    const kinds = allowVideo ? "JPG, PNG, WEBP, GIF images or MP4, WEBM, MOV videos" : "JPG, PNG, WEBP, or GIF images";
    return { valid: false, error: `Unsupported file type. Please choose a ${kinds} file.` };
  }
  const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
  const maxBytes = (isVideo ? MAX_VIDEO_SIZE_MB : MAX_IMAGE_SIZE_MB) * 1024 * 1024;
  if (file.size > maxBytes) {
    return { valid: false, error: `File is too large. Maximum size is ${isVideo ? MAX_VIDEO_SIZE_MB : MAX_IMAGE_SIZE_MB}MB.` };
  }
  return { valid: true, error: null };
};
