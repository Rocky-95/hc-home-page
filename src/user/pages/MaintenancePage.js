import React, { useEffect, useState } from "react";
import "../styles/MaintenancePage.css";
import logo from "../../shared/assets/images/HC Black.png";

const MaintenancePage = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((previous) => (previous.length >= 3 ? "." : `${previous}.`));
    }, 650);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="maintenance-page">
      <div className="maintenance-noise" aria-hidden="true" />

      <header className="maintenance-header">
        <img src={logo} alt="Harry Clinton" className="maintenance-logo" />
      </header>

      <section className="maintenance-content" aria-labelledby="maintenance-title">
        <p className="maintenance-eyebrow">A new chapter is being tailored</p>
        <h1 id="maintenance-title">
          We&apos;re making room
          <span>for something extraordinary.</span>
        </h1>
        <p className="maintenance-copy">
          Harry Clinton is currently being refined behind the scenes. We&apos;ll be
          back very soon with a sharper edit, new arrivals, and offers made for
          the moments that matter.
        </p>

        <div className="maintenance-divider" aria-hidden="true">
          <span />
          <b>HC</b>
          <span />
        </div>

        <div className="maintenance-note">
          <strong>Something special is on its way{dots}</strong>
          <span>Stay close. The next reveal will be worth the wait.</span>
        </div>

      </section>
    </main>
  );
};

export default MaintenancePage;
