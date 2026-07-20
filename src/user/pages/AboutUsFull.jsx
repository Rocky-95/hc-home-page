import React from "react";
import "../styles/AboutUsFull.css";
import { safeParse, getSetting, getSection, useContentData } from "../../utils/contentHelpers";
import aboutBanner from "../../shared/assets/images/AboutUs/about-banner.jpeg";

const defaultStory = [
  "Harry Clinton is more than a brand — it is a journey shaped by passion, precision, and purpose.",
  "I began designing at the age of 18, driven not by trends but by instinct. Fabric, fit, and form were never just garments to me; they were expressions of identity.",
  "Over the past decade, I have styled more than 5,000 weddings, created original collections, and earned the trust of men on the most important days of their lives.",
  "Harry Clinton stands for men who lead with quiet confidence — where every stitch tells a story and every piece is built for legacy.",
];

const AboutUsFull = () => {
  const { loading, settings, sections } = useContentData(["about", "about-us"]);

  const s = (key) => getSetting(settings, key);
  const sec = (title) => getSection(sections, title);

  const banner = {
    image: s("about_full_banner_image") || sec("Full Banner Image") || aboutBanner,
    title: s("about_full_banner_title") || sec("Full Banner Title") || "About Us",
  };

  const story = {
    title: s("about_full_story_title") || sec("Full Story Title") || "The Story of Harry Clinton",
    items: safeParse(s("about_full_story_items")) || defaultStory,
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status"><span className="visually-hidden">Loading about...</span></div>
      </div>
    );
  }

  return (
    <>
      <section
        className="about-banner"
        style={{ backgroundImage: `url(${banner.image})` }}
      >
        <div className="about-banner-overlay"></div>
        <div className="about-banner-content">
          <h1>{banner.title}</h1>
        </div>
      </section>

      <section className="about-story">
        <h2>{story.title}</h2>
        <ul className="about-list">
          {story.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default AboutUsFull;