import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import productService from "../../services/productService";
import ProductFilters from "../components/ProductFilters";
import "bootstrap/dist/css/bootstrap.min.css";

const placeholderImage = "https://via.placeholder.com/300x400?text=No+Image";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [clothTypes, setClothTypes] = useState([]);
  const [filters, setFilters] = useState({
    size: "",
    clothType: "",
    color: "",
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const [productsRes, mediaRes, variantsRes, attrValuesRes, attrsRes, sizesRes, clothTypesRes] = await Promise.all([
          productService.getProducts(),
          productService.getProductMedia(),
          productService.getProductVariants(),
          productService.getProductAttributeValues(),
          productService.getProductAttributes(),
          productService.getProductSizes(),
          productService.getProductClothTypes(),
        ]);
        const apiProducts = productsRes.data?.data || productsRes.data || [];
        const apiMedia = mediaRes.data?.data || mediaRes.data || [];

        const normalizedQuery = query.trim().toLowerCase();
        const filtered = apiProducts.filter((p) => {
          const text = `${p.product_name || ""} ${p.product_slug || ""} ${p.short_description || ""} ${p.description || ""} ${p.category || ""}`.toLowerCase();
          return !normalizedQuery || text.includes(normalizedQuery);
        });

        const mapped = filtered.map((p) => {
          const media = apiMedia.find((m) => m.product_id === p.product_id && m.isprimary === true);
          return {
            id: p.product_id || p.product_slug,
            product_id: p.product_id,
            name: p.product_name,
            price: p.base_price || 0,
            image: media?.media_url || placeholderImage,
            category: p.category || "",
            slug: p.product_slug || "",
          };
        });

        setProducts(mapped);
        setVariants(variantsRes.data?.data || variantsRes.data || []);
        setAttributeValues(attrValuesRes.data?.data || attrValuesRes.data || []);
        setAttributes(attrsRes.data?.data || attrsRes.data || []);
        setSizes(sizesRes.data?.data || sizesRes.data || []);
        setClothTypes(clothTypesRes.data?.data || clothTypesRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to search products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  const colorAttributeId = useMemo(() => {
    return attributes.find((a) => a.attribute_slug?.toLowerCase() === "color" || a.attribute_name?.toLowerCase() === "color")?.attribute_id;
  }, [attributes]);

  const availableColors = useMemo(() => {
    if (!colorAttributeId) return [];
    const values = attributeValues
      .filter((av) => av.attribute_id === colorAttributeId)
      .map((av) => av.attribute_value);
    return [...new Set(values)].filter(Boolean);
  }, [attributeValues, colorAttributeId]);

  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const productVariants = variants.filter((v) => v.product_id === p.product_id);

      if (filters.size) {
        const hasSize = productVariants.some((v) => v.size_id === filters.size || v.size_id === sizes.find((s) => s.size_name === filters.size)?.size_id);
        if (!hasSize) return false;
      }

      if (filters.clothType) {
        const hasCloth = productVariants.some((v) => v.cloth_type_id === filters.clothType || v.cloth_type_id === clothTypes.find((ct) => ct.cloth_type_name === filters.clothType)?.cloth_type_id);
        if (!hasCloth) return false;
      }

      if (filters.color) {
        const hasColor = attributeValues.some(
          (av) =>
            av.product_id === p.product_id &&
            av.attribute_value?.toLowerCase() === filters.color.toLowerCase() &&
            (!colorAttributeId || av.attribute_id === colorAttributeId)
        );
        if (!hasColor) return false;
      }

      const price = p.price || 0;
      if (filters.minPrice && price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && price > Number(filters.maxPrice)) return false;

      return true;
    });
  }, [products, variants, attributeValues, sizes, clothTypes, colorAttributeId, filters]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Searching...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">
        {query ? `Search results for "${query}"` : "Search Products"}
      </h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-lg-3">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            sizes={sizes}
            clothTypes={clothTypes}
            colors={availableColors}
            priceRange={priceRange}
          />
        </div>
        <div className="col-lg-9">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h4>No products found</h4>
              <p className="text-muted">Try adjusting filters or search term.</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {filteredProducts.map((product) => (
            <div className="col" key={product.id}>
              <Link to={`/product/${product.slug || product.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "280px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">{product.category}</p>
                    <p className="card-text fw-bold">
                      &#8377;{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
