import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductFilters = ({ filters, setFilters, sizes, clothTypes, colors, priceRange }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      size: "",
      clothType: "",
      color: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="card border-0 shadow-sm p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Filters</h5>
        <button className="btn btn-link btn-sm text-decoration-none p-0" onClick={handleReset}>
          Reset
        </button>
      </div>

      {sizes.length > 0 && (
        <div className="mb-3">
          <label className="form-label fw-semibold">Size</label>
          <select
            className="form-select"
            value={filters.size}
            onChange={(e) => handleChange("size", e.target.value)}
          >
            <option value="">All sizes</option>
            {sizes.map((size) => (
              <option value={size.size_id || size.size_name} key={size.size_id || size.size_name}>
                {size.size_name || size.size_id}
              </option>
            ))}
          </select>
        </div>
      )}

      {clothTypes.length > 0 && (
        <div className="mb-3">
          <label className="form-label fw-semibold">Fabric</label>
          <select
            className="form-select"
            value={filters.clothType}
            onChange={(e) => handleChange("clothType", e.target.value)}
          >
            <option value="">All fabrics</option>
            {clothTypes.map((ct) => (
              <option value={ct.cloth_type_id || ct.cloth_type_name} key={ct.cloth_type_id || ct.cloth_type_name}>
                {ct.cloth_type_name || ct.cloth_type_id}
              </option>
            ))}
          </select>
        </div>
      )}

      {colors.length > 0 && (
        <div className="mb-3">
          <label className="form-label fw-semibold">Color</label>
          <select
            className="form-select"
            value={filters.color}
            onChange={(e) => handleChange("color", e.target.value)}
          >
            <option value="">All colors</option>
            {colors.map((color) => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-2">
        <label className="form-label fw-semibold">Price Range</label>
        <div className="row g-2">
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleChange("minPrice", e.target.value)}
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
            />
          </div>
        </div>
      </div>

      {priceRange.min !== undefined && priceRange.max !== undefined && (
        <div className="text-muted small mt-1">
          Range: ₹{priceRange.min.toLocaleString("en-IN")} - ₹{priceRange.max.toLocaleString("en-IN")}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
