import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TheVisionPage.css";
import { safeParse, getSetting, getSection, useContentData } from "../../utils/contentHelpers";
import heroImg  from "../../shared/assets/images/vision1.jpeg";
import aboutImg from "../../shared/assets/images/vision_title.jpeg";
import featImg  from "../../shared/assets/images/SuitsPage/LabelNew2.jpeg";

const placeholder = "https://via.placeholder.com/800x600?text=The+Vision";

const defaultHowSteps = [
  { num: "01.", icon: "🤝", title: "We Collaborate", desc: "We open creative sessions with visually impaired artists through art sessions, conversations, sketches and tactile exploration." },
  { num: "02.", icon: "✏️", title: "They Create", desc: "Artists express their imagination through drawings, textures, patterns and emotional storytelling." },
  { num: "03.", icon: "👕", title: "We Transform", desc: "Their original artwork is carefully adapted into functional print designs while preserving the soul of the artist's idea." },
  { num: "04.", icon: "🛍️", title: "You Wear the Story", desc: "Each piece becomes a wearable reminder that creativity has no limits." },
];

const defaultImpactPillars = [
  { icon: "🤝", title: "Fair Collaboration", desc: "Artists are compensated fairly and credited for every piece produced." },
  { icon: "🏅", title: "Artistic Recognition", desc: "Their names and stories are shared with every customer who buys." },
  { icon: "🎨", title: "Creative Engagement", desc: "Ongoing workshops keep artists connected, growing and creating." },
];

const defaultFooterPillars = [
  { icon: "👁️", label: "The Vision is an invitation\nto see differently." },
  { icon: "❤️", label: "To wear something\nmeaningful." },
  { icon: "🎨", label: "To celebrate creativity\nwith them." },
  { icon: "✨", label: "To turn imagination\ninto impact." },
];

const defaultCollectionList = [
  "Artist name",
  "Artwork title",
  "Story behind the print",
  "Impact created through purchase",
];

const TheVisionPage = () => {
  const navigate = useNavigate();
  const { loading, settings, sections } = useContentData(["vision", "the-vision"]);

  const s = (key) => getSetting(settings, key);
  const sec = (title) => getSection(sections, title);

  const hero = {
    image: s("vision_hero_image") || heroImg,
    presents: s("vision_hero_presents") || sec("Hero Presents") || "HC Presents",
    title: s("vision_hero_title") || sec("Hero Title") || "THE VISION",
    subtitle: s("vision_hero_subtitle") || sec("Hero Subtitle") || "Beyond Sight.",
    tagline: s("vision_hero_tagline") || sec("Hero Tagline") || "Not every vision begins with sight.",
    desc: s("vision_hero_desc") || sec("Hero Description") || "A collection created with visually impaired artists who imagine, interpret and express the world in their own unique way.",
    subDesc: s("vision_hero_sub_desc") || sec("Hero Sub Description") || "Their art. Their story. Your style.",
    footer: s("vision_hero_footer") || sec("Hero Footer") || "Wear more than fashion. Wear a different way of seeing.",
  };

  const heroIcons = safeParse(s("vision_hero_icons")) || [
    { symbol: "👁️", label: "Their Imagination Our Prints" },
    { symbol: "👕", label: "Their Perspective Your Style" },
    { symbol: "❤️", label: "Every Purchase Creates Impact" },
  ];

  const about = {
    image: s("vision_about_image") || aboutImg,
    eyebrow: s("vision_about_eyebrow") || sec("About Eyebrow") || "About the Vision",
    title: s("vision_about_title") || sec("About Title") || "Vision is not limited\nto what the eyes can see.",
    para1: s("vision_about_para1") || sec("About Paragraph 1") || "For this collection, HC collaborated with visually impaired creators to understand how they imagine the world through touch, sound, memory, emotion, and personal experience.",
    para2: s("vision_about_para2") || sec("About Paragraph 2") || "Their drawings, sketches, textures, and creative interpretations were transformed into original print designs — turning unseen perspectives into fashion that can be worn, felt, and shared.",
    highlight: s("vision_about_highlight") || sec("About Highlight") || "This is more than a collection.\nIt is a celebration of imagination beyond sight.",
  };

  const howSteps = safeParse(s("vision_how_steps")) || defaultHowSteps;
  const impactPillars = safeParse(s("vision_impact_pillars")) || defaultImpactPillars;
  const footerPillars = safeParse(s("vision_footer_pillars")) || defaultFooterPillars;

  const feature = {
    image: s("vision_feature_image") || featImg,
    eyebrow: s("vision_feature_eyebrow") || sec("Feature Eyebrow") || "Featured Collection",
    title: s("vision_feature_title") || sec("Feature Title") || "Wear Their Perspective.",
    desc: s("vision_feature_desc") || sec("Feature Description") || "A collection of shirts, jackets, co-ords, and statement pieces inspired by original artwork from visually impaired creators.",
    list: safeParse(s("vision_feature_list")) || defaultCollectionList,
  };

  const impact = {
    eyebrow: s("vision_impact_eyebrow") || sec("Impact Eyebrow") || "Impact",
    title: s("vision_impact_title") || sec("Impact Title") || "Every Purchase Creates Opportunity.",
    desc: s("vision_impact_desc") || sec("Impact Description") || "Every purchase supports creative opportunities for visually impaired artists through fair collaboration, recognition, and continued artistic engagement.",
    note: s("vision_impact_note") || sec("Impact Note") || "This is not charity. It is partnership.\nIt is fashion built with respect, creativity, and shared purpose.\n\nWear the art. Share the impact.",
  };

  const quote = {
    eyebrow: s("vision_quote_eyebrow") || sec("Quote Eyebrow") || "Artist Stories",
    text: s("vision_quote_text") || sec("Quote Text") || "I don't draw what I see.\nI draw what I feel.",
    author: s("vision_quote_author") || sec("Quote Author") || "— Artist behind the collection",
    sub: s("vision_quote_sub") || sec("Quote Subtitle") || "Meet the creators behind the collection. Discover the memories, emotions, sounds, and textures that shaped every print.",
  };

  const footerStrip = {
    title: s("vision_footer_title") || sec("Footer Title") || "Beyond Sight. Beyond Fashion.",
    tagline: s("vision_footer_tagline") || sec("Footer Tagline") || "Their imagination. Our prints. Your style.",
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status"><span className="visually-hidden">Loading vision...</span></div>
      </div>
    );
  }

  return (
    <>
      <section className="tv-hero">
        <div className="tv-hero__img-col">
          <img src={hero.image} alt="The Vision" className="tv-hero__img" onError={(e) => { e.target.src = placeholder; }} />
        </div>
        <div className="tv-hero__text-col">
          <p className="tv-hero__presents">{hero.presents}</p>
          <h1 className="tv-hero__title">{hero.title}</h1>
          <p className="tv-hero__subtitle">{hero.subtitle}</p>
          <div className="tv-hero__divider" />
          <p className="tv-hero__tagline">{hero.tagline}</p>
          <p className="tv-hero__desc">{hero.desc}</p>
          <p className="tv-hero__sub-desc">{hero.subDesc}</p>
          <div className="tv-hero__icons">
            {heroIcons.map((icon, i) => (
              <div className="tv-hero__icon-item" key={i}>
                <span className="tv-hero__icon-symbol">{icon.symbol}</span>
                <span className="tv-hero__icon-label">{icon.label}</span>
              </div>
            ))}
          </div>
          <div className="tv-hero__btns">
            <button className="tv-btn" onClick={() => document.getElementById("tv-collection")?.scrollIntoView({ behavior: "smooth" })}>Explore Collection</button>
            <button className="tv-btn tv-btn--outline" onClick={() => document.getElementById("tv-artists")?.scrollIntoView({ behavior: "smooth" })}>Meet the Artists →</button>
          </div>
          <p style={{ marginTop: "3rem", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{hero.footer}</p>
        </div>
      </section>

      <section className="tv-about">
        <div className="tv-about__img-wrap">
          <img src={about.image} alt="About The Vision" className="tv-about__img" onError={(e) => { e.target.src = placeholder; }} />
        </div>
        <div className="tv-about__body">
          <p className="tv-about__eyebrow">{about.eyebrow}</p>
          <h2 className="tv-about__title">{about.title.split("\n").map((line, i) => <span key={i}>{line}{i < about.title.split("\n").length - 1 && <br />}</span>)}</h2>
          <p className="tv-about__para">{about.para1}</p>
          <p className="tv-about__para">{about.para2}</p>
          <p className="tv-about__highlight">{about.highlight.split("\n").map((line, i) => <span key={i}>{line}{i < about.highlight.split("\n").length - 1 && <br />}</span>)}</p>
        </div>
      </section>

      <section className="tv-how">
        <p className="tv-how__header">How it Works</p>
        <div className="tv-how__steps">
          {howSteps.map((s) => (
            <div className="tv-how__step" key={s.num}>
              <span className="tv-how__step-num">{s.num}</span>
              <span className="tv-how__step-icon">{s.icon}</span>
              <p className="tv-how__step-title">{s.title}</p>
              <p className="tv-how__step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tv-feature" id="tv-collection">
        <div className="tv-feature__img-wrap">
          <img src={feature.image} alt="Wear Their Perspective" className="tv-feature__img" onError={(e) => { e.target.src = placeholder; }} />
        </div>
        <div className="tv-feature__body">
          <p className="tv-feature__eyebrow">{feature.eyebrow}</p>
          <h2 className="tv-feature__title">{feature.title}</h2>
          <p className="tv-feature__desc">{feature.desc}</p>
          <ul className="tv-feature__list">
            {feature.list.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <button className="tv-btn tv-btn--dark" onClick={() => navigate("/new-arrivals")}>Shop the Collection</button>
        </div>
      </section>

      <section className="tv-impact">
        <p className="tv-impact__eyebrow">{impact.eyebrow}</p>
        <h2 className="tv-impact__title">{impact.title}</h2>
        <p className="tv-impact__desc">{impact.desc}</p>
        <div className="tv-impact__pillars">
          {impactPillars.map((p) => (
            <div key={p.title}>
              <span className="tv-impact__pillar-icon">{p.icon}</span>
              <p className="tv-impact__pillar-title">{p.title}</p>
              <p className="tv-impact__pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="tv-impact__note">{impact.note.split("\n").map((line, i) => <span key={i}>{line}{i < impact.note.split("\n").length - 1 && <><br /></>}</span>)}</p>
      </section>

      <section className="tv-quote" id="tv-artists">
        <div>
          <p className="tv-quote__eyebrow">{quote.eyebrow}</p>
          <span className="tv-quote__mark">"</span>
          <p className="tv-quote__text">{quote.text.split("\n").map((line, i) => <span key={i}>{line}{i < quote.text.split("\n").length - 1 && <br />}</span>)}</p>
          <p className="tv-quote__author">{quote.author}</p>
        </div>
        <div className="tv-quote__body">
          <p className="tv-quote__sub">{quote.sub}</p>
          <button className="tv-btn tv-btn--dark">Meet the Artists →</button>
        </div>
      </section>

      <section className="tv-footer-strip">
        <h2 className="tv-footer-strip__title">{footerStrip.title.split(". ").map((part, i) => <span key={i}>{part}{i < footerStrip.title.split(". ").length - 1 ? ". " : ""}</span>)}</h2>
        <div className="tv-footer-strip__pillars">
          {footerPillars.map((p) => (
            <div key={p.label}>
              <span className="tv-footer-strip__pillar-icon">{p.icon}</span>
              <p className="tv-footer-strip__pillar-label">{p.label.split("\n").map((line, i) => <span key={i}>{line}{i < p.label.split("\n").length - 1 && <br />}</span>)}</p>
            </div>
          ))}
        </div>
        <p className="tv-footer-strip__tagline">{footerStrip.tagline}</p>
        <button className="tv-btn" onClick={() => navigate("/new-arrivals")}>Explore Collection</button>
      </section>
    </>
  );
};

export default TheVisionPage;
