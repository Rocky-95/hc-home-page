import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { moduleConfigs } from "../config/modules";
import { buildService } from "../services/crudService";
import DataTable from "../components/DataTable";
import CrudForm from "../components/CrudForm";
import ConfirmModal from "../components/ConfirmModal";

const AdminCrudPage = () => {
  const { moduleKey } = useParams();
  const config = moduleConfigs[moduleKey];

  const service = useMemo(() => {
    if (!config) return null;
    return buildService(config.module);
  }, [config]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const loadData = useCallback(async () => {
    if (!service) return;
    setLoading(true);
    setError("");
    try {
      const res = await service.list();
      const list = Array.isArray(res) ? res : res.data || [];
      setData(list);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const idField = config.idField || "id";

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
      } else {
        await service.create(payload);
      }
      setShowForm(false);
      setEditingItem(null);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to save.");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      await service.remove(deleteItem[idField]);
      setDeleteItem(null);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to delete.");
      setDeleteItem(null);
    }
  };

  if (!config) {
    return <div className="alert alert-warning">Unknown admin module: {moduleKey}</div>;
  }

  const listFields = config.listFields.map((name) =>
    config.fields.find((f) => f.name === name) || { name, label: name }
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{config.label}</h3>
        <button className="btn btn-dark" onClick={() => { setEditingItem(null); setShowForm(true); }}>
          + Add {config.label}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingItem ? "Edit" : "Create"} {config.label}</h5>
            <CrudForm
              fields={config.fields}
              initialValues={editingItem || {}}
              onSubmit={handleSubmit}
              onCancel={() => { setShowForm(false); setEditingItem(null); }}
            />
          </div>
        </div>
      )}

      <DataTable
        fields={listFields}
        data={data}
        onEdit={handleEdit}
        onDelete={setDeleteItem}
        loading={loading}
        idField={idField}
      />

      <ConfirmModal
        show={!!deleteItem}
        title="Confirm Delete"
        message={`Are you sure you want to delete this ${config.label.toLowerCase()}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
};

export default AdminCrudPage;
