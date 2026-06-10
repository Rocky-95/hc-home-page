import React from "react";
import Home from "./user/pages/Home";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProductPage from "./user/components/Categories/Suits/ProductPage";
import SuitsCategoryPage from "./user/components/Categories/Suits/SuitsCategoryPage";
import Wedding from "./user/components/Categories/Suits/Wedding";
import Business from "./user/components/Categories/Suits/Business";
import Designer from "./user/components/Categories/Suits/Designer";
import Travel from "./user/components/Categories/Suits/Travel";
import SmartCasual from "./user/components/Categories/Suits/SmartCasual";
import IndoWesternCategoryPage from "./user/components/Categories/IndoWestern/IndoWesternCategoryPage";
import WeddingIndoWestern from "./user/components/Categories/IndoWestern/WeddingIndoWestern";
import BusinessIndoWestern from "./user/components/Categories/IndoWestern/BusinessIndoWestern";
import DesignerIndoWestern from "./user/components/Categories/IndoWestern/DesignerIndoWestern";
import TravelIndoWestern from "./user/components/Categories/IndoWestern/TravelIndoWestern";
import SmartCasualIndoWestern from "./user/components/Categories/IndoWestern/SmartCasualIndoWestern";
import ShirtsCategoryPage from "./user/components/Categories/Shirts/ShirtsCategoryPage";
import WeddingShirt from "./user/components/Categories/Shirts/WeddingShirt";
import BusinessShirt from "./user/components/Categories/Shirts/BusinessShirt";
import DesignerShirt from "./user/components/Categories/Shirts/DesignerShirt";
import TravelShirt from "./user/components/Categories/Shirts/TravelShirt";
import SmartCasualShirt from "./user/components/Categories/Shirts/SmartCasualShirt";
import TrousersCategoryPage from "./user/components/Categories/Trousers/TrousersCategoryPage";
import WeddingTrouser from "./user/components/Categories/Trousers/WeddingTrouser";
import BusinessTrouser from "./user/components/Categories/Trousers/BusinessTrouser";
import DesignerTrouser from "./user/components/Categories/Trousers/DesignerTrouser";
import TravelTrouser from "./user/components/Categories/Trousers/TravelTrouser";
import SmartCasualTrouser from "./user/components/Categories/Trousers/SmartCasualTrouser";
import BabySuitsCategoryPage from "./user/components/Categories/BabySuits/BabySuitsCategoryPage";
import WeddingBabySuit from "./user/components/Categories/BabySuits/WeddingBabySuit";
import BusinessBabySuit from "./user/components/Categories/BabySuits/BusinessBabySuit";
import DesignerBabySuit from "./user/components/Categories/BabySuits/DesignerBabySuit";
import TravelBabySuit from "./user/components/Categories/BabySuits/TravelBabySuit";
import SmartCasualBabySuit from "./user/components/Categories/BabySuits/SmartCasualBabySuit";
import ServicePage from "./user/components/Services/ServicePages.jsx";
import AboutUs from "./user/pages/AboutUs";
import AboutUsFull from "./user/pages/AboutUsFull";
import InfoPage from "./user/pages/InfoPage";
import PrivacyPolicy from "./user/pages/PrivacyPolicy";
import TermsAndConditions from "./user/pages/TermsAndConditions";
import NotFound from "./user/pages/NotFound";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/product/:id", element: <ProductPage /> },
  { path: "/suits", element: <SuitsCategoryPage /> },
  { path: "/wedding", element: <Wedding /> },
  { path: "/business", element: <Business /> },
  { path: "/designer", element: <Designer /> },
  { path: "/travel", element: <Travel /> },
  { path: "/smart-casual", element: <SmartCasual /> },
  { path: "/indo-western", element: <IndoWesternCategoryPage /> },
  { path: "/indo-western/wedding", element: <WeddingIndoWestern /> },
  { path: "/indo-western/business", element: <BusinessIndoWestern /> },
  { path: "/indo-western/designer", element: <DesignerIndoWestern /> },
  { path: "/indo-western/travel", element: <TravelIndoWestern /> },
  { path: "/indo-western/smart-casual", element: <SmartCasualIndoWestern /> },
  { path: "/shirts", element: <ShirtsCategoryPage /> },
  { path: "/shirts/wedding", element: <WeddingShirt /> },
  { path: "/shirts/business", element: <BusinessShirt /> },
  { path: "/shirts/designer", element: <DesignerShirt /> },
  { path: "/shirts/travel", element: <TravelShirt /> },
  { path: "/shirts/smart-casual", element: <SmartCasualShirt /> },
  { path: "/trousers", element: <TrousersCategoryPage /> },
  { path: "/trousers/wedding", element: <WeddingTrouser /> },
  { path: "/trousers/business", element: <BusinessTrouser /> },
  { path: "/trousers/designer", element: <DesignerTrouser /> },
  { path: "/trousers/travel", element: <TravelTrouser /> },
  { path: "/trousers/smart-casual", element: <SmartCasualTrouser /> },
  { path: "/baby-suits", element: <BabySuitsCategoryPage /> },
  { path: "/baby-suits/wedding", element: <WeddingBabySuit /> },
  { path: "/baby-suits/business", element: <BusinessBabySuit /> },
  { path: "/baby-suits/designer", element: <DesignerBabySuit /> },
  { path: "/baby-suits/travel", element: <TravelBabySuit /> },
  { path: "/baby-suits/smart-casual", element: <SmartCasualBabySuit /> },
  { path: "/services", element: <ServicePage /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/about-designer", element: <AboutUsFull /> },
  {
    path: "/contact-us",
    element: (
      <InfoPage
        title="Contact Us"
        description="Reach our team for orders, styling help, and customer support."
        details={[
          "Email: support@hc-home-page.com",
          "Phone: +91 98765 43210",
          "Address: Chennai, Tamil Nadu, India",
        ]}
      />
    ),
  },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-and-conditions", element: <TermsAndConditions /> },
  {
    path: "/policies",
    element: (
      <InfoPage
        title="Policies"
        description="Find our shipping, returns, and cancellation policies in one place."
        details={[
          "Shipping typically takes 5-7 business days.",
          "Returns are handled on a case-by-case basis.",
          "Contact support for order tracking and policy questions.",
        ]}
      />
    ),
  },
  {
    path: "/faqs",
    element: (
      <InfoPage
        title="FAQs"
        description="Frequently asked questions about ordering, delivery, and support."
        details={[
          "Can I change my order after placing it? Contact support within 24 hours.",
          "How long does delivery take? Typically 5-7 business days.",
          "How can I track my order? Reach out to our support team.",
        ]}
      />
    ),
  },
  {
    path: "/tuxedo",
    element: (
      <InfoPage
        title="Tuxedo Collection"
        description="Explore our premium tuxedo collection for formal events and weddings."
        details={[
          "Tailored to fit every body type.",
          "Made with premium materials and expert craftsmanship.",
        ]}
      />
    ),
  },
  {
    path: "/extreme-poppins",
    element: (
      <InfoPage
        title="Extreme Poppins"
        description="A bold, modern collection designed for high-impact style."
        details={[
          "Perfect for statement-making looks and custom events.",
          "Includes limited-edition pieces and styling recommendations.",
        ]}
      />
    ),
  },
  {
    path: "/gurkha-trousers",
    element: (
      <InfoPage
        title="Gurkha Trousers"
        description="Comfortable and structured trousers with a classic Gurkha silhouette."
        details={[
          "Designed for modern men who value comfort and tailoring.",
          "Available in curated fabrics and premium finishes.",
        ]}
      />
    ),
  },
  {
    path: "/linen-shirts-trousers",
    element: (
      <InfoPage
        title="Linen Shirts & Trousers"
        description="Lightweight linen pieces crafted for warm-weather elegance."
        details={[
          "Breathable fabrics and relaxed tailoring for summer wear.",
          "Perfect for casual styling or resort looks.",
        ]}
      />
    ),
  },
  {
    path: "/cigarettes",
    element: (
      <InfoPage
        title="88 Cigarettes"
        description="A premium collection inspired by modern elegance and dark tailoring."
        details={[
          "Sleek silhouettes, rich textures, and signature finishes.",
          "Ideal for evening wear and high-fashion dressing.",
        ]}
      />
    ),
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
