import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import productService from "../../services/productService";
import { useCart } from "../../context/CartContext";
import { useContentData, getSetting, safeParse } from "../../utils/contentHelpers";
import heroBg from "../../shared/assets/images/SuitsPage/LabelNew2.jpeg";
import "../styles/NewArrivalsPage.css";

const placeholder = "https://via.placeholder.com/400x533?text=HC";
const DEFAULT_MARQUEE_WORDS = ["NEW ARRIVALS", "·", "JUST DROPPED", "·", "LATEST CUTS", "·", "FRESH STYLES", "·", "HARRY CLINTON", "·"];

const SkeletonCards = () =>
  Array.from({ length: 8 }).map((_, i) => (
    <div className="na-skeleton-card" key={i}>
      <div className="na-skeleton na-skeleton-img" />
      <div className="na-skeleton na-skeleton-line" />
      <div className="na-skeleton na-skeleton-line na-skeleton-line--short" />
    </div>
  ));

const NewArrivalsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const gridRef = useRef(null);
  const { settings } = useContentData();

  const getSettingValue = (key, fallback = "") => getSetting(settings, `new_arrivals_${key}`) || fallback;

  const heroImage = getSettingValue("hero_bg") || heroBg;
  const heroEyebrow = getSettingValue("hero_eyebrow", "Just Dropped");
  const heroTitle = getSettingValue("hero_title", "New Arrivals");
  const heroSubtitle = getSettingValue("hero_subtitle", "The latest additions,crafted for the modern gentleman.");
  const heroCta = getSettingValue("hero_cta", "Explore Now");
  const marqueeWords = safeParse(getSettingValue("marquee_words")) || DEFAULT_MARQUEE_WORDS;

  const [products, setProducts] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, mediaRes] = await Promise.all([
          productService.getProducts(),
          productService.getProductMedia(),
        ]);
        const allProducts = prodRes.data?.data || prodRes.data || [];
        const allMedia = mediaRes.data?.data || mediaRes.data || [];
        const active = allProducts.filter(
          (p) => p.isactive === 1 || p.isactive === true
        );
        const sorted = [...active].sort(
          (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
        );
        setProducts(sorted.slice(0, 24));
        setMedia(allMedia);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getImage = (productId) => {
    const primary = media.find((m) => m.product_id === productId && m.isprimary);
    const any = media.find((m) => m.product_id === productId);
    return primary?.media_url || any?.media_url || placeholder;
  };

  const getSlug = (p) =>
    p.product_slug || p.product_name?.toLowerCase().replace(/\s+/g, "-") || p.product_id;

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.product_id,
      name: product.product_name,
      price: product.base_price || 0,
      qty: 1,
      image: getImage(product.product_id),
    });
    setAdded((prev) => ({ ...prev, [product.product_id]: true }));
    setTimeout(
      () => setAdded((prev) => ({ ...prev, [product.product_id]: false })),
      1800
    );
  };

  const scrollToGrid = () =>
    gridRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ── Hero ── */}
      <section className="na-hero">
        <img src={heroImage} alt={heroTitle} className="na-hero__bg" />
        <div className="na-hero__content">
          <p className="na-hero__eyebrow">{heroEyebrow}</p>
          <h1 className="na-hero__title">{heroTitle}</h1>
          <p className="na-hero__sub">{heroSubtitle}</p>
          <button className="na-hero__cta" onClick={scrollToGrid}>
            {heroCta}
          </button>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="na-marquee">
        <div className="na-marquee__track">
          {Array(4).fill(marqueeWords).flat().map((w, i) => (
            <span key={i} className={w === "·" ? "na-marquee__dot" : "na-marquee__word"}>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="container-fluid px-4 px-md-5 py-5" ref={gridRef}>
        {/* Toolbar */}
        <div className="na-toolbar">
          <span className="na-toolbar__count">
            {loading ? "Loading…" : `${products.length} Piece${products.length !== 1 ? "s" : ""}`}
          </span>
          <select className="na-toolbar__sort" disabled>
            <option>Newest First</option>
          </select>
        </div>

        {/* Grid */}
        <div className="na-grid">
          {loading ? (
            <SkeletonCards />
          ) : products.length === 0 ? (
            <div className="na-empty">
              <span className="na-empty__icon">🧵</span>
              <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                New pieces are being crafted. Check back soon.
              </p>
              <button
                className="na-hero__cta"
                style={{ color: "#111", borderColor: "#111" }}
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          ) : (
            products.map((product) => {
              const img = getImage(product.product_id);
              const slug = getSlug(product);
              const isAdded = !!added[product.product_id];
              return (
                <div
                  className="na-card"
                  key={product.product_id}
                  onClick={() => navigate(`/product/${slug}`)}
                >
                  <div className="na-card__img-wrap">
                    <img
                      src={img}
                      alt={product.product_name}
                      className="na-card__img"
                      onError={(e) => { e.target.src = placeholder; }}
                    />
                    <span className="na-card__badge">New</span>
                    <button
                      className={`na-card__quick-add${isAdded ? " na-card__quick-add--added" : ""}`}
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      {isAdded ? "Added to Bag ✓" : "Quick Add"}
                    </button>
                  </div>
                  <div className="na-card__body">
                    <Link
                      to={`/product/${slug}`}
                      className="na-card__name"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {product.product_name}
                    </Link>
                    {product.base_price ? (
                      <p className="na-card__price">
                        ₹{Number(product.base_price).toLocaleString("en-IN")}
                      </p>
                    ) : (
                      <p className="na-card__price na-card__price--na">Price on request</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default NewArrivalsPage;
