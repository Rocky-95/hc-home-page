import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../../services/productService";
import ProductGrid from "./ProductGrid";
import { safeParse, getSetting, useContentData } from "../../utils/contentHelpers";
import "../styles/SuitsCategoryPage.css";

const placeholderImage = "https://via.placeholder.com/400x500?text=Category";

const CategoryPage = ({
  categorySlug,
  heroImage,
  heroTitle,
  heroSubtitle,
  marqueeWords,
  fallbackSubcategories = [],
}) => {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState(fallbackSubcategories);
  const [loading, setLoading] = useState(true);
  const { settings } = useContentData();

  const key = (suffix) => `category_${categorySlug.toLowerCase().replace(/\s+/g, "_")}_${suffix}`;
  const s = (suffix) => getSetting(settings, key(suffix));

  const dynamicHeroImage = s("hero_image") || heroImage;
  const dynamicHeroTitle = s("hero_title") || heroTitle;
  const dynamicHeroSubtitle = s("hero_subtitle") || heroSubtitle;
  const dynamicMarquee = safeParse(s("marquee_words")) || marqueeWords;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [catsRes, subsRes] = await Promise.all([
          productService.getMenuCategories(),
          productService.getMenuSubCategories(),
        ]);
        const categories = catsRes.data?.data || catsRes.data || [];
        const subcategories = subsRes.data?.data || subsRes.data || [];

        const category = categories.find(
          (c) =>
            c.menu_category_slug?.toLowerCase() === categorySlug.toLowerCase() ||
            c.menu_category_name?.toLowerCase() === categorySlug.toLowerCase()
        );

        if (category) {
          const filtered = subcategories
            .filter((s) => s.menu_category_id === category.menu_category_id)
            .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
            .map((s, idx) => ({
              name: s.menu_subcategory_name,
              link:
                (s.redirect_link || "").replace(/^\/collection\//, "/") ||
                `/${s.menu_subcategory_slug || s.menu_subcategory_name.toLowerCase().replace(/\s+/g, "-")}`,
              image: s.menu_subcategory_image_url || s.image_url || fallbackSubcategories[idx]?.image || placeholderImage,
              video: s.video_url || fallbackSubcategories[idx]?.video || null,
            }));
          if (filtered.length > 0) {
            setSubcategories(filtered);
          }
        }
      } catch {
        // keep fallback
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [categorySlug, fallbackSubcategories]);

  useEffect(() => {
    document.title = `${dynamicHeroTitle} | Harry Clinton`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", dynamicHeroSubtitle);
  }, [dynamicHeroTitle, dynamicHeroSubtitle]);

  useEffect(() => {
    const handleScroll = () => {
      const img = document.querySelector(".hero-image");
      if (!img) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y < vh) img.style.transform = `translateY(-${y * 0.4}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const CategoryCard = ({ cat }) => (
    <div
      className="category-card card border-0 rounded-0 overflow-hidden shadow-sm w-100 h-100"
      onClick={() => cat.link && navigate(cat.link)}
    >
      <div className="category-image-wrapper">
        {cat.video ? (
          <video
            src={cat.video}
            className="category-media w-100 h-100"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={cat.image}
            alt={cat.name}
            className="category-media w-100 h-100"
            loading="lazy"
          />
        )}
        <div className="category-overlay">{cat.name}</div>
      </div>
    </div>
  );

  return (
    <>
      <section className="hero-scroll position-relative container-fluid px-0">
        <img src={dynamicHeroImage} alt={dynamicHeroTitle} className="hero-image img-fluid w-100" />
        <div className="position-absolute text-white hero-overlay">
          <h1 className="fw-bold display-4 mb-1">{dynamicHeroTitle}</h1>
          <h5 className="fw-normal mb-0">{dynamicHeroSubtitle}</h5>
          <button
            className="btn btn-light btn-lg fw-semibold mt-3"
            style={{ borderRadius: "20px", padding: "0.5rem 1.5rem" }}
            onClick={() => {
              const section = document.getElementById("category-grid");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop Now
          </button>
        </div>
      </section>

      <div className="bg-light overflow-hidden">
        <div className="d-flex marquee-track py-4">
          {Array(4)
            .fill(dynamicMarquee)
            .flat()
            .map((word, idx) => (
              <span key={idx} className="mx-4 fw-bold text-uppercase">
                {word}
              </span>
            ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading categories...</span>
          </div>
        </div>
      ) : (
        <div id="category-grid" className="container-fluid px-0 my-0">
          <div className="row g-2">
            {subcategories.slice(0, 3).map((cat, i) => (
              <div key={i} className="col-12 col-md-4 d-flex">
                <CategoryCard cat={cat} />
              </div>
            ))}
          </div>
          <div className="row g-2 mt-2">
            {subcategories.slice(3).map((cat, i) => (
              <div key={i} className="col-12 col-md-6 d-flex">
                <CategoryCard cat={cat} />
              </div>
            ))}
          </div>
        </div>
      )}

      <ProductGrid keyword="" />
    </>
  );
};

export default CategoryPage;
