import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../../../../services/productService";
import { useCart } from "../../../../context/CartContext";
import "../../../styles/ProductPage.css";

const placeholderImage = "https://via.placeholder.com/600x800?text=No+Image";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [media, setMedia] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const [productsRes, mediaRes, variantsRes, sizesRes] = await Promise.all([
          productService.getProducts(),
          productService.getProductMedia(),
          productService.getProductVariants(),
          productService.getProductSizes(),
        ]);
        const products = productsRes.data?.data || productsRes.data || [];
        const allMedia = mediaRes.data?.data || mediaRes.data || [];
        const allVariants = variantsRes.data?.data || variantsRes.data || [];
        const allSizes = sizesRes.data?.data || sizesRes.data || [];

        const matched =
          products.find((p) => p.product_slug === id || p.product_id === id) ||
          products.find((p) =>
            (p.product_name || "").toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
          );

        if (!matched) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        const productVariants = allVariants.filter((v) => v.product_id === matched.product_id);
        const productSizes = productVariants.length
          ? productVariants.map((v) => ({
              variant_id: v.product_variant_id,
              label: allSizes.find((s) => s.size_id === v.size_id)?.size_name || v.variant_name || "M",
              price: v.price || matched.base_price || 0,
              available: (v.stock_qty || 0) > 0,
            }))
          : [
              {
                variant_id: null,
                label: "M",
                price: matched.base_price || 0,
                available: true,
              },
            ];

        setProduct(matched);
        setMedia(allMedia.filter((m) => m.product_id === matched.product_id));
        setSizes(productSizes);
        setSelectedSize(productSizes.length === 1 ? productSizes[0].label : "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const mainImage = useMemo(() => {
    const primary = media.find((m) => m.isprimary === 1 || m.isprimary === true);
    return primary?.media_url || media[0]?.media_url || placeholderImage;
  }, [media]);

  const selectedVariant = sizes.find((s) => s.label === selectedSize);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize || !selectedVariant) {
      setError("Please select a size");
      return;
    }
    addToCart({
      productId: product.product_id,
      productVariantId: selectedVariant.variant_id,
      sizeLabel: selectedVariant.label,
      name: product.product_name,
      price: selectedVariant.price || product.base_price || 0,
      qty,
      image: mainImage,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    const wishlistVariant = selectedVariant || sizes?.[0] || {};
    addToWishlist({
      productId: product.product_id,
      productVariantId: wishlistVariant.variant_id || null,
      sizeLabel: wishlistVariant.label,
      name: product.product_name,
      price: wishlistVariant.price || product.base_price || 0,
      image: mainImage,
    });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading product...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">
          {error || "Product not found"}
        </div>
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5 product-page">
      <div className="row g-5">
        <div className="col-md-6">
          <div className="product-image-wrapper">
            <img
              src={mainImage}
              alt={product.product_name}
              className="img-fluid rounded shadow-sm"
              style={{ width: "100%", objectFit: "cover", maxHeight: "700px" }}
            />
          </div>
          {media.length > 1 && (
            <div className="d-flex gap-2 mt-3 overflow-auto">
              {media.map((m, idx) => (
                <img
                  key={idx}
                  src={m.media_url || placeholderImage}
                  alt={m.alt_text || product.product_name}
                  className="img-thumbnail"
                  style={{ width: "80px", height: "100px", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => setMedia((prev) => {
                    const reordered = [...prev];
                    const clicked = reordered.splice(idx, 1);
                    return [clicked[0], ...reordered];
                  })}
                />
              ))}
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h1 className="fw-bold mb-2">{product.product_name}</h1>
          <p className="text-muted">{product.short_description}</p>
          <h3 className="fw-bold mb-4">
            {product.currency_code === "INR" ? "₹" : product.currency_code || "₹"}
            {(selectedVariant?.price || product.base_price || 0).toLocaleString("en-IN")}
          </h3>
          {product.description && (
            <div className="mb-4">
              <h5>Description</h5>
              <p>{product.description}</p>
            </div>
          )}
          {sizes.length > 1 && (
            <div className="mb-4">
              <h5 className="mb-2">Size</h5>
              <div className="d-flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    type="button"
                    className={`btn ${selectedSize === size.label ? "btn-dark" : "btn-outline-dark"}`}
                    disabled={!size.available}
                    onClick={() => setSelectedSize(size.label)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="input-group" style={{ width: "140px" }}>
              <button
                className="btn btn-outline-dark"
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={qty}
                readOnly
              />
              <button
                className="btn btn-outline-dark"
                type="button"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              className={`btn btn-dark px-4 py-2 ${added ? "btn-success" : ""}`}
              onClick={handleAddToCart}
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </button>
            <button
              className="btn btn-outline-dark px-4 py-2"
              onClick={handleAddToWishlist}
              title="Add to wishlist"
            >
              ♡
            </button>
          </div>
          <button className="btn btn-link text-dark" onClick={() => navigate(-1)}>
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
