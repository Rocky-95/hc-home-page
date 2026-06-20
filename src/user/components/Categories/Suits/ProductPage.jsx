import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../../../shared/assets/json/products";
import PageHeader from "../../../../shared/components/PageHeader";
import "../../../styles/ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products[id];

  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [fadingImg, setFadingImg] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [wished, setWished] = useState(false);
  const [toast, setToast] = useState({ msg: "", visible: false });
  const [stickyVisible, setStickyVisible] = useState(false);

  const ctaRef = useRef(null);

  // Load defaults
  useEffect(() => {
    if (product) {
      const defaultColor = product.colors[0];
      setSelectedColor(defaultColor);
      setActiveImg(0);
    }
    window.scrollTo(0, 0);
  }, [product, id]);

  // Sticky CTA on mobile
  useEffect(() => {
    if (!ctaRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, [product]);

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 2200);
  }, []);

  const galleryImages =
    selectedColor && product
      ? product.imagesByColor[selectedColor.id] || []
      : [];

  const handleColorChange = (c) => {
    setFadingImg(true);
    setTimeout(() => {
      setSelectedColor(c);
      setActiveImg(0);
      setFadingImg(false);
    }, 250);
  };

  const handlePrev = () =>
    setActiveImg((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const handleNext = () =>
    setActiveImg((i) => (i + 1) % galleryImages.length);

  const handleAddToCart = () => {
    if (!selectedSize) { showToast("Please select a size first"); return; }
    showToast(`Added to cart: ${product.name}`);
  };

  if (!product) {
    return (
      <>
        <PageHeader breadcrumbs={[{ label: "Product Not Found" }]} />
        <div className="container py-5 text-center">
          <h2>Product not found</h2>
          <p className="text-muted mt-2">The product <code>{id}</code> does not exist.</p>
          <button className="btn btn-dark mt-3" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </>
    );
  }

  const stockLabel = product.stock === "in" ? "In Stock" : product.stock === "low" ? "Only a few left" : "Out of Stock";
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const breadcrumbs = [
    { label: product.collection || "Products", to: -1 },
    { label: product.name },
  ];

  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />

      <div className="pdp">
        <div className="pdp-grid">

          {/* ── GALLERY ── */}
          <div className="pdp-gallery">
            {/* Thumbnails */}
            <div className="pdp-gallery__thumbs">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  className={`pdp-gallery__thumb ${i === activeImg ? "pdp-gallery__thumb--active" : ""}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" />
                  <span className="pdp-gallery__thumb-bar" style={{ background: i === activeImg ? "#111" : "transparent" }} />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="pdp-gallery__main">
              {galleryImages[activeImg] && (
                <img
                  src={galleryImages[activeImg]}
                  alt={product.name}
                  className={`pdp-gallery__img${fadingImg ? " pdp-gallery__img--fade" : ""}`}
                />
              )}
              <span className="pdp-gallery__counter">{activeImg + 1} / {galleryImages.length}</span>
              <button className="pdp-gallery__arrow pdp-gallery__arrow--prev" onClick={handlePrev} aria-label="Previous">&#8249;</button>
              <button className="pdp-gallery__arrow pdp-gallery__arrow--next" onClick={handleNext} aria-label="Next">&#8250;</button>
            </div>
          </div>

          {/* ── PRODUCT INFO ── */}
          <div className="pdp-info">

            <div className="pdp-info__collection">{product.collection}</div>
            <h1 className="pdp-info__name">{product.name}</h1>
            <div className="pdp-info__subtitle">{product.subtitle}</div>

            {/* Rating */}
            {product.rating && (
              <div className="pdp-info__rating mb-2">
                <div className="pdp-stars">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="pdp-star" width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? "#111" : "none"} stroke="#111" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="pdp-info__rating-count">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            )}

            <div className="pdp-divider" />

            {/* Price */}
            <div className="pdp-price-row">
              <span className="pdp-price">&#8377;{product.price?.toLocaleString("en-IN")}</span>
              {product.originalPrice && (
                <span className="pdp-price-orig">&#8377;{product.originalPrice?.toLocaleString("en-IN")}</span>
              )}
              {discount > 0 && <span className="pdp-price-badge">{discount}% OFF</span>}
            </div>
            <div className="pdp-price-incl">Inclusive of all taxes</div>

            {/* Stock */}
            <div className={`pdp-stock pdp-stock--${product.stock} mb-3`}>
              <span className="pdp-stock__dot" />
              <span>{stockLabel}</span>
            </div>

            {/* Colors */}
            {product.colors && (
              <div className="pdp-section">
                <div className="pdp-section__label">
                  Colour <span className="pdp-section__value">{selectedColor?.label}</span>
                </div>
                <div className="pdp-colors">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      className={`pdp-swatch ${selectedColor?.id === c.id ? "pdp-swatch--active" : ""}`}
                      style={{
                        background: c.hex,
                        borderColor: c.border,
                        outlineColor: selectedColor?.id === c.id ? "#111" : "transparent",
                      }}
                      onClick={() => handleColorChange(c)}
                      aria-label={c.label}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="pdp-section">
                <div className="pdp-section__label" style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Size {selectedSize && <span className="pdp-section__value">{selectedSize.label}</span>}</span>
                  {product.sizeChart && (
                    <button className="pdp-size-guide-btn" onClick={() => setSizeModalOpen(true)}>Size Guide</button>
                  )}
                </div>
                <div className="pdp-sizes">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      className={`pdp-size-btn ${selectedSize?.label === s.label ? "pdp-size-btn--active" : ""} ${!s.available ? "pdp-size-btn--disabled" : ""}`}
                      disabled={!s.available}
                      onClick={() => s.available && setSelectedSize(s)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pdp-cta" ref={ctaRef}>
              <button className="pdp-btn-cart" onClick={handleAddToCart} disabled={product.stock === "out"}>
                <span className="pdp-btn-cart__text">
                  {product.stock === "out" ? "Out of Stock" : "Add to Cart"}
                </span>
              </button>
              <button
                className={`pdp-btn-wish ${wished ? "pdp-btn-wish--active" : ""}`}
                onClick={() => setWished((w) => !w)}
                aria-label="Wishlist"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? "#e63946" : "none"} stroke={wished ? "#e63946" : "#111"} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Trust badges */}
            {product.trustBadges && (
              <div className="pdp-trust">
                {product.trustBadges.map((b) => (
                  <span key={b} className="pdp-trust__tag">{b}</span>
                ))}
              </div>
            )}

            {product.sku && <div className="pdp-sku">SKU: {product.sku}</div>}

            <div className="pdp-divider" />

            {/* Accordion */}
            {product.accordion && (
              <div className="pdp-acc">
                {product.accordion.map((item) => (
                  <div key={item.id} className="pdp-acc__item">
                    <button
                      className="pdp-acc__trigger"
                      onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    >
                      {item.title}
                      <span className={`pdp-acc__icon ${openAccordion === item.id ? "pdp-acc__icon--open" : ""}`}>+</span>
                    </button>
                    <div className={`pdp-acc__body ${openAccordion === item.id ? "pdp-acc__body--open" : ""}`}>
                      <p>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Size Guide Modal ── */}
      {product.sizeChart && (
        <div
          className={`pdp-modal-overlay ${sizeModalOpen ? "pdp-modal-overlay--open" : ""}`}
          onClick={(e) => e.target === e.currentTarget && setSizeModalOpen(false)}
        >
          <div className="pdp-modal">
            <button className="pdp-modal__close" onClick={() => setSizeModalOpen(false)}>&#215;</button>
            <div className="pdp-modal__header">
              <span className="pdp-modal__eyebrow">Sizing</span>
              <h3 className="pdp-modal__title">Size Guide</h3>
              <p className="pdp-modal__sub">All measurements in inches.</p>
            </div>
            <table className="pdp-size-table">
              <thead>
                <tr>
                  <th>Size</th><th>Chest</th><th>Waist</th><th>Length</th>
                </tr>
              </thead>
              <tbody>
                {product.sizeChart.map((row) => (
                  <tr key={row.size}>
                    <td className="pdp-size-table__label">{row.size}</td>
                    <td>{row.chest}</td>
                    <td>{row.waist}</td>
                    <td>{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Sticky mobile CTA ── */}
      <div className={`pdp-sticky ${stickyVisible ? "pdp-sticky--visible" : ""}`}>
        <div className="pdp-sticky__info">
          <span className="pdp-sticky__name">{product.name}</span>
          <span className="pdp-sticky__price">&#8377;{product.price?.toLocaleString("en-IN")}</span>
        </div>
        <button className="pdp-sticky__btn" onClick={handleAddToCart}>Add to Cart</button>
      </div>

      {/* ── Toast ── */}
      <div className={`pdp-toast ${toast.visible ? "pdp-toast--visible" : ""}`}>
        <span className="pdp-toast__dot" style={{ background: toast.msg.includes("size") ? "#C58B2A" : "#2E7D5B" }} />
        {toast.msg}
      </div>
    </>
  );
}