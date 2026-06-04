

import React from "react";
import "../styles/AboutUs.css";import { Link } from "react-router-dom";
import portrait from "../../shared/assets/images/AboutUs/Designer.jpeg";  // your designer portrait       
import hero from "../../shared/assets/images/AboutUs/sample.jpeg";  // your hero image
import story from "../../shared/assets/images/AboutUs/story.jpeg"; // add your story banner image

import logo1 from "../../shared/assets/images/AboutUs/logo1.png";
import logo2 from "../../shared/assets/images/AboutUs/logo2.png";
import logo3 from "../../shared/assets/images/AboutUs/logo3.png";
import logo4 from "../../shared/assets/images/AboutUs/logo4.png";
import logo5 from "../../shared/assets/images/AboutUs/logo5.png";
import logo6 from "../../shared/assets/images/AboutUs/logo6.png";

// Mission, Vision, Values images 
import avatar1 from "../../shared/assets/images/AboutUs/avatar1.jpeg";
import avatar2 from "../../shared/assets/images/AboutUs/avatar2.jpeg";
import avatar3 from "../../shared/assets/images/AboutUs/avatar3.jpg";
import avatar4 from "../../shared/assets/images/AboutUs/avatar4.jpg";
import badge1 from "../../shared/assets/images/AboutUs/badge1.png"; // small badge/logo used in Q4 (optional)

// ⬇️ ADD THIS ARRAY JUST BELOW THE LOGO IMPORTS
const brandLogos = [
  { src: logo1, alt: "Brand 1" },
  { src: logo2, alt: "Brand 2" },
  { src: logo3, alt: "Brand 3" },
  { src: logo4, alt: "Brand 4" },
  { src: logo5, alt: "Brand 5" },
  { src: logo6, alt: "Brand 6" },
];

export default function About() {
  return (
    <div className="about-page">

    

  {/* FULL WIDTH HERO BANNER */}
    <section
    className="hero-full"
    style={{ backgroundImage: `url(${hero})` }}
    >
    <div className="hero-overlay-text">
        <h2>Where bespoke meets soul.</h2>

        <p>
        Harry Clinton isn’t a label. It’s a declaration — that men’s bold
        craftsmanship, timeless design, and personal touch.
        </p>

        <p className="signature">Vanakkam —</p>
    </div>
    </section>

      {/* TITLE */}
      <h3 className="section-heading">About the designer</h3>

      {/* DESIGNER INFO */}
      <section className="designer-section">

        <div className="portrait-box">
          <img src={portrait} alt="designer" />
        </div>

        <div className="designer-content">
          <h4>HARRY CLINTON</h4>
          <p>
            I’m Harry Clinton — a timeless menswear designer focused on refined
            craftsmanship. My work blends modern silhouettes with rich Italian 
            tailoring traditions, delivering elegance with a bold personal touch. Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.
            {/* Read More link */}
            <Link to="/about-designer" className="read-more">
              Read More →
            </Link>
          </p>

          <blockquote>
            “Design isn’t just what I do — it’s who I am.”
          </blockquote>
        </div>

      </section>

      {/* ABOUT US BANNER */}
        <section
        className="aboutus-banner"
        style={{ backgroundImage: `url(${hero})` }}  // change to your “About Us” image
        >
        <div className="aboutus-overlay">

            <h2 className="aboutus-title">About Us</h2>

            <p className="aboutus-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.  
            Committed to outstanding quality and timeless craft.
            </p>

            <Link to="/about-us" className="aboutus-btn">
  KNOW MORE
</Link>

            {/* <Link to="/about-us-full" className="know-more-btn">Know More</Link> */}


        </div>
        </section>

        {/* BRAND LOGO STRIP */}
               {/* BRAND LOGO STRIP – AUTO LOOP */}
        <section
          className="brand-logos"
          aria-label="Brands we work with"
        >
          <div className="brand-logos-track">
            {brandLogos.concat(brandLogos).map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                draggable="false"
              />
            ))}
          </div>
        </section>

        {/* OUR STORY BANNER – "story" should be your story image */}
<section
  className="story-banner"
  style={{ backgroundImage: `url(${story})` }}
>
  <div className="story-overlay">
    <h2 className="story-title">Our Story</h2>

    <p className="story-desc">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.  
      Dedicated to craftsmanship and timeless elegance.
    </p>

    <button className="story-btn">KNOW MORE</button>
  </div>
</section>

    {/* TESTIMONIAL / PROOF STRIP */}
<section className="testimony-strip">
  <div className="test-card">
    <h6>MISSION</h6>
    <blockquote>“Harry Clinton designed my wedding suit perfectly. The fit, the finish — felt truly royal.” — Arjun Y.</blockquote>
  </div>

  <div className="test-card">
    <h6>VISION</h6>
    <blockquote>“A modern take on classic tailoring. Each piece tells a story.” — Fashion Editor</blockquote>
  </div>

  <div className="test-card">
    <h6>CORE VALUES</h6>
    <blockquote>“Quality and attention to detail are unmatched.” — Kiran K.</blockquote>
  </div>
</section>

{/* Quater sections */}
<section className="quarters-wrapper">
  {/* Q1 - Top full width */}
  <div className="quarter q1">
    <h3 className="quarter-title">Mission, Vision & Values</h3>
    <p className="quarter-text">
      Our mission is to deliver handcrafted menswear with unmatched attention to detail —
      combining classic tailoring with modern sensibilities. Our vision is to be globally recognised
      for timeless design and personal craftsmanship. Core values: quality, integrity and creativity.
    </p>
  </div>

  {/* Bottom row: Team (left) + Social Proof (center) + Verified card (right) */}
  <div className="quarters-row">
    {/* Q3 - Team Section */}
    <div className="quarter q3">
      <h3 className="quarter-title">Team Section</h3>

      <div className="team-row">
        <div className="team-member">
          <img src={avatar1} alt="Arjun Y" />
          <div className="member-name">Rajkumar</div>
        </div>

        <div className="team-member">
          <img src={avatar2} alt="Priya S" />
          <div className="member-name">Mounika</div>
        </div>

        <div className="team-member">
          <img src={avatar3} alt="Vikram R" />
          <div className="member-name">Sabarish</div>
        </div>

        <div className="team-member">
          <img src={avatar4} alt="Nisha K" />
          <div className="member-name">Suganthi</div>
        </div>
      </div>
    </div>


    {/* Q2 - Social Proof (left) */}
<div className="quarter q2">
  <h3 className="quarter-title">Social Proof</h3>

  <ul className="tick-list single-tick-list">
    <li>Design Excellence</li>
    <li>Customer Satisfaction</li>
    <li>Featured in top publications</li>
    <li>Award-winning garments</li>
    <li>Trusted by celebs</li>
  </ul>
</div>


    {/* Q4 - Verified Clients card (RIGHT) */}
    <div className="quarter q4">
      <h3 className="quarter-title">Social Proof</h3>

      <div className="verified-box">
        <div className="verified-left">
          <div className="verified-badge">
            <img src={badge1} alt="verified" />
          </div>
        </div>

        <div className="verified-right">
          <div className="verified-title"> <b>Verified Client Clients</b> </div>
          <div className="verified-desc">
            Our collections are carried by select boutiques and featured in premium editorials.
          </div>

          <div className="verified-list">
            <div className="v-item">— Trusted craftsmanship</div>
            <div className="v-item">— Bespoke tailoring</div>
            <div className="v-item">— High-profile clients</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



    </div>
  );
}