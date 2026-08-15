const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://dev.dine360.ca/backend/API/Harry-Clinton-DEV";

// The /FileUpload endpoint returns a "virtualPath" like "~/Uploads/HARRY_CLINTON/..." —
// the "~" is a placeholder for the backend's own origin, not a real URL a browser can
// load. Static files are served from the app root (see Backend/app.js: app.use("/Uploads", ...)),
// not under the /API/<project> path the rest of the API lives under, so the upload
// origin is the API base URL with that suffix stripped off.
const UPLOAD_ORIGIN = API_BASE_URL.replace(/\/API\/.*$/i, "");

// Turns whatever the upload API handed back into a URL a browser can actually load.
// Already-absolute URLs (http/https), blob: previews, and data: URIs pass through unchanged.
export const resolveUploadUrl = (value) => {
  if (!value) return value;
  if (/^(https?:|blob:|data:)/i.test(value)) return value;
  if (value.startsWith("~/")) return `${UPLOAD_ORIGIN}/${value.slice(2)}`;
  if (value.startsWith("~")) return `${UPLOAD_ORIGIN}${value.slice(1)}`;
  if (value.startsWith("/")) return `${UPLOAD_ORIGIN}${value}`;
  return value;
};
