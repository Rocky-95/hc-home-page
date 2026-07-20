import { lazy, Suspense, useState, useEffect } from "react";
import { HashRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import PrivateRoute from "./shared/components/PrivateRoute";
import LoginPopup from "./shared/components/LoginPopup";
import Home from "./user/pages/Home";
import SplashScreen from "./user/components/SplashScreen";
import AdminLayout from "./admin/components/AdminLayout";
import UserLayout from "./user/components/UserLayout";
import { CartProvider } from "./context/CartContext";

const Login = lazy(() => import("./user/pages/Login"));
const Register = lazy(() => import("./user/pages/Register"));
const ForgotPassword = lazy(() => import("./user/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./user/pages/ResetPassword"));
const ContactUs = lazy(() => import("./user/pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./user/pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./user/pages/TermsAndConditions"));
const FAQs = lazy(() => import("./user/pages/FAQs"));
const Policies = lazy(() => import("./user/pages/Policies"));
const HelpCenter = lazy(() => import("./user/pages/HelpCenter"));
const CartPage = lazy(() => import("./user/pages/CartPage"));
const WishlistPage = lazy(() => import("./user/pages/WishlistPage"));
const CheckoutPage = lazy(() => import("./user/pages/CheckoutPage"));
const ProfilePage = lazy(() => import("./user/pages/ProfilePage"));
const AddressesPage = lazy(() => import("./user/pages/AddressesPage"));
const OrdersPage = lazy(() => import("./user/pages/OrdersPage"));
const AppointmentsPage = lazy(() => import("./user/pages/AppointmentsPage"));
const SearchPage = lazy(() => import("./user/pages/SearchPage"));
const BookAppointmentPage = lazy(() => import("./user/pages/BookAppointmentPage"));
const NewArrivalsPage = lazy(() => import("./user/pages/NewArrivalsPage"));
const HCSpotlightPage = lazy(() => import("./user/pages/HCSpotlightPage"));
const TheVisionPage = lazy(() => import("./user/pages/TheVisionPage"));
const ComingSoonPage = lazy(() => import("./user/pages/ComingSoonPage"));
const StyleByHCPage = lazy(() => import("./user/pages/StyleByHCPage"));
const EmbroideryPage = lazy(() => import("./user/pages/EmbroideryPage"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const AdminCrudPage = lazy(() => import("./admin/pages/AdminCrudPage"));
const AdminOrdersPage = lazy(() => import("./admin/pages/AdminOrdersPage"));
const AdminAppointmentsPage = lazy(() => import("./admin/pages/AdminAppointmentsPage"));
const AdminProductsPage = lazy(() => import("./admin/pages/AdminProductsPage"));
const AdminUsersPage = lazy(() => import("./admin/pages/AdminUsersPage"));
const AdminCategoriesPage = lazy(() => import("./admin/pages/AdminCategoriesPage"));
const AdminSubCategoriesPage = lazy(() => import("./admin/pages/AdminSubCategoriesPage"));
const AdminFaqsPage = lazy(() => import("./admin/pages/AdminFaqsPage"));
const AdminSettingsPage = lazy(() => import("./admin/pages/AdminSettingsPage"));
const AdminSupportContactsPage = lazy(() => import("./admin/pages/AdminSupportContactsPage"));
const AdminLegalPagesPage = lazy(() => import("./admin/pages/AdminLegalPagesPage"));
const AdminSpotlightMediaPage = lazy(() => import("./admin/pages/AdminSpotlightMediaPage"));
const ProductPage = lazy(() =>
  import("./user/components/Categories/Suits/ProductPage")
);

const SuitsCategoryPage = lazy(() =>
  import("./user/components/Categories/Suits/SuitsCategoryPage")
);
const Wedding = lazy(() =>
  import("./user/components/Categories/Suits/Wedding")
);
const Business = lazy(() =>
  import("./user/components/Categories/Suits/Business")
);
const Designer = lazy(() =>
  import("./user/components/Categories/Suits/Designer")
);
const Travel = lazy(() => import("./user/components/Categories/Suits/Travel"));
const SmartCasual = lazy(() =>
  import("./user/components/Categories/Suits/SmartCasual")
);

const IndoWesternCategoryPage = lazy(() =>
  import("./user/components/Categories/IndoWestern/IndoWesternCategoryPage")
);
const WeddingIndoWestern = lazy(() =>
  import("./user/components/Categories/IndoWestern/WeddingIndoWestern")
);
const BusinessIndoWestern = lazy(() =>
  import("./user/components/Categories/IndoWestern/BusinessIndoWestern")
);
const DesignerIndoWestern = lazy(() =>
  import("./user/components/Categories/IndoWestern/DesignerIndoWestern")
);
const TravelIndoWestern = lazy(() =>
  import("./user/components/Categories/IndoWestern/TravelIndoWestern")
);
const SmartCasualIndoWestern = lazy(() =>
  import("./user/components/Categories/IndoWestern/SmartCasualIndoWestern")
);

const ShirtsCategoryPage = lazy(() =>
  import("./user/components/Categories/Shirts/ShirtsCategoryPage")
);
const WeddingShirt = lazy(() =>
  import("./user/components/Categories/Shirts/WeddingShirt")
);
const BusinessShirt = lazy(() =>
  import("./user/components/Categories/Shirts/BusinessShirt")
);
const DesignerShirt = lazy(() =>
  import("./user/components/Categories/Shirts/DesignerShirt")
);
const TravelShirt = lazy(() =>
  import("./user/components/Categories/Shirts/TravelShirt")
);
const SmartCasualShirt = lazy(() =>
  import("./user/components/Categories/Shirts/SmartCasualShirt")
);

const TrousersCategoryPage = lazy(() =>
  import("./user/components/Categories/Trousers/TrousersCategoryPage")
);
const WeddingTrouser = lazy(() =>
  import("./user/components/Categories/Trousers/WeddingTrouser")
);
const BusinessTrouser = lazy(() =>
  import("./user/components/Categories/Trousers/BusinessTrouser")
);
const DesignerTrouser = lazy(() =>
  import("./user/components/Categories/Trousers/DesignerTrouser")
);
const TravelTrouser = lazy(() =>
  import("./user/components/Categories/Trousers/TravelTrouser")
);
const SmartCasualTrouser = lazy(() =>
  import("./user/components/Categories/Trousers/SmartCasualTrouser")
);

const BabySuitsCategoryPage = lazy(() =>
  import("./user/components/Categories/BabySuits/BabySuitsCategoryPage")
);
const WeddingBabySuit = lazy(() =>
  import("./user/components/Categories/BabySuits/WeddingBabySuit")
);
const BusinessBabySuit = lazy(() =>
  import("./user/components/Categories/BabySuits/BusinessBabySuit")
);
const DesignerBabySuit = lazy(() =>
  import("./user/components/Categories/BabySuits/DesignerBabySuit")
);
const TravelBabySuit = lazy(() =>
  import("./user/components/Categories/BabySuits/TravelBabySuit")
);
const SmartCasualBabySuit = lazy(() =>
  import("./user/components/Categories/BabySuits/SmartCasualBabySuit")
);

const TuxedoCollection = lazy(() =>
  import("./user/components/Collections/TuxedoPage")
);
const ExtremePoppinsCollection = lazy(() =>
  import("./user/components/Collections/ExtremePoppins")
);
const GurkhaTrouserCollection = lazy(() =>
  import("./user/components/Collections/GurkhaTrouserPage")
);
const LinenCollection = lazy(() =>
  import("./user/components/Collections/LinenPage")
);
const CigaretteCollection = lazy(() =>
  import("./user/components/Collections/88CigaretPage")
);
const CollectionProductPage = lazy(() =>
  import("./user/components/Collections/ProductPage")
);

const ServicePage = lazy(() =>
  import("./user/components/Services/ServicePages.jsx")
);
const AboutUs = lazy(() => import("./user/pages/AboutUs"));
const AboutUsFull = lazy(() => import("./user/pages/AboutUsFull"));

const RouteFallback = () => (
  <div className="route-loading" role="status" aria-live="polite">
    Loading...
  </div>
);

function AppRoutes({ splashDismissed, onSplashComplete }) {
  const location = useLocation();
  const isRoot = location.pathname === "/";
  const roleCode = localStorage.getItem("hc_role") || "";
  const isLoggedIn = !!(localStorage.getItem("hc_token") || localStorage.getItem("hc_session"));
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!splashDismissed || isLoggedIn) return;

    let scrolled = false;
    let timerDone = false;
    let timer;

    const tryShow = () => {
      if (scrolled && timerDone) setShowLoginPopup(true);
    };

    const onScroll = () => {
      if (!scrolled) {
        scrolled = true;
        tryShow();
      }
    };

    timer = setTimeout(() => {
      timerDone = true;
      tryShow();
    }, 30000);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [splashDismissed, isLoggedIn]);

  // Hide popup when user navigates to /login
  useEffect(() => {
    if (location.pathname === "/login") {
      setShowLoginPopup(false);
    }
  }, [location.pathname]);

  if (isRoot && !splashDismissed) {
    return <SplashScreen onComplete={onSplashComplete} />;
  }

  // Redirect admin to /admin when landing on /
  if (isRoot && roleCode === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      {showLoginPopup && (
        <LoginPopup
          onSkip={() => setShowLoginPopup(false)}
          onLogin={() => setShowLoginPopup(false)}
        />
      )}
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="appointments" element={<AdminAppointmentsPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="subcategories" element={<AdminSubCategoriesPage />} />
          <Route path="faqs" element={<AdminFaqsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="support-contacts" element={<AdminSupportContactsPage />} />
          <Route path="legal-pages" element={<AdminLegalPagesPage />} />
          <Route path="spotlight-media" element={<AdminSpotlightMediaPage />} />
          <Route path=":moduleKey" element={<AdminCrudPage />} />
        </Route>

        {/* USER PAGES */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/product/:id" element={<ProductPage />} />

          {/* CATEGORY PAGES */}
          <Route path="/babysuits" element={<BabySuitsCategoryPage />} />
          <Route path="/suits" element={<SuitsCategoryPage />} />
          <Route path="/indowestern" element={<IndoWesternCategoryPage />} />
          <Route path="/shirts" element={<ShirtsCategoryPage />} />
          <Route path="/trousers" element={<TrousersCategoryPage />} />

          {/* SUITS COLLECTION */}
          <Route path="/collection/wedding" element={<Wedding />} />
          <Route path="/collection/business" element={<Business />} />
          <Route path="/collection/designer" element={<Designer />} />
          <Route path="/collection/travel" element={<Travel />} />
          <Route path="/collection/smart-casual" element={<SmartCasual />} />

          {/* BABY SUITS COLLECTION */}
          <Route path="/collection/wedding-baby" element={<WeddingBabySuit />} />
          <Route path="/collection/business-baby" element={<BusinessBabySuit />} />
          <Route path="/collection/designer-baby" element={<DesignerBabySuit />} />
          <Route path="/collection/travel-baby" element={<TravelBabySuit />} />
          <Route path="/collection/casual-baby" element={<SmartCasualBabySuit />} />

          {/* INDOWESTERN COLLECTION */}
          <Route path="/collection/indo-wedding" element={<WeddingIndoWestern />} />
          <Route path="/collection/indo-business" element={<BusinessIndoWestern />} />
          <Route path="/collection/indo-designer" element={<DesignerIndoWestern />} />
          <Route path="/collection/indo-travel" element={<TravelIndoWestern />} />
          <Route path="/collection/indo-casual" element={<SmartCasualIndoWestern />} />

          {/* SHIRTS COLLECTION */}
          <Route path="/collection/wedding-shirts" element={<WeddingShirt />} />
          <Route path="/collection/business-shirts" element={<BusinessShirt />} />
          <Route path="/collection/designer-shirts" element={<DesignerShirt />} />
          <Route path="/collection/travel-shirts" element={<TravelShirt />} />
          <Route path="/collection/casual-shirts" element={<SmartCasualShirt />} />

          {/* TROUSERS COLLECTION */}
          <Route path="/collection/wedding-trouser" element={<WeddingTrouser />} />
          <Route path="/collection/business-trouser" element={<BusinessTrouser />} />
          <Route path="/collection/designer-trouser" element={<DesignerTrouser />} />
          <Route path="/collection/travel-trouser" element={<TravelTrouser />} />
          <Route path="/collection/smart-casual-trouser" element={<SmartCasualTrouser />} />

          <Route path="/tuxedo" element={<ComingSoonPage title="Tuxedo Collection" />} />
          <Route
            path="/extreme-poppins"
            element={<ComingSoonPage title="Extreme Poppins Collection" />}
          />
          <Route
            path="/gurkha-trousers"
            element={<ComingSoonPage title="Gurkha Trousers Collection" />}
          />
          <Route
            path="/linen-shirts-trousers"
            element={<ComingSoonPage title="Linen Collection" />}
          />
          <Route path="/cigarettes" element={<ComingSoonPage title="88 Cigarette Collection" />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />

          <Route path="/services" element={<ServicePage />} />
          <Route path="/embroidery" element={<EmbroideryPage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/about-designer" element={<AboutUsFull />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/Policies" element={<Policies />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/hc-spotlight" element={<HCSpotlightPage />} />
          <Route path="/the-vision" element={<TheVisionPage />} />
          <Route path="/style-by-hc" element={<StyleByHCPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Suspense>
    </>
  );
}

function App() {
  const [splashDismissed, setSplashDismissed] = useState(false);

  return (
    <CartProvider>
      <HashRouter>
        <AppRoutes
          splashDismissed={splashDismissed}
          onSplashComplete={() => setSplashDismissed(true)}
        />
      </HashRouter>
    </CartProvider>
  );
}

export default App;
