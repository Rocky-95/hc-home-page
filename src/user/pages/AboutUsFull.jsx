import React from "react";
import "../styles/AboutUsFull.css";
import aboutBanner from "../../shared/assets/images/AboutUs/about-banner.jpeg";

const AboutUsFull = () => {
  return (
    <>
      {/* Banner */}
      <section
        className="about-banner"
        style={{ backgroundImage: `url(${aboutBanner})` }}
      >
        <div className="about-banner-overlay"></div>

        <div className="about-banner-content">
          <h1>About Us</h1>
        </div>
      </section>

      {/* Content */}
      <section className="about-story">
        <h2>The Story of Harry Clinton</h2>

        <ul className="about-list">
          <li>
            Harry Clinton is more than a brand — it is a journey shaped by
            passion, precision, and purpose.
          </li>

          <li>
            I began designing at the age of 18, driven not by trends but by
            instinct. Fabric, fit, and form were never just garments to me;
            they were expressions of identity.
          </li>

          <li>
            Over the past decade, I have styled more than 5,000 weddings,
            created original collections, and earned the trust of men on the
            most important days of their lives.
          </li>

          <li>
            Harry Clinton stands for men who lead with quiet confidence —
            where every stitch tells a story and every piece is built for
            legacy.
          </li>
        </ul>
      </section>
    </>
  );
};

export default AboutUsFull;