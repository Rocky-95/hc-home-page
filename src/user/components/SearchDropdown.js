import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../../services/productService";
import "../styles/SearchDropdown.css";

const DEBOUNCE_MS = 300;

const STATIC_SERVICES = [
  { name: "Embroidery",       path: "/services" },
  { name: "Alterations",      path: "/services" },
  { name: "Personal Styling", path: "/services" },
  { name: "Custom Tailoring", path: "/services" },
];

const EMPTY = { categories: [], subcategories: [], products: [], services: [] };

const SearchDropdown = ({ onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const timerRef = useRef(null);
  const cacheRef = useRef({});
  const dataRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  const loadBaseData = async () => {
    if (dataRef.current) return dataRef.current;
    const [catRes, subRes, prodRes, mediaRes] = await Promise.all([
      productService.getMenuCategories(),
      productService.getMenuSubCategories(),
      productService.getProducts(),
      productService.getProductMedia(),
    ]);
    const base = {
      cats:  catRes.data?.data  || catRes.data  || [],
      subs:  subRes.data?.data  || subRes.data  || [],
      prods: prodRes.data?.data || prodRes.data || [],
      media: mediaRes.data?.data || mediaRes.data || [],
    };
    dataRef.current = base;
    return base;
  };

  const runSearch = async (q) => {
    const key = q.toLowerCase().trim();
    if (cacheRef.current[key]) {
      setResults(cacheRef.current[key]);
      setLoading(false);
      return;
    }
    try {
      const { cats, subs, prods, media } = await loadBaseData();
      const match = (str) => (str || "").toLowerCase().includes(key);
      const filtered = {
        categories: cats.filter((c) => match(c.menu_category_name)).slice(0, 4),
        subcategories: subs.filter((s) => match(s.menu_subcategory_name)).slice(0, 4),
        services: STATIC_SERVICES.filter((s) => match(s.name)),
        products: prods
          .filter((p) => match(p.product_name) || match(p.short_description))
          .slice(0, 6)
          .map((p) => {
            const m =
              media.find((x) => x.product_id === p.product_id && x.isprimary) ||
              media.find((x) => x.product_id === p.product_id);
            return { ...p, _img: m?.media_url || null };
          }),
      };
      cacheRef.current[key] = filtered;
      setResults(filtered);
    } catch {
      setResults(EMPTY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clearTimeout(timerRef.current);
    const q = query.trim();
    if (!q) {
      setResults(EMPTY);
      setLoading(false);
      return;
    }
    setLoading(true);
    timerRef.current = setTimeout(() => runSearch(q), DEBOUNCE_MS);
    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const go = (path) => {
    onClose?.();
    navigate(path);
  };

  const handleKey = (e) => {
    if (e.key === "Escape") onClose?.();
    if (e.key === "Enter" && query.trim()) {
      go(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const hasResults =
    results.categories.length > 0 ||
    results.subcategories.length > 0 ||
    results.services.length > 0 ||
    results.products.length > 0;

  const showDropdown = query.trim().length > 0;

  return (
    <div className="sd-wrap" ref={wrapRef}>
      {/* Input row */}
      <div className="sd-input-row">
        <i className="bi bi-search sd-icon" />
        <input
          ref={inputRef}
          className="sd-input"
          type="text"
          placeholder="Search products, categories…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          autoComplete="off"
        />
        {query && (
          <button className="sd-clear" onClick={() => setQuery("")} aria-label="Clear">
            <i className="bi bi-x-lg" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="sd-dropdown">
          {loading && (
            <div className="sd-state">
              <span className="sd-spinner" />
              <span>Searching…</span>
            </div>
          )}

          {!loading && !hasResults && (
            <div className="sd-state sd-state--empty">
              No results for <strong>"{query}"</strong>
            </div>
          )}

          {!loading && hasResults && (
            <>
              {/* Categories */}
              {results.categories.length > 0 && (
                <div className="sd-section">
                  <p className="sd-section__label">Categories</p>
                  {results.categories.map((c) => {
                    const slug =
                      c.menu_category_slug ||
                      c.menu_category_name?.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <button
                        key={c.menu_category_id}
                        className="sd-item"
                        onClick={() => go(`/${slug}`)}
                      >
                        <i className="bi bi-grid sd-item__icon" />
                        <span className="sd-item__text">{c.menu_category_name}</span>
                        <span className="sd-item__tag">Category</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Subcategories */}
              {results.subcategories.length > 0 && (
                <div className="sd-section">
                  <p className="sd-section__label">Collections</p>
                  {results.subcategories.map((s) => {
                    const path =
                      (s.redirect_link || "").replace(/^\/collection\//, "/") ||
                      `/${s.menu_subcategory_slug || s.menu_subcategory_name?.toLowerCase().replace(/\s+/g, "-")}`;
                    return (
                      <button
                        key={s.menu_subcategory_id}
                        className="sd-item"
                        onClick={() => go(path)}
                      >
                        <i className="bi bi-collection sd-item__icon" />
                        <span className="sd-item__text">{s.menu_subcategory_name}</span>
                        <span className="sd-item__tag">Collection</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Services */}
              {results.services.length > 0 && (
                <div className="sd-section">
                  <p className="sd-section__label">Services</p>
                  {results.services.map((s) => (
                    <button
                      key={s.name}
                      className="sd-item"
                      onClick={() => go(s.path)}
                    >
                      <i className="bi bi-scissors sd-item__icon" />
                      <span className="sd-item__text">{s.name}</span>
                      <span className="sd-item__tag">Service</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Products */}
              {results.products.length > 0 && (
                <div className="sd-section">
                  <p className="sd-section__label">Products</p>
                  {results.products.map((p) => {
                    const slug =
                      p.product_slug ||
                      p.product_name?.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <button
                        key={p.product_id}
                        className="sd-item sd-item--product"
                        onClick={() => go(`/product/${slug}`)}
                      >
                        {p._img ? (
                          <img
                            src={p._img}
                            alt={p.product_name}
                            className="sd-item__thumb"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <span className="sd-item__thumb-placeholder">
                            <i className="bi bi-image" />
                          </span>
                        )}
                        <span className="sd-item__info">
                          <span className="sd-item__text">{p.product_name}</span>
                          {p.base_price ? (
                            <span className="sd-item__price">
                              ₹{Number(p.base_price).toLocaleString("en-IN")}
                            </span>
                          ) : null}
                        </span>
                        <span className="sd-item__tag">Product</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* View all */}
              <div className="sd-footer">
                <button
                  className="sd-footer__btn"
                  onClick={() => go(`/search?q=${encodeURIComponent(query.trim())}`)}
                >
                  View all results for "<strong>{query}</strong>"
                  <i className="bi bi-arrow-right ms-2" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
