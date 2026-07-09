import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TheVisionPage.css";
import heroImg  from "../../shared/assets/images/vision1.jpeg";
import aboutImg from "../../shared/assets/images/vision_title.jpeg";
import featImg  from "../../shared/assets/images/SuitsPage/LabelNew2.jpeg";

const HOW_STEPS = [
  { num: "01.", icon: "🤝", title: "We Collaborate", desc: "We open creative sessions with visually impaired artists through art sessions, conversations, sketches and tactile exploration." },
  { num: "02.", icon: "✏️", title: "They Create",    desc: "Artists express their imagination through drawings, textures, patterns and emotional storytelling." },
  { num: "03.", icon: "👕", title: "We Transform",   desc: "Their original artwork is carefully adapted into functional print designs while preserving the soul of the artist's idea." },
  { num: "04.", icon: "🛍️", title: "You Wear the Story", desc: "Each piece becomes a wearable reminder that creativity has no limits." },
];

const IMPACT_PILLARS = [
  { icon: "🤝", title: "Fair Collaboration",    desc: "Artists are compensated fairly and credited for every piece produced." },
  { icon: "🏅", title: "Artistic Recognition",  desc: "Their names and stories are shared with every customer who buys." },
  { icon: "🎨", title: "Creative Engagement",   desc: "Ongoing workshops keep artists connected, growing and creating." },
];

const FOOTER_PILLARS = [
  { icon: "👁️", label: "The Vision is an invitation\nto see differently." },
  { icon: "❤️", label: "To wear something\nmeaningful." },
  { icon: "🎨", label: "To celebrate creativity\nwith them." },
  { icon: "✨", label: "To turn imagination\ninto impact." },
];

const COLLECTION_LIST = [
  "Artist name",
  "Artwork title",
  "Story behind the print",
  "Impact created through purchase",
];

const TheVisionPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ── Hero ── */}
      <section className="tv-hero">
        <div className="tv-hero__img-col">
          <img src={heroImg} alt="The Vision" className="tv-hero__img" />
        </div>

        <div className="tv-hero__text-col">
          <p className="tv-hero__presents">HC Presents</p>
          <h1 className="tv-hero__title">THE VISION</h1>
          <p className="tv-hero__subtitle">Beyond Sight.</p>
          <div className="tv-hero__divider" />
          <p className="tv-hero__tagline">Not every vision begins with sight.</p>
          <p className="tv-hero__desc">
            A collection created with visually impaired artists who imagine, interpret and express the world in their own unique way.
          </p>
          <p className="tv-hero__sub-desc">Their art. Their story. Your style.</p>

          <div className="tv-hero__icons">
            <div className="tv-hero__icon-item">
              <span className="tv-hero__icon-symbol">👁️</span>
              <span className="tv-hero__icon-label">Their Imagination Our Prints</span>
            </div>
            <div className="tv-hero__icon-item">
              <span className="tv-hero__icon-symbol">👕</span>
              <span className="tv-hero__icon-label">Their Perspective Your Style</span>
            </div>
            <div className="tv-hero__icon-item">
              <span className="tv-hero__icon-symbol">❤️</span>
              <span className="tv-hero__icon-label">Every Purchase Creates Impact</span>
            </div>
          </div>

          <div className="tv-hero__btns">
            <button className="tv-btn" onClick={() => document.getElementById("tv-collection")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Collection
            </button>
            <button className="tv-btn tv-btn--outline" onClick={() => document.getElementById("tv-artists")?.scrollIntoView({ behavior: "smooth" })}>
              Meet the Artists →
            </button>
          </div>

          <p style={{ marginTop: "3rem", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
            Wear more than fashion. Wear a different way of seeing.
          </p>
        </div>
      </section>

      {/* ── About the Vision ── */}
      <section className="tv-about">
        <div className="tv-about__img-wrap">
          <img src={aboutImg} alt="About The Vision" className="tv-about__img" />
        </div>
        <div className="tv-about__body">
          <p className="tv-about__eyebrow">About the Vision</p>
          <h2 className="tv-about__title">
            Vision is not limited<br />to what the eyes can see.
          </h2>
          <p className="tv-about__para">
            For this collection, HC collaborated with visually impaired creators to understand how they imagine the world through touch, sound, memory, emotion, and personal experience.
          </p>
          <p className="tv-about__para">
            Their drawings, sketches, textures, and creative interpretations were transformed into original print designs — turning unseen perspectives into fashion that can be worn, felt, and shared.
          </p>
          <p className="tv-about__highlight">
            This is more than a collection.<br />It is a celebration of imagination beyond sight.
          </p>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="tv-how">
        <p className="tv-how__header">How it Works</p>
        <div className="tv-how__steps">
          {HOW_STEPS.map((s) => (
            <div className="tv-how__step" key={s.num}>
              <span className="tv-how__step-num">{s.num}</span>
              <span className="tv-how__step-icon">{s.icon}</span>
              <p className="tv-how__step-title">{s.title}</p>
              <p className="tv-how__step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Collection ── */}
      <section className="tv-feature" id="tv-collection">
        <div className="tv-feature__img-wrap">
          <img src={featImg} alt="Wear Their Perspective" className="tv-feature__img" />
        </div>
        <div className="tv-feature__body">
          <p className="tv-feature__eyebrow">Featured Collection</p>
          <h2 className="tv-feature__title">Wear Their Perspective.</h2>
          <p className="tv-feature__desc">
            A collection of shirts, jackets, co-ords, and statement pieces inspired by original artwork from visually impaired creators.
          </p>
          <ul className="tv-feature__list">
            {COLLECTION_LIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button className="tv-btn tv-btn--dark" onClick={() => navigate("/new-arrivals")}>
            Shop the Collection
          </button>
        </div>
      </section>

      {/* ── Impact ── */}
      <section className="tv-impact">
        <p className="tv-impact__eyebrow">Impact</p>
        <h2 className="tv-impact__title">Every Purchase Creates Opportunity.</h2>
        <p className="tv-impact__desc">
          Every purchase supports creative opportunities for visually impaired artists through fair collaboration, recognition, and continued artistic engagement.
        </p>
        <div className="tv-impact__pillars">
          {IMPACT_PILLARS.map((p) => (
            <div key={p.title}>
              <span className="tv-impact__pillar-icon">{p.icon}</span>
              <p className="tv-impact__pillar-title">{p.title}</p>
              <p className="tv-impact__pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="tv-impact__note">
          This is not charity. It is partnership.<br />
          It is fashion built with respect, creativity, and shared purpose.<br /><br />
          Wear the art. Share the impact.
        </p>
      </section>

      {/* ── Artist Quote ── */}
      <section className="tv-quote" id="tv-artists">
        <div>
          <p className="tv-quote__eyebrow">Artist Stories</p>
          <span className="tv-quote__mark">"</span>
          <p className="tv-quote__text">
            I don't draw what I see.<br />I draw what I feel.
          </p>
          <p className="tv-quote__author">— Artist behind the collection</p>
        </div>
        <div className="tv-quote__body">
          <p className="tv-quote__sub">
            Meet the creators behind the collection. Discover the memories, emotions, sounds, and textures that shaped every print.
          </p>
          <button className="tv-btn tv-btn--dark">
            Meet the Artists →
          </button>
        </div>
      </section>

      {/* ── Footer Strip ── */}
      <section className="tv-footer-strip">
        <h2 className="tv-footer-strip__title">
          Beyond Sight. <span>Beyond Fashion.</span>
        </h2>
        <div className="tv-footer-strip__pillars">
          {FOOTER_PILLARS.map((p) => (
            <div key={p.label}>
              <span className="tv-footer-strip__pillar-icon">{p.icon}</span>
              <p className="tv-footer-strip__pillar-label">{p.label}</p>
            </div>
          ))}
        </div>
        <p className="tv-footer-strip__tagline">
          Their imagination. Our prints. Your style.
        </p>
        <button className="tv-btn" onClick={() => navigate("/new-arrivals")}>
          Explore Collection
        </button>
      </section>
    </>
  );
};

export default TheVisionPage;
