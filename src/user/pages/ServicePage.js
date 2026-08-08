import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmbroideryPage.css";
import { safeParse, getSetting, getSection, useContentData } from "../../utils/contentHelpers";

const DEFAULT_PLACEHOLDER = "https://via.placeholder.com/800x600?text=Service";

const ServicePage = ({ config }) => {
  const navigate = useNavigate();
  const { loading, settings, sections } = useContentData([config.serviceKey, "services"]);

  const s = (key) => getSetting(settings, key);
  const sec = (title) => getSection(sections, title);

  const placeholder = config.placeholder || DEFAULT_PLACEHOLDER;
  const defs = config.defaults;

  const hero = {
    image: s(`${config.serviceKey}_hero_image`) || defs.hero.image,
    eyebrow: s(`${config.serviceKey}_hero_eyebrow`) || sec("Hero Eyebrow") || defs.hero.eyebrow,
    title: s(`${config.serviceKey}_hero_title`) || sec("Hero Title") || defs.hero.title,
    subtitle: s(`${config.serviceKey}_hero_subtitle`) || sec("Hero Subtitle") || defs.hero.subtitle,
    body: s(`${config.serviceKey}_hero_body`) || sec("Hero Body") || defs.hero.body,
    cta: s(`${config.serviceKey}_hero_cta`) || sec("Hero CTA") || defs.hero.cta,
  };

  const about = {
    image: s(`${config.serviceKey}_about_image`) || defs.about.image,
    label: s(`${config.serviceKey}_about_label`) || sec("About Label") || defs.about.label,
    title: s(`${config.serviceKey}_about_title`) || sec("About Title") || defs.about.title,
    desc: s(`${config.serviceKey}_about_desc`) || sec("About Description") || defs.about.desc,
  };

  const experience = {
    label: s(`${config.serviceKey}_experience_label`) || sec("Experience Label") || defs.experience.label,
    title: s(`${config.serviceKey}_experience_title`) || sec("Experience Title") || defs.experience.title,
    cards: safeParse(s(`${config.serviceKey}_experience_cards`)) || defs.experience.cards,
  };

  const services = {
    label: s(`${config.serviceKey}_services_label`) || sec("Services Label") || defs.services.label,
    title: s(`${config.serviceKey}_services_title`) || sec("Services Title") || defs.services.title,
    items: safeParse(s(`${config.serviceKey}_services`)) || defs.services.items,
  };

  const why = {
    label: s(`${config.serviceKey}_why_label`) || sec("Why Label") || defs.why.label,
    title: s(`${config.serviceKey}_why_title`) || sec("Why Title") || defs.why.title,
    cards: safeParse(s(`${config.serviceKey}_why_cards`)) || defs.why.cards,
  };

  const gallery = {
    label: s(`${config.serviceKey}_gallery_label`) || sec("Gallery Label") || defs.gallery.label,
    title: s(`${config.serviceKey}_gallery_title`) || sec("Gallery Title") || defs.gallery.title,
    items: safeParse(s(`${config.serviceKey}_gallery`)) || defs.gallery.items,
  };

  const process = {
    label: s(`${config.serviceKey}_process_label`) || sec("Process Label") || defs.process.label,
    title: s(`${config.serviceKey}_process_title`) || sec("Process Title") || defs.process.title,
    steps: safeParse(s(`${config.serviceKey}_process_steps`)) || defs.process.steps,
  };

  const testimonials = {
    label: s(`${config.serviceKey}_testimonials_label`) || sec("Testimonials Label") || defs.testimonials.label,
    title: s(`${config.serviceKey}_testimonials_title`) || sec("Testimonials Title") || defs.testimonials.title,
    items: safeParse(s(`${config.serviceKey}_testimonials`)) || defs.testimonials.items,
  };

  const cta = {
    image: s(`${config.serviceKey}_cta_image`) || defs.cta.image,
    title: s(`${config.serviceKey}_cta_title`) || sec("CTA Title") || defs.cta.title,
    sub: s(`${config.serviceKey}_cta_sub`) || sec("CTA Subtitle") || defs.cta.sub,
    button: s(`${config.serviceKey}_cta_button`) || sec("CTA Button") || defs.cta.button,
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status"><span className="visually-hidden">Loading {config.title}...</span></div>
      </div>
    );
  }

  return (
    <>
      <section className="ep-hero-landing">
        <img src={hero.image} alt={config.title} className="ep-hero-landing__bg" onError={(e) => { e.target.src = placeholder; }} />
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
          <img src={about.image} alt={about.title} className="ep-about-split__img" onError={(e) => { e.target.src = placeholder; }} />
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
                <img src={t.avatar || defs.avatar} alt={t.name} className="ep-testimonial__avatar" onError={(e) => { e.target.src = defs.avatar; }} />
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
        <img src={cta.image} alt={config.title} className="ep-cta-banner__bg" onError={(e) => { e.target.src = placeholder; }} />
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

export default ServicePage;
