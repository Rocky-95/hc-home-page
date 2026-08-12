import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { moduleConfigs } from "../config/modules";
import { buildService } from "../services/crudService";
import DataTable from "../components/DataTable";
import CrudForm from "../components/CrudForm";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";
import Modal from "../components/Modal";

const AdminCrudPage = () => {
  const { moduleKey } = useParams();
  const config = moduleConfigs[moduleKey];
  const toast = useToast();
  const confirm = useConfirm();

  const service = useMemo(() => {
    if (!config) return null;
    return buildService(config.module, config.idField);
  }, [config]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");

  const loadData = useCallback(async () => {
    if (!service) return;
    setLoading(true);
    try {
      const res = await service.list();
      const list = Array.isArray(res) ? res : res.data || [];
      setData(list);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const idField = config?.idField || "id";

  const normalizeValues = (values) => {
    const normalized = { ...values };
    config.fields.forEach((field) => {
      if (field.type === "checkbox") {
        normalized[field.name] = values[field.name] === true || values[field.name] === 1 ? 1 : 0;
      }
    });
    return normalized;
  };

  const handleSubmit = async (values) => {
    try {
      const payload = normalizeValues(values);
      if (editingItem?.[idField]) {
        await service.update({ ...payload, [idField]: editingItem[idField] });
        toast.success(`${config.label} updated.`);
      } else {
        await service.create(payload);
        toast.success(`${config.label} created.`);
      }
      setShowForm(false);
      setEditingItem(null);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to save.");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleToggleActive = async (item, nextActive) => {
    const activeField = item.isactive !== undefined ? "isactive" : "is_active";
    try {
      await service.update({ [idField]: item[idField], [activeField]: nextActive ? 1 : 0 });
      toast.success(`${config.label.replace(/s$/i, "")} ${nextActive ? "activated" : "deactivated"}.`);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to update status.");
    }
  };

  const handleDelete = async (item) => {
    const singular = config.label.replace(/s$/i, "").toLowerCase();
    const ok = await confirm({
      title: `Delete this ${singular}?`,
      message: "This action cannot be undone.",
      confirmLabel: "Delete",
      danger: true,
    });
    if (!ok) return;
    try {
      await service.remove(item[idField]);
      toast.success(`${config.label} deleted.`);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to delete.");
    }
  };

  if (!config) {
    return <div className="alert alert-warning">Unknown admin module: {moduleKey}</div>;
  }

  const listFields = config.listFields.map((name) =>
    config.fields.find((f) => f.name === name) || { name, label: name }
  );

  const searchFields = config.listFields.slice(0, 2);
  const filteredData = search.trim()
    ? data.filter((row) =>
        searchFields.some((key) =>
          String(row[key] ?? "").toLowerCase().includes(search.toLowerCase())
        )
      )
    : data;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{config.label}</h3>
        <div className="d-flex gap-2">
          <input
            className="form-control"
            placeholder={`Search ${config.label}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: 200 }}
          />
          <button className="btn btn-dark" onClick={() => { setEditingItem(null); setShowForm(true); }}>
            + Add {config.label}
          </button>
        </div>
      </div>

      {showForm && (
        <Modal title={`${editingItem ? "Edit" : "Create"} ${config.label}`} onClose={() => { setShowForm(false); setEditingItem(null); }} size="lg">
          <CrudForm
            fields={config.fields}
            initialValues={editingItem || {}}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditingItem(null); }}
          />
        </Modal>
      )}

      <DataTable
        fields={listFields}
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
        loading={loading}
        idField={idField}
      />
    </div>
  );
};

export default AdminCrudPage;
