import React from "react";
import "../styles/AboutUs2.css";
import { Link } from "react-router-dom";
import { safeParse, getSetting, getSection, useContentData } from "../../utils/contentHelpers";
import heroImg from "../../shared/assets/images/AboutUs/about-hero.jpeg";
import atelierImg from "../../shared/assets/images/AboutUs/atelier.jpeg";
import craftImg from "../../shared/assets/images/AboutUs/craft.jpeg";
import storyImg from "../../shared/assets/images/AboutUs/story.jpeg";
import bannerImg from "../../shared/assets/images/AboutUs/about-banner.jpeg";
import about1 from "../../shared/assets/images/AboutUs/about1.jpeg";
import avatar1 from "../../shared/assets/images/AboutUs/avatar1.jpeg";
import avatar2 from "../../shared/assets/images/AboutUs/avatar2.jpeg";
import avatar3 from "../../shared/assets/images/AboutUs/avatar3.jpg";
import avatar4 from "../../shared/assets/images/AboutUs/avatar4.jpg";
import logo1 from "../../shared/assets/images/AboutUs/logo1.png";
import logo2 from "../../shared/assets/images/AboutUs/logo2.png";
import logo3 from "../../shared/assets/images/AboutUs/logo3.png";
import logo4 from "../../shared/assets/images/AboutUs/logo4.png";
import logo5 from "../../shared/assets/images/AboutUs/logo5.png";
import logo6 from "../../shared/assets/images/AboutUs/logo6.png";

const placeholder = "https://via.placeholder.com/800x600?text=About+HC";

const defaultBrandLogos = [
  { src: logo1, alt: "Brand 1" },
  { src: logo2, alt: "Brand 2" },
  { src: logo3, alt: "Brand 3" },
  { src: logo4, alt: "Brand 4" },
  { src: logo5, alt: "Brand 5" },
  { src: logo6, alt: "Brand 6" },
];

const defaultTeam = [
  { img: avatar1, name: "Rajkumar", role: "Head Designer" },
  { img: avatar2, name: "Mounika", role: "Operations Lead" },
  { img: avatar3, name: "Sabarish", role: "Master Tailor" },
  { img: avatar4, name: "Suganthi", role: "Client Relations" },
];

const defaultValues = [
  { icon: "bi-scissors", title: "Craftsmanship", desc: "Every stitch is placed with intention. We never compromise on construction quality." },
  { icon: "bi-gem", title: "Excellence", desc: "Award-winning garments recognised across top fashion publications and editorials." },
  { icon: "bi-person-heart", title: "Personal Touch", desc: "Each piece is tailored to the individual — your fit, your story, your statement." },
  { icon: "bi-award", title: "Integrity", desc: "Transparent pricing, honest timelines, and a brand you can genuinely trust." },
];

const defaultStats = [
  { num: "12+", label: "Years of Craft" },
  { num: "2400+", label: "Bespoke Pieces" },
  { num: "98%", label: "Client Satisfaction" },
  { num: "6", label: "Design Awards" },
];

export default function About() {
  const { loading, settings, sections } = useContentData(["about", "about-us"]);

  const s = (key) => getSetting(settings, key);
  const sec = (title) => getSection(sections, title);

  const hero = {
    image: s("about_hero_image") || heroImg,
    tag: s("about_hero_tag") || sec("Hero Tag") || "Est. in Pursuit of Perfection",
    title: s("about_hero_title") || sec("Hero Title") || "Where Bespoke\nMeets Soul.",
    subtitle: s("about_hero_subtitle") || sec("Hero Subtitle") || "Harry Clinton is not a label. It is a declaration of men's bold craftsmanship, timeless design, and personal touch.",
  };

  const stats = safeParse(s("about_stats")) || defaultStats;

  const designer = {
    image: s("about_designer_image") || about1,
    eyebrow: s("about_designer_eyebrow") || sec("Designer Eyebrow") || "The Man Behind the Brand",
    title: s("about_designer_title") || sec("Designer Title") || "Harry Clinton",
    bio: s("about_designer_bio") || sec("Designer Bio") || "A timeless menswear designer focused on refined craftsmanship. My work blends modern silhouettes with rich Italian tailoring traditions, delivering elegance with a bold personal touch. Every collection begins with a conversation and ends with a garment that defines the person who wears it.",
    quote: s("about_designer_quote") || sec("Designer Quote") || "Design isn't just what I do — it's who I am.",
  };

  const studio = {
    image: s("about_studio_image") || atelierImg,
    label: s("about_studio_label") || sec("Studio Label") || "The Atelier",
    eyebrow: s("about_studio_eyebrow") || sec("Studio Eyebrow") || "Where It All Happens",
    title: s("about_studio_title") || sec("Studio Title") || "Our Studio",
    content: s("about_studio_content") || sec("Studio Content") || "Step inside the atelier — a space where fabric meets form. Our studio in Chennai is the beating heart of Harry Clinton, where every measurement, every cut, and every drape is handled with obsessive precision by our master tailors. From hand-stitched lapels to custom lining choices, the atelier experience is personal, unhurried, and utterly unique.",
  };

  const craft = {
    image: s("about_craft_image") || craftImg,
    label: s("about_craft_label") || sec("Craft Label") || "The Craft",
    eyebrow: s("about_craft_eyebrow") || sec("Craft Eyebrow") || "Our Process",
    title: s("about_craft_title") || sec("Craft Title") || "Craft & Detail",
    content: s("about_craft_content") || sec("Craft Content") || "We source only the finest fabrics — Italian wools, Irish linens, and artisan silks — before a single cut is made. Each garment goes through a minimum of three fittings to ensure a silhouette that moves with you, not against you. The result is a piece that lasts decades, not seasons.",
  };

  const values = safeParse(s("about_values")) || defaultValues;
  const brandLogos = safeParse(s("about_brand_logos")) || defaultBrandLogos;
  const team = safeParse(s("about_team")) || defaultTeam;

  const banner = {
    image: s("about_banner_image") || bannerImg,
    title: s("about_banner_title") || sec("Banner Title") || "Heritage. Craft. Identity.",
    subtitle: s("about_banner_subtitle") || sec("Banner Subtitle") || "Committed to timeless tailoring since the very first stitch.",
  };

  const story = {
    image: s("about_story_image") || storyImg,
    title: s("about_story_title") || sec("Story Title") || "Our Story",
    subtitle: s("about_story_subtitle") || sec("Story Subtitle") || "Dedicated to craftsmanship and timeless elegance since day one.",
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status"><span className="visually-hidden">Loading about...</span></div>
      </div>
    );
  }

  return (
    <div className="au-page">
      <section className="au-hero" style={{ backgroundImage: `url(${hero.image})` }}>
        <div className="au-hero-overlay">
          <p className="au-hero-tag">{hero.tag}</p>
          <h1 className="au-hero-title">{hero.title.split("\n").map((line, i) => <span key={i}>{line}{i < hero.title.split("\n").length - 1 && <br />}</span>)}</h1>
          <p className="au-hero-sub">{hero.subtitle}</p>
          <Link to="/about-designer" className="au-hero-cta">Discover the Story</Link>
        </div>
      </section>

      <section className="au-stats">
        {stats.map((stat, i) => (
          <React.Fragment key={i}>
            <div className="au-stat"><span className="au-stat-num">{stat.num}</span><span className="au-stat-label">{stat.label}</span></div>
            {i < stats.length - 1 && <div className="au-stat-div"></div>}
          </React.Fragment>
        ))}
      </section>

      <section className="au-designer">
        <div className="au-designer-img">
          <img src={designer.image} alt={designer.title} onError={(e) => { e.target.src = placeholder; }} />
        </div>
        <div className="au-designer-text">
          <p className="au-eyebrow">{designer.eyebrow}</p>
          <h2 className="au-section-title">{designer.title}</h2>
          <p className="au-body">{designer.bio}</p>
          <blockquote className="au-quote">"{designer.quote}"</blockquote>
          <Link to="/about-designer" className="au-link">Full Story &rarr;</Link>
        </div>
      </section>

      <section className="au-split">
        <div className="au-split-panel au-split-img" style={{ backgroundImage: `url(${studio.image})` }}>
          <div className="au-split-label">{studio.label}</div>
        </div>
        <div className="au-split-panel au-split-content">
          <p className="au-eyebrow">{studio.eyebrow}</p>
          <h2 className="au-section-title">{studio.title}</h2>
          <p className="au-body">{studio.content}</p>
        </div>
      </section>

      <section className="au-split au-split-reverse">
        <div className="au-split-panel au-split-content">
          <p className="au-eyebrow">{craft.eyebrow}</p>
          <h2 className="au-section-title">{craft.title}</h2>
          <p className="au-body">{craft.content}</p>
        </div>
        <div className="au-split-panel au-split-img" style={{ backgroundImage: `url(${craft.image})` }}>
          <div className="au-split-label">{craft.label}</div>
        </div>
      </section>

      <section className="au-values">
        <p className="au-eyebrow au-center">What We Stand For</p>
        <h2 className="au-section-title au-center">Our Values</h2>
        <div className="au-values-grid">
          {values.map((v, i) => (
            <div className="au-value-card" key={i}>
              <i className={`bi ${v.icon} au-value-icon`}></i>
              <h4 className="au-value-title">{v.title}</h4>
              <p className="au-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="au-brands">
        <p className="au-brands-label">As seen in &amp; worn by</p>
        <div className="au-brands-track">
          {brandLogos.concat(brandLogos).map((l, i) => (
            <img key={i} src={l.src} alt={l.alt} loading="lazy" draggable="false" onError={(e) => { e.target.src = placeholder; }} />
          ))}
        </div>
      </section>

      <section className="au-banner" style={{ backgroundImage: `url(${banner.image})` }}>
        <div className="au-banner-overlay">
          <h2 className="au-banner-title">{banner.title}</h2>
          <p className="au-banner-sub">{banner.subtitle}</p>
          <Link to="/about-designer" className="au-hero-cta">Meet the Designer</Link>
        </div>
      </section>

      <section className="au-team">
        <p className="au-eyebrow au-center">The People</p>
        <h2 className="au-section-title au-center">Our Team</h2>
        <div className="au-team-grid">
          {team.map((m, i) => (
            <div className="au-team-card" key={i}>
              <div className="au-team-img-wrap">
                <img src={m.img} alt={m.name} onError={(e) => { e.target.src = placeholder; }} />
              </div>
              <div className="au-team-name">{m.name}</div>
              <div className="au-team-role">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="au-story" style={{ backgroundImage: `url(${story.image})` }}>
        <div className="au-story-overlay">
          <h2 className="au-story-title">{story.title}</h2>
          <p className="au-story-sub">{story.subtitle}</p>
          <button className="au-story-btn">Read Our Story</button>
        </div>
      </section>
    </div>
  );
}




