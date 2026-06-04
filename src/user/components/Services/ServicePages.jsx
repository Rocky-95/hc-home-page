import { useState } from "react";
import logo from "../../../shared/assets/images/HC-Logo-Golden.PNG";
/* ─────────────────────────────────────────────
   SHARED CONSTANTS & HELPERS
───────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const NAV_ITEMS = [
  { id: "embroidery", label: "Embroidery" },
  { id: "alterations", label: "Alterations" },
  { id: "styling", label: "Personal Styling" },
  { id: "tailoring", label: "Custom Tailoring" },
];
/* ─────────────────────────────────────────────
   SHARED NAV BAR
───────────────────────────────────────────── */
function NavBar({ activePage, onNavigate }) {
//   const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(26,23,20,0.96)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      padding: "0 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "64px",
    }}>
      {/* Logo */}
      <div
        onClick={() => onNavigate("embroidery")}
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
      >
       
      
         <img
    src={logo}
    alt="Atelier Logo"
    style={{
      width: "100px",
      height: "100px",
      objectFit: "contain",
      borderRadius: "50%" // optional
    }}
  />
      </div>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: "4px" }}>
        {NAV_ITEMS.map(item => (
          <button key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              background: activePage === item.id ? "rgba(201,169,110,0.15)" : "transparent",
              border: activePage === item.id ? "1px solid rgba(201,169,110,0.4)" : "1px solid transparent",
              borderRadius: "8px",
              color: activePage === item.id ? "#c9a96e" : "#9a9088",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px", fontWeight: "400",
              padding: "8px 16px", cursor: "pointer",
              transition: "all 0.2s ease",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={e => { if (activePage !== item.id) e.currentTarget.style.color = "#d4c9bc"; }}
            onMouseLeave={e => { if (activePage !== item.id) e.currentTarget.style.color = "#9a9088"; }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button style={{
        background: "#c9a96e", color: "#1a1714",
        border: "none", borderRadius: "8px",
        padding: "10px 22px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px", fontWeight: "600",
        letterSpacing: "0.04em", cursor: "pointer",
        transition: "background 0.2s ease",
      }}
        onMouseEnter={e => e.currentTarget.style.background = "#d4b87d"}
        onMouseLeave={e => e.currentTarget.style.background = "#c9a96e"}
      >
        Book Now
      </button>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   SHARED SECTION FOOTER / BOOKING STRIP
───────────────────────────────────────────── */
function BookingStrip({ onBook }) {
  return (
    <div style={{
      background: "#c9a96e",
      padding: "48px 60px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "24px",
    }}>
      <div>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "28px", fontWeight: "600", color: "#1a1714",
          margin: "0 0 6px 0",
        }}>Ready to begin?</p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px", fontWeight: "300", color: "#4a3e2e", margin: 0,
        }}>Schedule a free consultation with our specialists.</p>
      </div>
      <button
        onClick={onBook}
        style={{
          background: "#1a1714", color: "#c9a96e",
          border: "none", borderRadius: "10px",
          padding: "16px 36px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px", fontWeight: "600",
          letterSpacing: "0.06em", cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#2d2926"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#1a1714"; e.currentTarget.style.transform = "none"; }}
      >
        Book a Consultation →
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE 1 — EMBROIDERY
───────────────────────────────────────────── */
const EMBROIDERY_TECHNIQUES = [
  { name: "Zardozi", origin: "Mughal Era", desc: "Gold and silver thread work with semi-precious stones." },
  { name: "Kantha", origin: "Bengal", desc: "Running stitch patterns in vibrant silk threads." },
  { name: "Chikankari", origin: "Lucknow", desc: "Delicate white-on-white hand embroidery on fine fabric." },
  { name: "Kashmiri Aari", origin: "Kashmir", desc: "Chain stitch florals on shawls and garments." },
];

const EMBROIDERY_GALLERY = [
  { label: "Floral Motif", color: "#3d2c1e", accent: "#c9a96e" },
  { label: "Geometric Border", color: "#1e2d2c", accent: "#7ab8a8" },
  { label: "Monogram", color: "#2c1e2d", accent: "#b87ab8" },
  { label: "Bridal Panel", color: "#2d261e", accent: "#d4a06a" },
];

function EmbroideryPage({ onBook }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{ background: "#0f0d0b", minHeight: "100vh", paddingTop: "64px" }}>

      {/* Hero */}
      <div style={{
        position: "relative", overflow: "hidden",
        padding: "100px 60px 80px",
        background: "linear-gradient(135deg, #1a1410 0%, #0f0d0b 60%, #1a1208 100%)",
      }}>
        {/* Decorative thread lines */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.12 }}
          viewBox="0 0 900 500" preserveAspectRatio="none">
          {[...Array(12)].map((_, i) => (
            <path key={i}
              d={`M${i * 80} 0 Q${i * 80 + 40} ${120 + i * 15} ${i * 80 + 80} 500`}
              stroke="#c9a96e" strokeWidth="0.8" fill="none" />
          ))}
        </svg>

        <div style={{ position: "relative", maxWidth: "760px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "rgba(201,169,110,0.12)",
            border: "1px solid rgba(201,169,110,0.3)",
            borderRadius: "4px", padding: "6px 16px",
            marginBottom: "32px",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#c9a96e" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#c9a96e", textTransform: "uppercase" }}>
              Artisan Embroidery
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: "700", color: "#f0ebe3",
            lineHeight: "1.0", letterSpacing: "-0.02em",
            margin: "0 0 24px 0",
          }}>
            Thread by thread,<br />
            <em style={{ color: "#c9a96e", fontWeight: "300" }}>story by story.</em>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px", fontWeight: "300", color: "#7a7068",
            lineHeight: "1.9", maxWidth: "520px", margin: "0 0 48px 0",
          }}>
            Centuries-old embroidery traditions, reimagined for modern garments.
            Each stitch placed with intention — from bridal couture to everyday elegance.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {[["Hand Embroidered", "#c9a96e"], ["Machine Precision", "#7ab8a8"], ["Bespoke Designs", "#b87ab8"]].map(([label, color]) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "8px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px", color: "#9a9088",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Techniques tabs */}
      <div style={{ padding: "64px 60px", background: "#13110e" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#5a5248", textTransform: "uppercase", marginBottom: "32px" }}>
          Our Techniques
        </p>

        <div style={{ display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }}>
          {EMBROIDERY_TECHNIQUES.map((t, i) => (
            <button key={i}
              onClick={() => setActiveTab(i)}
              style={{
                background: activeTab === i ? "#c9a96e" : "rgba(255,255,255,0.04)",
                border: activeTab === i ? "none" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", padding: "10px 20px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px", fontWeight: activeTab === i ? "600" : "300",
                color: activeTab === i ? "#1a1714" : "#7a7068",
                cursor: "pointer", transition: "all 0.22s ease",
              }}>
              {t.name}
            </button>
          ))}
        </div>

        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px", padding: "36px",
          maxWidth: "600px",
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.18em", color: "#5a5248", textTransform: "uppercase", margin: "0 0 12px 0" }}>
            Origin: {EMBROIDERY_TECHNIQUES[activeTab].origin}
          </p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: "600", color: "#c9a96e", margin: "0 0 16px 0" }}>
            {EMBROIDERY_TECHNIQUES[activeTab].name}
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: "300", color: "#9a9088", lineHeight: "1.8", margin: 0 }}>
            {EMBROIDERY_TECHNIQUES[activeTab].desc}
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <div style={{ padding: "64px 60px", background: "#0f0d0b" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#5a5248", textTransform: "uppercase", marginBottom: "32px" }}>
          Sample Work
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
          {EMBROIDERY_GALLERY.map((g, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                height: "200px", borderRadius: "14px",
                background: g.color,
                border: hoveredCard === i ? `1px solid ${g.accent}` : "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "flex-end",
                padding: "20px", cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoveredCard === i ? "translateY(-4px)" : "none",
                position: "relative", overflow: "hidden",
              }}>
              {/* Decorative SVG pattern */}
              <svg style={{ position: "absolute", top: "16px", right: "16px", opacity: hoveredCard === i ? 0.6 : 0.25, transition: "opacity 0.25s" }}
                width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke={g.accent} strokeWidth="0.8" />
                <path d="M24 4 L24 44 M4 24 L44 24 M8 8 L40 40 M40 8 L8 40" stroke={g.accent} strokeWidth="0.5" />
              </svg>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: "500", color: g.accent, letterSpacing: "0.08em", position: "relative" }}>
                {g.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BookingStrip onBook={onBook} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE 2 — ALTERATIONS
───────────────────────────────────────────── */
const ALTERATION_TYPES = [
  { icon: "↔", label: "Taking In / Letting Out", desc: "Waist, hips, chest — resized to your exact measurements.", time: "3–5 days" },
  { icon: "↕", label: "Hemming", desc: "Trousers, dresses, skirts — any length, any finish.", time: "1–2 days" },
  { icon: "✂", label: "Sleeve Adjustment", desc: "Length and circumference altered for perfect drape.", time: "2–3 days" },
  { icon: "◈", label: "Zipper Replacement", desc: "Invisible, exposed, or separating — fully replaced.", time: "2–4 days" },
  { icon: "⊕", label: "Lining Repair", desc: "Torn or worn linings restored to original condition.", time: "3–5 days" },
  { icon: "◇", label: "Button & Fastener", desc: "Replacement, repositioning, or new buttonholes added.", time: "1 day" },
];

function AlterationsPage({ onBook }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ background: "#f7f4ef", minHeight: "100vh", paddingTop: "64px" }}>

      {/* Hero — light, editorial */}
      <div style={{
        padding: "80px 60px 60px",
        background: "#f7f4ef",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background rule lines */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${i * 18}%`, left: 0, right: 0,
            height: "1px", background: "rgba(0,0,0,0.04)",
          }} />
        ))}

        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", maxWidth: "1000px" }}>
          <div>
            <div style={{
              display: "inline-block",
              borderLeft: "3px solid #2d2926",
              paddingLeft: "16px", marginBottom: "32px",
            }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#8b8078", textTransform: "uppercase", margin: 0 }}>
                Alterations Service
              </p>
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: "700", color: "#1a1714",
              lineHeight: "1.05", letterSpacing: "-0.02em",
              margin: "0 0 24px 0",
            }}>
              Every garment<br />
              <em style={{ fontWeight: "300", color: "#8b7355" }}>deserves to fit.</em>
            </h1>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px", fontWeight: "300", color: "#6b6057",
              lineHeight: "1.85", margin: "0 0 36px 0",
            }}>
              A great fit transforms how you feel. We alter off-the-rack and designer pieces alike — with precision, care, and respect for the original craft.
            </p>

            <div style={{ display: "flex", gap: "32px" }}>
              {[["48hr", "Rush Available"], ["100%", "Satisfaction"], ["15+", "Years Experience"]].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: "700", color: "#1a1714", margin: "0 0 4px 0" }}>{num}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#8b8078", margin: 0, letterSpacing: "0.06em" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Measurement tape illustration */}
          <div style={{
            height: "340px",
            background: "#ede9e2",
            borderRadius: "20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            border: "1px solid #ddd8d0",
          }}>
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Tape measure */}
              <rect x="20" y="95" width="180" height="30" rx="15" fill="#2d2926" />
              {[...Array(18)].map((_, i) => (
                <rect key={i} x={28 + i * 9} y={98} width="1" height={i % 3 === 0 ? 16 : 10} fill="#c9a96e" />
              ))}
              <text x="110" y="116" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="10" fill="#c9a96e" fontWeight="500">cm</text>
              {/* Scissors */}
              <g transform="translate(75, 30) rotate(-30)">
                <ellipse cx="0" cy="0" rx="12" ry="6" fill="none" stroke="#8b7355" strokeWidth="2" />
                <ellipse cx="24" cy="0" rx="12" ry="6" fill="none" stroke="#8b7355" strokeWidth="2" />
                <line x1="10" y1="0" x2="50" y2="30" stroke="#2d2926" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="0" x2="50" y2="-30" stroke="#2d2926" strokeWidth="2" strokeLinecap="round" />
              </g>
              {/* Thread */}
              <path d="M140 30 Q160 50 150 80 Q140 110 160 140" stroke="#c9a96e" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
              <circle cx="140" cy="30" r="8" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Service grid */}
      <div style={{ padding: "64px 60px", background: "#ffffff" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#a89f96", textTransform: "uppercase", marginBottom: "36px" }}>
          What We Offer
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {ALTERATION_TYPES.map((item, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? "#2d2926" : "#faf8f5",
                border: "1px solid",
                borderColor: hovered === i ? "#2d2926" : "#e8e4de",
                borderRadius: "16px", padding: "28px 24px",
                cursor: "pointer", transition: "all 0.25s ease",
                transform: hovered === i ? "translateY(-3px)" : "none",
              }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: hovered === i ? "rgba(201,169,110,0.2)" : "#f0ece6",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", marginBottom: "16px",
                color: hovered === i ? "#c9a96e" : "#2d2926",
                transition: "all 0.25s ease",
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "18px", fontWeight: "600",
                color: hovered === i ? "#f0ebe3" : "#1a1714",
                margin: "0 0 10px 0", transition: "color 0.25s ease",
              }}>
                {item.label}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px", fontWeight: "300",
                color: hovered === i ? "#9a9088" : "#6b6057",
                lineHeight: "1.7", margin: "0 0 16px 0",
                transition: "color 0.25s ease",
              }}>
                {item.desc}
              </p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: hovered === i ? "rgba(201,169,110,0.15)" : "#ede9e2",
                borderRadius: "6px", padding: "4px 12px",
              }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: hovered === i ? "#c9a96e" : "#8b7355" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: hovered === i ? "#c9a96e" : "#8b7355", letterSpacing: "0.06em" }}>
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingStrip onBook={onBook} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE 3 — PERSONAL STYLING
───────────────────────────────────────────── */
const STYLING_PACKAGES = [
  {
    name: "Essential Edit",
    price: "₹4,500",
    duration: "90 min",
    features: ["Wardrobe audit (up to 50 pieces)", "Colour analysis", "Style profile creation", "Shopping list"],
    accent: "#7ab8a8",
  },
  {
    name: "Full Transformation",
    price: "₹12,000",
    duration: "Full Day",
    features: ["Complete wardrobe overhaul", "Personal shopping session", "Occasion-specific looks", "Digital lookbook", "30-day follow-up"],
    accent: "#c9a96e",
    featured: true,
  },
  {
    name: "Event Ready",
    price: "₹6,500",
    duration: "2 hrs",
    features: ["Single event styling", "Outfit curation", "Accessories advice", "Grooming tips"],
    accent: "#b87ab8",
  },
];

function StylingPage({ onBook }) {
  const [hoveredPkg, setHoveredPkg] = useState(null);

  return (
    <div style={{ background: "#0e0c10", minHeight: "100vh", paddingTop: "64px" }}>

      {/* Hero — dark jewel-toned */}
      <div style={{
        padding: "100px 60px 80px",
        background: "linear-gradient(135deg, #0e0c10 0%, #130f18 50%, #0e0c10 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Geometric bg */}
        <svg style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", opacity: 0.08 }}
          viewBox="0 0 400 600" preserveAspectRatio="none">
          {[...Array(8)].map((_, i) => (
            <polygon key={i}
              points={`${200 + i * 20},0 400,${i * 80} 400,${i * 80 + 60} ${200 + i * 20 + 10},0`}
              fill="#b87ab8" />
          ))}
        </svg>

        <div style={{ position: "relative", maxWidth: "680px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "rgba(184,122,184,0.12)",
            border: "1px solid rgba(184,122,184,0.3)",
            borderRadius: "4px", padding: "6px 16px", marginBottom: "32px",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#b87ab8" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#b87ab8", textTransform: "uppercase" }}>
              Personal Styling
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            fontWeight: "700", color: "#f0ebe3",
            lineHeight: "1.05", letterSpacing: "-0.02em",
            margin: "0 0 24px 0",
          }}>
            Dress the life<br />
            <em style={{ color: "#b87ab8", fontWeight: "300" }}>you're living.</em>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px", fontWeight: "300", color: "#6a6270",
            lineHeight: "1.9", maxWidth: "500px", margin: "0 0 48px 0",
          }}>
            Your wardrobe should feel effortless. Our stylists decode your lifestyle, body, and personality to build looks that are authentically, unapologetically you.
          </p>

          {/* Style moods */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {["Classic", "Contemporary", "Minimalist", "Bold", "Eclectic"].map(mood => (
              <div key={mood} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "100px", padding: "8px 18px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px", color: "#9a9098",
                letterSpacing: "0.06em",
              }}>
                {mood}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages */}
      <div style={{ padding: "64px 60px", background: "#13111a" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#4a4850", textTransform: "uppercase", marginBottom: "36px" }}>
          Styling Packages
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {STYLING_PACKAGES.map((pkg, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredPkg(i)}
              onMouseLeave={() => setHoveredPkg(null)}
              style={{
                background: pkg.featured ? "rgba(184,122,184,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${pkg.featured ? "rgba(184,122,184,0.4)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: "20px", padding: "32px 28px",
                position: "relative", overflow: "hidden",
                cursor: "pointer", transition: "all 0.25s ease",
                transform: hoveredPkg === i ? "translateY(-4px)" : "none",
              }}>
              {pkg.featured && (
                <div style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: "#b87ab8", color: "#fff",
                  fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "4px 12px", borderRadius: "4px",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: "600",
                }}>Most Popular</div>
              )}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.18em", color: pkg.accent, textTransform: "uppercase", margin: "0 0 16px 0" }}>
                {pkg.duration}
              </p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "600", color: "#f0ebe3", margin: "0 0 8px 0" }}>
                {pkg.name}
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: "700", color: pkg.accent, margin: "0 0 28px 0" }}>
                {pkg.price}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                {pkg.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: pkg.accent, fontSize: "14px", marginTop: "1px", flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#7a7278", fontWeight: "300" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onBook}
                style={{
                  width: "100%", background: pkg.featured ? "#b87ab8" : "transparent",
                  border: `1px solid ${pkg.accent}`,
                  borderRadius: "10px", padding: "12px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                  fontWeight: "500", color: pkg.featured ? "#fff" : pkg.accent,
                  cursor: "pointer", transition: "all 0.2s ease", letterSpacing: "0.04em",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = pkg.accent; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = pkg.featured ? "#b87ab8" : "transparent"; e.currentTarget.style.color = pkg.featured ? "#fff" : pkg.accent; }}
              >
                Choose Package
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Process steps */}
      <div style={{ padding: "64px 60px", background: "#0e0c10" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#4a4850", textTransform: "uppercase", marginBottom: "40px" }}>
          How It Works
        </p>
        <div style={{ display: "flex", gap: "0", position: "relative" }}>
          <div style={{ position: "absolute", top: "20px", left: "20px", right: "20px", height: "1px", background: "rgba(255,255,255,0.08)" }} />
          {["Style Consult", "Analysis", "Curation", "Final Reveal"].map((step, i) => (
            <div key={step} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", position: "relative" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "#13111a",
                border: "1px solid rgba(184,122,184,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "16px", fontWeight: "600", color: "#b87ab8",
              }}>
                {i + 1}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6a6270", textAlign: "center", margin: 0 }}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      <BookingStrip onBook={onBook} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE 4 — CUSTOM TAILORING
───────────────────────────────────────────── */
const TAILORING_STEPS = [
  { num: "01", title: "Consultation", desc: "Discuss your vision, occasion, and fabric preferences with our master tailor." },
  { num: "02", title: "Measurement", desc: "34 precise body measurements taken for a flawless base pattern." },
  { num: "03", title: "Fabric Selection", desc: "Choose from 200+ fabrics — imported wools, silks, linens, and bespoke blends." },
  { num: "04", title: "First Fitting", desc: "Try the muslin toile and refine every seam, dart, and proportion." },
  { num: "05", title: "Construction", desc: "Hand-stitched by our artisans with meticulous attention to every detail." },
  { num: "06", title: "Final Fitting", desc: "Wear your finished garment. Minor tweaks included as standard." },
];

const GARMENT_TYPES = ["Suit", "Sherwani", "Kurta Set", "Blazer", "Trousers", "Dress", "Lehenga", "Coat"];

function TailoringPage({ onBook }) {
  const [selectedGarment, setSelectedGarment] = useState("Suit");

  return (
    <div style={{ background: "#f9f6f0", minHeight: "100vh", paddingTop: "64px" }}>

      {/* Hero — warm parchment */}
      <div style={{
        padding: "80px 60px 60px",
        background: "#f9f6f0",
        borderBottom: "1px solid #e8e2d8",
        position: "relative",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", maxWidth: "1000px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ width: "32px", height: "1px", background: "#8b7355" }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#8b7355", textTransform: "uppercase", margin: 0 }}>
                Custom Tailoring
              </p>
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: "700", color: "#1a1714",
              lineHeight: "1.05", letterSpacing: "-0.02em",
              margin: "0 0 24px 0",
            }}>
              Garments born<br />
              <em style={{ fontWeight: "300", color: "#8b7355" }}>from your vision.</em>
            </h1>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px", fontWeight: "300", color: "#6b6057",
              lineHeight: "1.85", margin: "0 0 40px 0", maxWidth: "420px",
            }}>
              Nothing off-the-shelf. Everything made for you, to you — from the first sketch to the final stitch.
            </p>

            {/* Garment selector */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.18em", color: "#a89f96", textTransform: "uppercase", marginBottom: "14px" }}>
              Select garment type
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {GARMENT_TYPES.map(g => (
                <button key={g}
                  onClick={() => setSelectedGarment(g)}
                  style={{
                    background: selectedGarment === g ? "#2d2926" : "transparent",
                    border: "1px solid",
                    borderColor: selectedGarment === g ? "#2d2926" : "#ddd8d0",
                    borderRadius: "8px", padding: "8px 16px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px", fontWeight: selectedGarment === g ? "500" : "300",
                    color: selectedGarment === g ? "#f0ebe3" : "#6b6057",
                    cursor: "pointer", transition: "all 0.2s ease",
                    letterSpacing: "0.04em",
                  }}>
                  {g}
                </button>
              ))}
            </div>

            <div style={{
              marginTop: "32px", padding: "20px 24px",
              background: "#f0ece4",
              borderRadius: "12px", border: "1px solid #e0dbd0",
              display: "inline-flex", alignItems: "center", gap: "16px",
            }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#c9a96e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "16px" }}>✓</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "600", color: "#1a1714", margin: "0 0 2px 0" }}>
                  {selectedGarment} starting from ₹8,500
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#8b8078", margin: 0 }}>
                  Delivery in 10–14 working days
                </p>
              </div>
            </div>
          </div>

          {/* Fabric swatches illustration */}
          <div style={{
            height: "380px", borderRadius: "20px",
            background: "#ede9e0",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid #ddd8d0", position: "relative", overflow: "hidden",
          }}>
            {[
              { color: "#2d2926", x: 30, y: 30, r: -15 },
              { color: "#8b7355", x: 70, y: 60, r: 10 },
              { color: "#4a6b5a", x: 120, y: 20, r: -5 },
              { color: "#6b4a3a", x: 160, y: 70, r: 20 },
              { color: "#3a4a6b", x: 55, y: 120, r: -25 },
            ].map((s, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${s.x}px`, top: `${s.y}px`,
                width: "100px", height: "130px",
                background: s.color,
                borderRadius: "6px",
                transform: `rotate(${s.r}deg)`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}>
                <div style={{ height: "100%", backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 8px)` }} />
              </div>
            ))}
            <div style={{
              position: "absolute", bottom: "24px", left: "24px", right: "24px",
              background: "rgba(26,23,20,0.85)", backdropFilter: "blur(8px)",
              borderRadius: "10px", padding: "14px 18px",
            }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#c9a96e", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px 0" }}>200+ Fabrics</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: "#f0ebe3", margin: 0 }}>Italian Wools · Japanese Silks · Indian Linens</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6-step process */}
      <div style={{ padding: "64px 60px", background: "#ffffff" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#a89f96", textTransform: "uppercase", marginBottom: "40px" }}>
          The Process
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          {TAILORING_STEPS.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "20px" }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: "#f0ece6",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontWeight: "700", color: "#8b7355" }}>
                    {step.num}
                  </span>
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "600", color: "#1a1714", margin: "0 0 8px 0" }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: "300", color: "#6b6057", lineHeight: "1.75", margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingStrip onBook={onBook} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   BOOKING MODAL
───────────────────────────────────────────── */
function BookingModal({ onClose }) {
//   const [step, setStep] = useState(1);
  const [form, setForm] = useState({ service: "", name: "", phone: "", date: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.phone) setSubmitted(true);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(15,13,11,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#f9f6f0", borderRadius: "24px",
          width: "100%", maxWidth: "480px",
          padding: "40px", position: "relative",
          border: "1px solid #e8e2d8",
        }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "20px", right: "20px",
          background: "none", border: "none", fontSize: "20px",
          cursor: "pointer", color: "#8b8078", lineHeight: 1,
        }}>✕</button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "20px" }}>✓</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: "700", color: "#1a1714", margin: "0 0 12px 0" }}>
              You're booked in!
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#6b6057", margin: "0 0 28px 0" }}>
              We'll confirm your appointment within 24 hours.
            </p>
            <button onClick={onClose} style={{
              background: "#2d2926", color: "#f0ebe3",
              border: "none", borderRadius: "10px", padding: "14px 32px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
              fontWeight: "500", cursor: "pointer",
            }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "32px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#8b7355", textTransform: "uppercase", margin: "0 0 8px 0" }}>
                Consultation
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: "700", color: "#1a1714", margin: 0 }}>
                Book your fitting
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Service", field: "service", type: "select", options: ["Embroidery", "Alterations", "Personal Styling", "Custom Tailoring"] },
                { label: "Your name", field: "name", type: "text", placeholder: "Full name" },
                { label: "Phone number", field: "phone", type: "tel", placeholder: "+91 98765 43210" },
                { label: "Preferred date", field: "date", type: "date" },
              ].map(({ label, field, type, options, placeholder }) => (
                <div key={field}>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.12em", color: "#8b8078", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                    {label}
                  </label>
                  {type === "select" ? (
                    <select
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: "#ffffff",
                        border: "1px solid #ddd8d0", borderRadius: "10px",
                        fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                        color: form[field] ? "#1a1714" : "#a89f96",
                        outline: "none", cursor: "pointer", boxSizing: "border-box",
                      }}>
                      <option value="">Select a service</option>
                      {options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: "#ffffff",
                        border: "1px solid #ddd8d0", borderRadius: "10px",
                        fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                        color: "#1a1714", outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  )}
                </div>
              ))}

              <button
                onClick={handleSubmit}
                style={{
                  marginTop: "8px", width: "100%",
                  background: "#2d2926", color: "#f0ebe3",
                  border: "none", borderRadius: "12px",
                  padding: "15px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px", fontWeight: "600",
                  letterSpacing: "0.06em", cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#4a4540"}
                onMouseLeave={e => e.currentTarget.style.background = "#2d2926"}
              >
                Confirm Booking →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function ServicesPage() {
  const [page, setPage] = useState("embroidery");
  const [showBooking, setShowBooking] = useState(false);

  const pages = {
    embroidery: <EmbroideryPage onBook={() => setShowBooking(true)} />,
    alterations: <AlterationsPage onBook={() => setShowBooking(true)} />,
    styling: <StylingPage onBook={() => setShowBooking(true)} />,
    tailoring: <TailoringPage onBook={() => setShowBooking(true)} />,
  };

  return (
    <>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0d0b; }
        input, select, button { font-family: inherit; }
        input::placeholder { color: #a89f96; }
      `}</style>

<NavBar
  activePage={page}
  onNavigate={(id) => setPage(id)}
/>
      <div key={page} style={{ animation: "fadeIn 0.4s ease both" }}>
        {pages[page]}
      </div>

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}