export const safeJsonParse = (value, fallback = null) => {
  if (value === null || value === undefined || value === "") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const isAdminUser = (user) =>
  !!user &&
  (user.role?.toLowerCase().includes("admin") ||
    user.role_code?.toLowerCase().includes("admin"));
