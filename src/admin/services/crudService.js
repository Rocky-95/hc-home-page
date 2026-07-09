import api from "./api";

const kebabToCamel = (str) =>
  str
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");

const buildService = (module, idField) => {
  const base = `/${module}`;

  return {
    list: () => api.get(base).then((res) => res.data),
    get: (id) => api.get(`${base}/${id}`).then((res) => res.data),
    create: (payload) => api.post(base, { ...payload, rcu: "ADMIN_PORTAL" }).then((res) => res.data),
    update: (payload) => api.put(base, { ...payload, luu: "ADMIN_PORTAL" }).then((res) => res.data),
    remove: (id) =>
      api
        .delete(base, { data: { [idField]: id, luu: "ADMIN_PORTAL" } })
        .then((res) => res.data),
  };
};

export { buildService, kebabToCamel };
