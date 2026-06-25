import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products as fallbackProducts } from "../../../shared/assets/json/tuxedoProducts";
import "../../styles/ProductPage.css";
import "../../styles/CollectionPage.css";
import productService from "../../../services/productService";
import { useCart } from "../../../context/CartContext";
import ReviewsSection from "../ReviewsSection";

const placeholderImage = "https://via.placeholder.com/600x800?text=No+Image";

const colorHexMap = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#E63946",
  blue: "#1D3557",
  navy: "#14224A",
  green: "#2A9D8F",
  yellow: "#E9C46A",
  gold: "#FFD700",
  brown: "#8B4513",
  beige: "#F5F5DC",
  cream: "#FFFDD0",
  ivory: "#FFFFF0",
  burgundy: "#800020",
  grey: "#808080",
  gray: "#808080",
  pink: "#FFC0CB",
  purple: "#800080",
  orange: "#FFA500",
};

const getColorHex = (label) => {
  const key = label?.toLowerCase().replace(/\s+/g, "");
  for (const [name, hex] of Object.entries(colorHexMap)) {
    if (key?.includes(name)) return hex;
  }
  return "#CCCCCC";
};

const mapApiProduct = (p, media, variants, sizes, attributes, attributeValues) => {
  const productMedia = media.filter((m) => m.product_id === p.product_id);
  const productVariants = variants.filter((v) => v.product_id === p.product_id);
  const defaultVariant = productVariants.find((v) => v.isdefault) || productVariants[0] || {};

  const colorAttribute = attributes.find((a) => a.attribute_name?.toLowerCase() === "color");
  const colors = colorAttribute
    ? attributeValues
        .filter((av) => av.product_id === p.product_id && av.attribute_id === colorAttribute.attribute_id)
        .map((av, idx) => ({
          id: `${av.attribute_value?.toLowerCase().replace(/\s+/g, "-") || idx}`,
          label: av.attribute_value || `Color ${idx + 1}`,
          hex: getColorHex(av.attribute_value),
          border: "#b8b8b8",
        }))
    : [];

  const imagesByColor = colors.length
    ? colors.reduce((acc, color) => {
        acc[color.id] = productMedia
          .filter((m) => m.alt_text?.toLowerCase().includes(color.label.toLowerCase()))
          .map((m) => m.media_url);
        return acc;
      }, {})
    : { default: productMedia.map((m) => m.media_url) };

  const productSizes = productVariants.length
    ? productVariants.map((v) => ({
        variant_id: v.product_variant_id,
        label: sizes.find((s) => s.size_id === v.size_id)?.size_name || v.variant_name || "M",
        size_id: v.size_id,
        price: v.price || p.base_price || 0,
        available: (v.stock_qty || 0) > 0,
      }))
    : [
        {
          variant_id: defaultVariant.product_variant_id || null,
          label: sizes.find((s) => s.size_id === defaultVariant.size_id)?.size_name || "M",
          size_id: defaultVariant.size_id,
          price: defaultVariant.price || p.base_price || 0,
          available: (defaultVariant.stock_qty || 0) > 0,
        },
      ];

  return {
    id: p.product_id || p.product_slug,
    name: p.product_name,
    category: p.category || "collection",
    subtitle: p.product_slug?.replace(/-/g, " ") || "",
    price: defaultVariant.price || p.base_price || 0,
    originalPrice: null,
    description: p.description || p.short_description || "",
    colors,
    imagesByColor,
    sizes: productSizes,
    sizeChart: [
      { size: "S", chest: "36", waist: "30", length: "26" },
      { size: "M", chest: "38", waist: "32", length: "27" },
      { size: "L", chest: "40", waist: "34", length: "28" },
      { size: "XL", chest: "42", waist: "36", length: "29" },
    ],
    trustBadges: ["Premium Fabric", "Tailored Fit", "Luxury Finish"],
    accordion: [
      { id: "desc", title: "Description", body: p.description || p.short_description || "" },
      { id: "care", title: "Care Instructions", body: "Dry clean only. Store in a garment bag." },
      { id: "shipping", title: "Shipping & Returns", body: "Free shipping on orders above ₹5000." },
    ],
    stock: (defaultVariant.stock_qty || 0) > 0 ? "in" : "out",
    sku: defaultVariant.sku || p.product_slug,
    rating: 0,
    reviewCount: 0,
    image: productMedia[0]?.media_url || placeholderImage,
  };
};

const CollectionProductPage = () => {
  const { id } = useParams();
  const { addToCart, addToWishlist } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedColorId, setSelectedColorId] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const [productRes, mediaRes, variantsRes, sizesRes, attributesRes, attrValuesRes] = await Promise.all([
          productService.getProductById(id),
          productService.getProductMedia(),
          productService.getProductVariants(),
          productService.getProductSizes(),
          productService.getProductAttributes(),
          productService.getProductAttributesValues(),
        ]);
        const p = productRes.data?.data || productRes.data;
        if (p) {
          const mapped = mapApiProduct(
            p,
            mediaRes.data?.data || mediaRes.data || [],
            variantsRes.data?.data || variantsRes.data || [],
            sizesRes.data?.data || sizesRes.data || [],
            attributesRes.data?.data || attributesRes.data || [],
            attrValuesRes.data?.data || attrValuesRes.data || []
          );
          setProduct(mapped);
        } else {
          setProduct(fallbackProducts.find((item) => String(item.id) === id) || null);
        }
      } catch (err) {
        setError("Unable to load product details.");
        setProduct(fallbackProducts.find((item) => String(item.id) === id) || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setSelectedColorId(product?.colors?.[0]?.id || "");
    const sizes = product?.sizes || [];
    setSelectedSize(sizes.length === 1 ? sizes[0].label : "");
    setActiveImage(0);
    setOpenAccordion(null);
  }, [product]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading product...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="collection-empty">
        <h1>Product not found</h1>
        <Link to="/">Return to home</Link>
      </div>
    );
  }

  const selectedColor =
    product.colors.find((color) => color.id === selectedColorId) ||
    product.colors[0];
  const galleryImages =
    product.imagesByColor?.[selectedColor?.id]?.filter(Boolean) ||
    [product.image].filter(Boolean);

  const handleColorChange = (colorId) => {
    setSelectedColorId(colorId);
    setActiveImage(0);
  };

  const selectedVariant = product.sizes.find((s) => s.label === selectedSize);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedVariant) {
      setToast("Please select a size first.");
      return;
    }

    addToCart({
      productId: product.id,
      productVariantId: selectedVariant.variant_id,
      sizeLabel: selectedVariant.label,
      name: product.name,
      price: selectedVariant.price || product.price,
      qty: 1,
      image: galleryImages[activeImage] || product.image,
    });
    setToast(`${product.name} has been added to your bag.`);
  };

  const handleAddToWishlist = () => {
    const wishlistVariant = selectedVariant || product.sizes?.[0] || {};
    addToWishlist({
      productId: product.id,
      productVariantId: wishlistVariant.variant_id || null,
      sizeLabel: wishlistVariant.label,
      name: product.name,
      price: wishlistVariant.price || product.price,
      image: galleryImages[activeImage] || product.image,
    });
    setToast(`${product.name} has been added to your wishlist.`);
  };

  return (
    <>
      <div className="pdp">
        <div className="pdp-grid">
          <div className="pdp-gallery">
            <div className="pdp-gallery__thumbs">
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  className={`pdp-gallery__thumb ${
                    activeImage === index ? "pdp-gallery__thumb--active" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                  key={`${image}-${index}`}
                  aria-label={`View product image ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>

            <div className="pdp-gallery__main">
              <img
                src={galleryImages[activeImage] || product.image}
                alt={product.name}
                className="pdp-gallery__img"
              />
              <span className="pdp-gallery__counter">
                {activeImage + 1} / {galleryImages.length}
              </span>
            </div>
          </div>

          <div className="pdp-info">
            <div className="pdp-info__collection">
              {product.category.replaceAll("-", " ")}
            </div>
            <h1 className="pdp-info__name">{product.name}</h1>
            <div className="pdp-info__subtitle">{product.subtitle}</div>

            <div className="pdp-price-row">
              <span className="pdp-price">
                Rs. {product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="pdp-price-orig">
                  Rs. {product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <p className="pdp-price-incl">Inclusive of all taxes</p>

            <div className="pdp-divider" />
            <p className="pdp-info__subtitle">{product.description}</p>

            <div className="pdp-section">
              <div className="pdp-section__label">
                Colour
                <span className="pdp-section__value">
                  {selectedColor?.label}
                </span>
              </div>
              <div className="pdp-colors">
                {product.colors.map((color) => (
                  <button
                    type="button"
                    className="pdp-swatch"
                    key={color.id}
                    title={color.label}
                    aria-label={`Select ${color.label}`}
                    onClick={() => handleColorChange(color.id)}
                    style={{
                      backgroundColor: color.hex,
                      borderColor: color.border,
                      outlineColor:
                        selectedColor?.id === color.id ? "#111" : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="pdp-section">
              <div className="pdp-section__label">Size</div>
              <div className="pdp-sizes">
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    className={`pdp-size-btn ${
                      selectedSize === size.label
                        ? "pdp-size-btn--active"
                        : ""
                    } ${!size.available ? "pdp-size-btn--disabled" : ""}`}
                    key={size.label}
                    disabled={!size.available}
                    onClick={() => setSelectedSize(size.label)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pdp-cta">
              <button
                type="button"
                className="pdp-btn-cart"
                onClick={handleAddToCart}
              >
                Add to bag
              </button>
              <button
                type="button"
                className="pdp-btn-wish"
                onClick={handleAddToWishlist}
                aria-label="Add to wishlist"
                title="Add to wishlist"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            <div className="pdp-trust">
              {product.trustBadges?.map((badge) => (
                <span className="pdp-trust__tag" key={badge}>
                  {badge}
                </span>
              ))}
            </div>

            <div className="pdp-acc">
              {product.accordion?.map((item) => {
                const isOpen = openAccordion === item.id;

                return (
                  <div className="pdp-acc__item" key={item.id}>
                    <button
                      type="button"
                      className="pdp-acc__trigger"
                      onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                    >
                      {item.title}
                      <span
                        className={`pdp-acc__icon ${
                          isOpen ? "pdp-acc__icon--open" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`pdp-acc__body ${
                        isOpen ? "pdp-acc__body--open" : ""
                      }`}
                    >
                      <p>{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <ReviewsSection productId={product.id} />
      </div>

      {toast && <div className="pdp-toast pdp-toast--visible">{toast}</div>}
    </>
  );
};

export default CollectionProductPage;
