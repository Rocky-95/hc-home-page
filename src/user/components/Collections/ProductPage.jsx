import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../../../shared/assets/json/tuxedoProducts";
import "../../styles/ProductPage.css";
import "../../styles/CollectionPage.css";

const CollectionProductPage = () => {
  const { id } = useParams();
  const product = useMemo(
    () => products.find((item) => String(item.id) === id),
    [id]
  );

  const [selectedColorId, setSelectedColorId] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setSelectedColorId(product?.colors?.[0]?.id || "");
    setSelectedSize("");
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
    product.imagesByColor?.[selectedColor?.id] || [product.image];

  const handleColorChange = (colorId) => {
    setSelectedColorId(colorId);
    setActiveImage(0);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setToast("Please select a size first.");
      return;
    }

    setToast(`${product.name} has been added to your bag.`);
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

      {toast && <div className="pdp-toast pdp-toast--visible">{toast}</div>}
    </>
  );
};

export default CollectionProductPage;
