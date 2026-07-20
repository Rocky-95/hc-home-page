import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmbroideryPage.css";
import { safeParse, getSetting, getSection, useContentData } from "../../utils/contentHelpers";

import heroImg    from "../../shared/assets/images/vision1.jpeg";
import aboutImg   from "../../shared/assets/images/vision_title.jpeg";
import compImg    from "../../shared/assets/images/SuitsPage/LabelNew2.jpeg";
import handImg    from "../../shared/assets/images/SuitsPage/WeddingNew.jpeg";
import ctaImg     from "../../shared/assets/images/SuitsPage/DesignerNew.jpeg";
import avatarImg  from "../../shared/assets/images/HC-Logo-Golden.PNG";

import gallery1   from "../../shared/assets/images/Wedding.jpeg";
import gallery2   from "../../shared/assets/images/SuitsPage/TravelNew.jpeg";
import gallery3   from "../../shared/assets/images/SmartCasual.jpeg";
import gallery4   from "../../shared/assets/images/SuitsPage/LabelNew.jpeg";
import gallery5   from "../../shared/assets/images/Business.jpeg";
import gallery6   from "../../shared/assets/images/Designer.jpeg";

const placeholder = "https://via.placeholder.com/800x600?text=Embroidery";

const defaultServices = [
  {
    title: "Computer Embroidery",
    label: "Precision Technology",
    img: compImg,
    points: ["High precision embroidery", "Large production capacity", "Premium thread finish", "Corporate uniforms", "Fashion brands", "Custom logo embroidery"],
    cta: "Explore Computer Embroidery",
  },
  {
    title: "Hand Embroidery",
    label: "Artisan Craft",
    img: handImg,
    points: ["Zardozi", "Aari Work", "Beadwork", "Sequin embroidery", "Bridal couture", "Luxury bespoke designs"],
    cta: "Explore Hand Embroidery",
  },
];

const defaultWhyCards = [
  { icon: "✦", title: "Premium Quality", desc: "Only the finest threads, fabrics, and finishes leave our studio." },
  { icon: "✦", title: "Master Craftsmen", desc: "Decades of inherited skill passed through artisan families." },
  { icon: "✦", title: "Custom Design Solutions", desc: "Bespoke embroidery tailored to your unique vision." },
  { icon: "✦", title: "Fast Turnaround", desc: "Efficient production without compromising on luxury." },
];

const defaultExperienceCards = [
  { icon: "✦", stat: "3000+", label: "Embroidery Projects Completed" },
  { icon: "✦", stat: "20+", label: "Years of Hand & Computer Embroidery" },
  { icon: "✦", stat: "150+", label: "Fashion Brands & Designers Trust Us" },
  { icon: "✦", stat: "∞", label: "Premium Quality in Every Stitch" },
];

const defaultProcessSteps = [
  { no: "1", label: "Consultation" },
  { no: "2", label: "Design Digitization" },
  { no: "3", label: "Embroidery Production" },
  { no: "4", label: "Quality Inspection" },
  { no: "5", label: "Delivery" },
];

const defaultTestimonials = [
  { quote: "The precision of their computer embroidery is unmatched. Our brand logos have never looked better.", name: "Rohit Mehra", role: "Fashion Brand Director" },
  { quote: "HC brought my bridal lehenga to life with zardozi work that felt like heirloom craftsmanship.", name: "Ananya Sharma", role: "Bride, Delhi" },
  { quote: "From concept to stitch, the entire process felt premium, professional, and deeply personal.", name: "Vikram Rao", role: "Couture Designer" },
];

const defaultGallery = [
  { img: gallery1, caption: "Bridal Lehenga Embroidery", wide: true },
  { img: gallery2, caption: "Couture Jacket Embroidery", tall: true },
  { img: gallery3, caption: "Floral Hand Embroidery" },
  { img: gallery4, caption: "Computer Logo Embroidery", wide: true },
  { img: gallery5, caption: "Gold Thread Details" },
  { img: gallery6, caption: "Artisan Hands at Work" },
];

const EmbroideryPage = () => {
  const navigate = useNavigate();
  const { loading, settings, sections } = useContentData(["embroidery", "services"]);

  const s = (key) => getSetting(settings, key);
  const sec = (title) => getSection(sections, title);

  const hero = {
    image: s("embroidery_hero_image") || heroImg,
    eyebrow: s("embroidery_hero_eyebrow") || sec("Hero Eyebrow") || "HC Atelier Services",
    title: s("embroidery_hero_title") || sec("Hero Title") || "Embroidery",
    subtitle: s("embroidery_hero_subtitle") || sec("Hero Subtitle") || "Crafted with Precision. Stitched with Passion.",
    body: s("embroidery_hero_body") || sec("Hero Body") || "From timeless hand embroidery to precision computer embroidery, we transform every design into a masterpiece.",
    cta: s("embroidery_hero_cta") || sec("Hero CTA") || "Get a Quote",
  };

  const about = {
    image: s("embroidery_about_image") || aboutImg,
    label: s("embroidery_about_label") || sec("About Label") || "Heritage",
    title: s("embroidery_about_title") || sec("About Title") || "The Art of Embroidery",
    desc: s("embroidery_about_desc") || sec("About Description") || "Embroidery is where craftsmanship meets storytelling. At HC, we combine modern embroidery technology with traditional artistry to create garments that celebrate luxury, precision, and individuality.",
  };

  const experience = {
    label: s("embroidery_experience_label") || sec("Experience Label") || "Our Experience",
    title: s("embroidery_experience_title") || sec("Experience Title") || "A Legacy of Stitched Excellence",
    cards: safeParse(s("embroidery_experience_cards")) || defaultExperienceCards,
  };

  const services = {
    label: s("embroidery_services_label") || sec("Services Label") || "Services",
    title: s("embroidery_services_title") || sec("Services Title") || "Two Disciplines. One Standard.",
    items: safeParse(s("embroidery_services")) || defaultServices,
  };

  const why = {
    label: s("embroidery_why_label") || sec("Why Label") || "Why Choose HC",
    title: s("embroidery_why_title") || sec("Why Title") || "The HC Difference",
    cards: safeParse(s("embroidery_why_cards")) || defaultWhyCards,
  };

  const gallery = {
    label: s("embroidery_gallery_label") || sec("Gallery Label") || "Portfolio",
    title: s("embroidery_gallery_title") || sec("Gallery Title") || "Editorial Gallery",
    items: safeParse(s("embroidery_gallery")) || defaultGallery,
  };

  const process = {
    label: s("embroidery_process_label") || sec("Process Label") || "Process",
    title: s("embroidery_process_title") || sec("Process Title") || "From Thread to Treasure",
    steps: safeParse(s("embroidery_process_steps")) || defaultProcessSteps,
  };

  const testimonials = {
    label: s("embroidery_testimonials_label") || sec("Testimonials Label") || "Testimonials",
    title: s("embroidery_testimonials_title") || sec("Testimonials Title") || "Client Words",
    items: safeParse(s("embroidery_testimonials")) || defaultTestimonials,
  };

  const cta = {
    image: s("embroidery_cta_image") || ctaImg,
    title: s("embroidery_cta_title") || sec("CTA Title") || "Ready to Stitch Your Vision?",
    sub: s("embroidery_cta_sub") || sec("CTA Subtitle") || "Whether you need precision machine embroidery or handcrafted luxury detailing, HC brings your ideas to life with exceptional craftsmanship.",
    button: s("embroidery_cta_button") || sec("CTA Button") || "Get a Quote",
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status"><span className="visually-hidden">Loading embroidery...</span></div>
      </div>
    );
  }

  return (
    <>
      <section className="ep-hero-landing">
        <img src={hero.image} alt="Embroidery" className="ep-hero-landing__bg" onError={(e) => { e.target.src = placeholder; }} />
        <div className="ep-hero-landing__overlay" />
        <div className="ep-hero-landing__content">
          <p className="ep-hero-landing__eyebrow">{hero.eyebrow}</p>
          <h1 className="ep-hero-landing__title">{hero.title}</h1>
          <p className="ep-hero-landing__subtitle">{hero.subtitle}</p>
          <p className="ep-hero-landing__body">{hero.body}</p>
          <button className="ep-hero-landing__btn" onClick={() => navigate("/book-appointment")}>{hero.cta}</button>
        </div>
      </section>

      <section className="ep-about-split">
        <div className="ep-about-split__img-wrap">
          <img src={about.image} alt="The Art of Embroidery" className="ep-about-split__img" onError={(e) => { e.target.src = placeholder; }} />
        </div>
        <div className="ep-about-split__body">
          <p className="ep-section__label">{about.label}</p>
          <h2 className="ep-section__title">{about.title}</h2>
          <div className="ep-about-divider" />
          <p className="ep-about-split__desc">{about.desc}</p>
        </div>
      </section>

      <section className="ep-experience">
        <p className="ep-section__label">{experience.label}</p>
        <h2 className="ep-section__title" style={{ color: "#fff" }}>{experience.title}</h2>
        <div className="ep-experience__grid">
          {experience.cards.map((c) => (
            <div className="ep-experience__card" key={c.label}>
              <span className="ep-experience__icon">{c.icon}</span>
              <p className="ep-experience__stat">{c.stat}</p>
              <p className="ep-experience__label">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ep-section" style={{ paddingBottom: "1rem" }}>
        <p className="ep-section__label">{services.label}</p>
        <h2 className="ep-section__title">{services.title}</h2>
      </section>
      <section className="ep-services">
        {services.items.map((s) => (
          <div className="ep-service-card" key={s.title}>
            <img src={s.img} alt={s.title} className="ep-service-card__img" onError={(e) => { e.target.src = placeholder; }} />
            <div className="ep-service-card__overlay" />
            <div className="ep-service-card__content">
              <p className="ep-service-card__label">{s.label}</p>
              <h3 className="ep-service-card__title">{s.title}</h3>
              <ul className="ep-service-card__list">
                {s.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <button className="ep-service-card__btn" onClick={() => navigate("/book-appointment")}>{s.cta}</button>
            </div>
          </div>
        ))}
      </section>

      <section className="ep-why">
        <p className="ep-section__label">{why.label}</p>
        <h2 className="ep-section__title">{why.title}</h2>
        <div className="ep-why__grid">
          {why.cards.map((w) => (
            <div className="ep-why__card" key={w.title}>
              <span className="ep-why__icon">{w.icon}</span>
              <p className="ep-why__title">{w.title}</p>
              <p className="ep-why__desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ep-section" style={{ paddingBottom: "1rem" }}>
        <p className="ep-section__label">{gallery.label}</p>
        <h2 className="ep-section__title">{gallery.title}</h2>
      </section>
      <section className="ep-gallery">
        {gallery.items.map((g, i) => (
          <div className={`ep-gallery__item${g.wide ? " ep-gallery__item--wide" : ""}${g.tall ? " ep-gallery__item--tall" : ""}`} key={i}>
            <img src={g.img} alt={g.caption} className="ep-gallery__img" onError={(e) => { e.target.src = placeholder; }} />
            <div className="ep-gallery__overlay">
              <p className="ep-gallery__caption">{g.caption}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="ep-process">
        <p className="ep-section__label">{process.label}</p>
        <h2 className="ep-section__title">{process.title}</h2>
        <div className="ep-process__timeline">
          {process.steps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className="ep-process__step">
                <div className="ep-process__circle">{step.no}</div>
                <p className="ep-process__label">{step.label}</p>
              </div>
              {idx < process.steps.length - 1 && <span className="ep-process__arrow">↓</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="ep-testimonials">
        <p className="ep-section__label">{testimonials.label}</p>
        <h2 className="ep-section__title">{testimonials.title}</h2>
        <div className="ep-testimonials__grid">
          {testimonials.items.map((t) => (
            <div className="ep-testimonial" key={t.name}>
              <p className="ep-testimonial__quote">"{t.quote}"</p>
              <div className="ep-testimonial__author">
                <img src={t.avatar || avatarImg} alt={t.name} className="ep-testimonial__avatar" onError={(e) => { e.target.src = avatarImg; }} />
                <div>
                  <p className="ep-testimonial__name">{t.name}</p>
                  <p className="ep-testimonial__role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ep-cta-banner">
        <img src={cta.image} alt="Artisan" className="ep-cta-banner__bg" onError={(e) => { e.target.src = placeholder; }} />
        <div className="ep-cta-banner__overlay" />
        <div className="ep-cta-banner__content">
          <h2 className="ep-cta-banner__title">{cta.title}</h2>
          <p className="ep-cta-banner__sub">{cta.sub}</p>
          <button className="ep-hero-landing__btn" onClick={() => navigate("/book-appointment")}>{cta.button}</button>
        </div>
      </section>
    </>
  );
};

export default EmbroideryPage;
