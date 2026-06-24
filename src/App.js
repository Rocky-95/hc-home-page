import { lazy, Suspense, useState } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./shared/components/PrivateRoute";
import Home from "./user/pages/Home";
import SplashScreen from "./user/components/SplashScreen";
import AdminLayout from "./admin/components/AdminLayout";
import UserLayout from "./user/components/UserLayout";
import { CartProvider } from "./context/CartContext";

const Login = lazy(() => import("./user/pages/Login"));
const Register = lazy(() => import("./user/pages/Register"));
const ContactUs = lazy(() => import("./user/pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./user/pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./user/pages/TermsAndConditions"));
const FAQs = lazy(() => import("./user/pages/FAQs"));
const Policies = lazy(() => import("./user/pages/Policies"));
const HelpCenter = lazy(() => import("./user/pages/HelpCenter"));
const CartPage = lazy(() => import("./user/pages/CartPage"));
const WishlistPage = lazy(() => import("./user/pages/WishlistPage"));
const CheckoutPage = lazy(() => import("./user/pages/CheckoutPage"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const AdminCrudPage = lazy(() => import("./admin/pages/AdminCrudPage"));
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

  if (isRoot && !splashDismissed) {
    return <SplashScreen onComplete={onSplashComplete} />;
  }

  return (
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
          <Route path=":moduleKey" element={<AdminCrudPage />} />
        </Route>

        {/* USER PAGES */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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

          <Route path="/tuxedo" element={<TuxedoCollection />} />
          <Route
            path="/extreme-poppins"
            element={<ExtremePoppinsCollection />}
          />
          <Route
            path="/gurkha-trousers"
            element={<GurkhaTrouserCollection />}
          />
          <Route
            path="/linen-shirts-trousers"
            element={<LinenCollection />}
          />
          <Route path="/cigarettes" element={<CigaretteCollection />} />
          <Route
            path="/collections/product/:id"
            element={<CollectionProductPage />}
          />

          <Route path="/services" element={<ServicePage />} />
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
        </Route>
      </Routes>
    </Suspense>
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
