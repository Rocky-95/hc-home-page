import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditorialPage.css";
import productService from "../../services/productService";

/* ── Fallback assets from existing project images ── */
import heroImg     from "../../shared/assets/images/SuitsPage/LabelNew1.jpeg";
import feat1Img    from "../../shared/assets/images/SuitsPage/DesignerNew.jpeg";
import feat2Img    from "../../shared/assets/images/SuitsPage/TravelNew.jpeg";
import card1Img    from "../../shared/assets/images/SuitsPage/WeddingNew.jpeg";
import card2Img    from "../../shared/assets/images/SuitsPage/SmartCasualNew.jpeg";
import card3Img    from "../../shared/assets/images/SuitsPage/SuitsCatImgNanoDemo.jpeg";
import twoup1Img   from "../../shared/assets/images/Business.jpeg";
import twoup2Img   from "../../shared/assets/images/Wedding.jpeg";

const DEFAULT_FEATURED = {
  tag: "Cover Story",
  title: "The Art of the Perfect Suit",
  desc: "From the first drape of fabric to the final stitch, every Harry Clinton suit is a study in restraint and precision. We go behind the seams of our most celebrated silhouette.",
  meta: "Editorial · June 2025",
  img: feat1Img,
  to: "/collection/designer",
};

const DEFAULT_FEATURE2 = {
  tag: "In Focus",
  title: "Travel Ready, Always Refined",
  desc: "Our Travel Collection is engineered for the man who moves between boardrooms and airports without losing a single crease. Wrinkle-resistant, breathable, impeccable.",
  meta: "Collection Feature · May 2025",
  img: feat2Img,
  to: "/collection/travel",
};

const DEFAULT_CARDS = [
  { id: 1, img: card1Img, badge: "Spotlight", title: "The Wedding Edit", sub: "Ceremonial Tailoring · 2025", to: "/collection/wedding" },
  { id: 2, img: card2Img, badge: "Spotlight", title: "Smart Casual Redefined", sub: "Everyday Luxury · 2025", to: "/collection/smart-casual" },
  { id: 3, img: card3Img, badge: "New", title: "Nano Collection Preview", sub: "Designer Series · 2025", to: "/collection/designer" },
];

const DEFAULT_TWOUP = [
  { id: 1, img: twoup1Img, tag: "Business", title: "Power Dressing, Perfected", cta: "Explore", to: "/suits" },
  { id: 2, img: twoup2Img, tag: "Occasion", title: "Celebrations in Style", cta: "Explore", to: "/suits" },
];

const MARQUEE = ["HC SPOTLIGHT", "·", "EDITORIAL", "·", "BEHIND THE SEAMS", "·", "HARRY CLINTON", "·", "THE CRAFT", "·"];

const placeholder = "https://via.placeholder.com/800x600?text=HC+Spotlight";

const HCSpotlightPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchSpotlight = async () => {
      try {
        const [entriesRes, mediaRes] = await Promise.all([
          productService.getSpotlightEntries(),
          productService.getSpotlightMedia(),
        ]);
        const apiEntries = entriesRes.data?.data || entriesRes.data || [];
        const apiMedia = mediaRes.data?.data || mediaRes.data || [];
        const activeEntries = apiEntries.filter((e) => e.isactive === 1 || e.isactive === true || e.isactive === undefined);
        const activeMedia = apiMedia.filter((m) => m.isactive === 1 || m.isactive === true || m.isactive === undefined);
        setEntries(activeEntries);
        setMedia(activeMedia);
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchSpotlight();
  }, []);

  const featured = entries[0]
    ? {
        tag: entries[0].subtitle || "Cover Story",
        title: entries[0].title || DEFAULT_FEATURED.title,
        desc: entries[0].description || DEFAULT_FEATURED.desc,
        meta: entries[0].start_date
          ? `Editorial · ${new Date(entries[0].start_date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`
          : DEFAULT_FEATURED.meta,
        img: media[0]?.media_url || media[0]?.image_url || DEFAULT_FEATURED.img,
        to: media[0]?.redirect_link || entries[0].redirect_link || DEFAULT_FEATURED.to,
      }
    : DEFAULT_FEATURED;

  const feature2 = entries[1]
    ? {
        tag: entries[1].subtitle || "In Focus",
        title: entries[1].title || DEFAULT_FEATURE2.title,
        desc: entries[1].description || DEFAULT_FEATURE2.desc,
        meta: entries[1].start_date
          ? `Collection Feature · ${new Date(entries[1].start_date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`
          : DEFAULT_FEATURE2.meta,
        img: media[1]?.media_url || media[1]?.image_url || DEFAULT_FEATURE2.img,
        to: media[1]?.redirect_link || entries[1].redirect_link || DEFAULT_FEATURE2.to,
      }
    : DEFAULT_FEATURE2;

  const cards =
    media.length > 2
      ? media.slice(2, 5).map((m, i) => ({
          id: m.spotlight_media_id || m.id || i,
          img: m.media_url || m.image_url || DEFAULT_CARDS[i]?.img || placeholder,
          badge: m.alt_text || "Spotlight",
          title: entries[i + 2]?.title || m.alt_text || DEFAULT_CARDS[i]?.title || "Spotlight",
          sub: entries[i + 2]?.description || DEFAULT_CARDS[i]?.sub || "",
          to: m.redirect_link || entries[i + 2]?.redirect_link || DEFAULT_CARDS[i]?.to || "/hc-spotlight",
        }))
      : DEFAULT_CARDS;

  const twoUp =
    media.length > 5
      ? media.slice(5, 7).map((m, i) => ({
          id: m.spotlight_media_id || m.id || i,
          img: m.media_url || m.image_url || DEFAULT_TWOUP[i]?.img || placeholder,
          tag: m.alt_text || DEFAULT_TWOUP[i]?.tag || "Shop",
          title: entries[i + 5]?.title || DEFAULT_TWOUP[i]?.title || "Explore",
          cta: "Explore",
          to: m.redirect_link || entries[i + 5]?.redirect_link || DEFAULT_TWOUP[i]?.to || "/suits",
        }))
      : DEFAULT_TWOUP;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status"><span className="visually-hidden">Loading spotlight...</span></div>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="ep-hero">
        <img src={heroImg} alt="HC Spotlight" className="ep-hero__bg" />
        <div className="ep-hero__content">
          <p className="ep-hero__eyebrow">Harry Clinton</p>
          <h1 className="ep-hero__title">HC Spotlight</h1>
          <p className="ep-hero__sub">
            Editorials, stories and craft features from the world of Harry Clinton.
          </p>
          <button className="ep-btn" onClick={() => document.getElementById("spotlight-content")?.scrollIntoView({ behavior: "smooth" })}>
            Read Now
          </button>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="ep-marquee">
        <div className="ep-marquee__track">
          {Array(4).fill(MARQUEE).flat().map((w, i) => (
            <span key={i} className={w === "·" ? "ep-marquee__dot" : "ep-marquee__word"}>{w}</span>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div id="spotlight-content" className="container-fluid px-4 px-md-5 py-5">
        <p className="ep-label mb-4">Cover Story</p>
        <div className="ep-feature mb-5" onClick={() => navigate(featured.to)}>
          <div className="ep-feature__img-wrap">
            <img src={featured.img} alt={featured.title} className="ep-feature__img" onError={(e) => { e.target.src = placeholder; }} />
          </div>
          <div className="ep-feature__body">
            <p className="ep-feature__tag">{featured.tag}</p>
            <h2 className="ep-feature__title">{featured.title}</h2>
            <p className="ep-feature__desc">{featured.desc}</p>
            <p className="ep-feature__meta">{featured.meta}</p>
          </div>
        </div>

        {/* Quote */}
        <div className="ep-quote">
          <span className="ep-quote__mark">"</span>
          <p className="ep-quote__text">
            A suit is not merely clothing — it is the architecture of a man's presence.
          </p>
          <p className="ep-quote__author">— Harry Clinton, Founder</p>
        </div>

        <p className="ep-label mb-4">More Spotlights</p>
        <div className="ep-grid mb-5">
          {cards.map((c) => (
            <div className="ep-card" key={c.id} onClick={() => navigate(c.to)}>
              <div className="ep-card__img-wrap">
                <img src={c.img} alt={c.title} className="ep-card__img" onError={(e) => { e.target.src = placeholder; }} />
                <span className="ep-card__badge">{c.badge}</span>
                <div className="ep-card__overlay" />
              </div>
              <div className="ep-card__body">
                <p className="ep-card__title">{c.title}</p>
                <p className="ep-card__sub">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="ep-label mb-4">In Focus</p>
        <div className="ep-feature ep-feature--reverse mb-5" onClick={() => navigate(feature2.to)}>
          <div className="ep-feature__img-wrap">
            <img src={feature2.img} alt={feature2.title} className="ep-feature__img" onError={(e) => { e.target.src = placeholder; }} />
          </div>
          <div className="ep-feature__body">
            <p className="ep-feature__tag">{feature2.tag}</p>
            <h2 className="ep-feature__title">{feature2.title}</h2>
            <p className="ep-feature__desc">{feature2.desc}</p>
            <p className="ep-feature__meta">{feature2.meta}</p>
          </div>
        </div>

        <p className="ep-label mb-4">Shop the Story</p>
        <div className="ep-twoup">
          {twoUp.map((t) => (
            <div className="ep-twoup__item" key={t.id} onClick={() => navigate(t.to)}>
              <img src={t.img} alt={t.title} className="ep-twoup__img" onError={(e) => { e.target.src = placeholder; }} />
              <div className="ep-twoup__body">
                <p className="ep-twoup__tag">{t.tag}</p>
                <p className="ep-twoup__title">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HCSpotlightPage;
