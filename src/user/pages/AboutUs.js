import React from "react";
import "../styles/AboutUs2.css";
import { Link } from "react-router-dom";
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

const brandLogos = [
  { src: logo1, alt: "Brand 1" },
  { src: logo2, alt: "Brand 2" },
  { src: logo3, alt: "Brand 3" },
  { src: logo4, alt: "Brand 4" },
  { src: logo5, alt: "Brand 5" },
  { src: logo6, alt: "Brand 6" },
];

const team = [
  { img: avatar1, name: "Rajkumar", role: "Head Designer" },
  { img: avatar2, name: "Mounika", role: "Operations Lead" },
  { img: avatar3, name: "Sabarish", role: "Master Tailor" },
  { img: avatar4, name: "Suganthi", role: "Client Relations" },
];

const values = [
  { icon: "bi-scissors", title: "Craftsmanship", desc: "Every stitch is placed with intention. We never compromise on construction quality." },
  { icon: "bi-gem", title: "Excellence", desc: "Award-winning garments recognised across top fashion publications and editorials." },
  { icon: "bi-person-heart", title: "Personal Touch", desc: "Each piece is tailored to the individual — your fit, your story, your statement." },
  { icon: "bi-award", title: "Integrity", desc: "Transparent pricing, honest timelines, and a brand you can genuinely trust." },
];

export default function About() {
  return (
    <div className="au-page">

      {/* HERO */}
      <section className="au-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="au-hero-overlay">
          <p className="au-hero-tag">Est. in Pursuit of Perfection</p>
          <h1 className="au-hero-title">Where Bespoke<br />Meets Soul.</h1>
          <p className="au-hero-sub">Harry Clinton is not a label. It is a declaration of men's bold craftsmanship, timeless design, and personal touch.</p>
          <Link to="/about-designer" className="au-hero-cta">Discover the Story</Link>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="au-stats">
        <div className="au-stat"><span className="au-stat-num">12+</span><span className="au-stat-label">Years of Craft</span></div>
        <div className="au-stat-div"></div>
        <div className="au-stat"><span className="au-stat-num">2400+</span><span className="au-stat-label">Bespoke Pieces</span></div>
        <div className="au-stat-div"></div>
        <div className="au-stat"><span className="au-stat-num">98%</span><span className="au-stat-label">Client Satisfaction</span></div>
        <div className="au-stat-div"></div>
        <div className="au-stat"><span className="au-stat-num">6</span><span className="au-stat-label">Design Awards</span></div>
      </section>

      {/* DESIGNER SPOTLIGHT */}
      <section className="au-designer">
        <div className="au-designer-img">
          <img src={about1} alt="Harry Clinton" />
        </div>
        <div className="au-designer-text">
          <p className="au-eyebrow">The Man Behind the Brand</p>
          <h2 className="au-section-title">Harry Clinton</h2>
          <p className="au-body">
            A timeless menswear designer focused on refined craftsmanship. My work blends modern
            silhouettes with rich Italian tailoring traditions, delivering elegance with a bold
            personal touch. Every collection begins with a conversation and ends with a garment
            that defines the person who wears it.
          </p>
          <blockquote className="au-quote">
            "Design isn't just what I do &mdash; it's who I am."
          </blockquote>
          <Link to="/about-designer" className="au-link">Full Story &rarr;</Link>
        </div>
      </section>

      {/* SPLIT: ATELIER + CRAFT */}
      <section className="au-split">
        <div className="au-split-panel au-split-img" style={{ backgroundImage: `url(${atelierImg})` }}>
          <div className="au-split-label">The Atelier</div>
        </div>
        <div className="au-split-panel au-split-content">
          <p className="au-eyebrow">Where It All Happens</p>
          <h2 className="au-section-title">Our Studio</h2>
          <p className="au-body">
            Step inside the atelier — a space where fabric meets form. Our studio in Chennai is
            the beating heart of Harry Clinton, where every measurement, every cut, and every
            drape is handled with obsessive precision by our master tailors.
          </p>
          <p className="au-body">
            From hand-stitched lapels to custom lining choices, the atelier experience is
            personal, unhurried, and utterly unique.
          </p>
        </div>
      </section>

      <section className="au-split au-split-reverse">
        <div className="au-split-panel au-split-content">
          <p className="au-eyebrow">Our Process</p>
          <h2 className="au-section-title">Craft &amp; Detail</h2>
          <p className="au-body">
            We source only the finest fabrics &mdash; Italian wools, Irish linens, and artisan
            silks &mdash; before a single cut is made. Each garment goes through a minimum of
            three fittings to ensure a silhouette that moves with you, not against you.
          </p>
          <p className="au-body">
            The result is a piece that lasts decades, not seasons.
          </p>
        </div>
        <div className="au-split-panel au-split-img" style={{ backgroundImage: `url(${craftImg})` }}>
          <div className="au-split-label">The Craft</div>
        </div>
      </section>

      {/* VALUES */}
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

      {/* BRAND LOGO STRIP */}
      <section className="au-brands">
        <p className="au-brands-label">As seen in &amp; worn by</p>
        <div className="au-brands-track">
          {brandLogos.concat(brandLogos).map((l, i) => (
            <img key={i} src={l.src} alt={l.alt} loading="lazy" draggable="false" />
          ))}
        </div>
      </section>

      {/* FULL-WIDTH BANNER */}
      <section className="au-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="au-banner-overlay">
          <h2 className="au-banner-title">Heritage. Craft. Identity.</h2>
          <p className="au-banner-sub">Committed to timeless tailoring since the very first stitch.</p>
          <Link to="/about-designer" className="au-hero-cta">Meet the Designer</Link>
        </div>
      </section>

      {/* TEAM */}
      <section className="au-team">
        <p className="au-eyebrow au-center">The People</p>
        <h2 className="au-section-title au-center">Our Team</h2>
        <div className="au-team-grid">
          {team.map((m, i) => (
            <div className="au-team-card" key={i}>
              <div className="au-team-img-wrap">
                <img src={m.img} alt={m.name} />
              </div>
              <div className="au-team-name">{m.name}</div>
              <div className="au-team-role">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY BANNER */}
      <section className="au-story" style={{ backgroundImage: `url(${storyImg})` }}>
        <div className="au-story-overlay">
          <h2 className="au-story-title">Our Story</h2>
          <p className="au-story-sub">Dedicated to craftsmanship and timeless elegance since day one.</p>
          <button className="au-story-btn">Read Our Story</button>
        </div>
      </section>

    </div>
  );
}




