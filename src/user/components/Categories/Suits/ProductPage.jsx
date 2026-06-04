import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../../../styles/ProductPage.css";

// ─── IMAGE IMPORTS ──────────────────────────
// Black
import img1 from "../../../../shared/assets/images/ProductDetail/SangeetBlackLeft2.jpg";
import img2 from "../../../../shared/assets/images/ProductDetail/SangeetBlackLeft1.jpg";
import img3 from "../../../../shared/assets/images/ProductDetail/SangeetBlack.jpg";
import img4 from "../../../../shared/assets/images/ProductDetail/SangeetBlackLeft3.jpg";
import img5 from "../../../../shared/assets/images/ProductDetail/SangeetBlackLeft4.jpg";

// Ivory
import iv1 from "../../../../shared/assets/images/ProductDetail/SangeetCream.jpg";
import iv2 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg";
import iv3 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import iv4 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft3.jpg";
import iv5 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft4.jpg";

// ─── PRODUCTS ──────────────────────────
const products = [
  {
    id: 1,
    collection: "The Ceremonial Edit",
    name: "The Royal Wedding Edit",
    subtitle: "Midnight Floral Jacquard",
    price: 24999,
    originalPrice: 32000,
    rating: 4.9,
    reviewCount: 87,
    stock: "low",
    colors: [
      { id: "midnight", label: "Midnight Black" },
      { id: "ivory", label: "Ivory Cream" },
    ],
    sizes: [
      { label: "38", available: true },
      { label: "40", available: true },
    ],
    imagesByColor: {
      midnight: [img1, img2, img3, img4, img5],
      ivory: [iv1, iv2, iv3, iv4, iv5],
    },
    accordion: [
      {
        id: "desc",
        title: "Description",
        body: "Premium wedding sherwani crafted with luxury jacquard fabric.",
      },
      {
        id: "fabric",
        title: "Fabric",
        body: "Silk blend with soft inner lining.",
      },
    ],
  },
];

// ─── COMPONENT ──────────────────────────
function ProductPage() {
  const { id } = useParams();

  const product = products.find((p) => p.id === parseInt(id));

  const [selectedColor, setSelectedColor] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [toast, setToast] = useState({ msg: "", visible: false });

  const ctaRef = useRef(null);

  // ✅ Load product
  useEffect(() => {
    if (product) {
      const defaultColor = product.colors[0];
      setSelectedColor(defaultColor);
      setGalleryImages(product.imagesByColor[defaultColor.id]);
    }
  }, [product]);

  // ✅ Toast
  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 2000);
  }, []);

  // ✅ Handlers
  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Select size first");
      return;
    }
    showToast(`Added ${product.name}`);
  };

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <>
      <div className="pdp">
        <div className="pdp-grid">

          {/* ─── IMAGE GALLERY ─── */}
          <div className="pdp-gallery">
            <div className="pdp-gallery__thumbs">
              {galleryImages.map((img, i) => (
                <img key={i} src={img} alt="" />
              ))}
            </div>

            <div className="pdp-gallery__main">
              <img src={galleryImages[0]} alt={product.name} />
            </div>
          </div>

          {/* ─── PRODUCT INFO ─── */}
          <div className="pdp-info">

            <div className="pdp-info__collection">
              {product.collection}
            </div>

            <h1 className="pdp-info__name">{product.name}</h1>

            <div className="pdp-info__subtitle">
              {product.subtitle}
            </div>

            {/* PRICE */}
            <div className="pdp-price-row">
              <span className="pdp-price">₹{product.price}</span>
              <span className="pdp-price-orig">
                ₹{product.originalPrice}
              </span>
            </div>

            {/* COLORS */}
            <div className="pdp-section">
              <div className="pdp-section__label">
                Colour {selectedColor?.label}
              </div>

              <div className="pdp-colors">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    className={`pdp-swatch ${
                      selectedColor?.id === c.id
                        ? "pdp-swatch--active"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedColor(c);
                      setGalleryImages(product.imagesByColor[c.id]);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div className="pdp-section">
              <div className="pdp-section__label">Size</div>

              <div className="pdp-sizes">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    className={`pdp-size-btn ${
                      selectedSize?.label === s.label
                        ? "pdp-size-btn--active"
                        : ""
                    }`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pdp-cta" ref={ctaRef}>
              <button
                className="pdp-btn-cart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* ACCORDION */}
            <div className="pdp-acc">
              {product.accordion.map((item) => (
                <div key={item.id}>
                  <button
                    className="pdp-acc__trigger"
                    onClick={() =>
                      setOpenAccordion(
                        openAccordion === item.id ? null : item.id
                      )
                    }
                  >
                    {item.title}
                  </button>

                  {openAccordion === item.id && (
                    <p>{item.body}</p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* TOAST */}
      {toast.visible && (
        <div className="pdp-toast pdp-toast--visible">
          {toast.msg}
        </div>
      )}
    </>
  );
}

export default ProductPage;