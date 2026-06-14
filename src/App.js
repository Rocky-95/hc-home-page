import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./user/pages/Home";

const Login = lazy(() => import("./user/pages/Login"));
const Register = lazy(() => import("./user/pages/Register"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
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

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="/suits" element={<SuitsCategoryPage />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/business" element={<Business />} />
          <Route path="/designer" element={<Designer />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/smart-casual" element={<SmartCasual />} />

          <Route path="/indo-western" element={<IndoWesternCategoryPage />} />
          <Route path="/indowestern/wedding" element={<WeddingIndoWestern />} />
          <Route path="/indowestern/business" element={<BusinessIndoWestern />} />
          <Route path="/indowestern/designer" element={<DesignerIndoWestern />} />
          <Route path="/indowestern/travel" element={<TravelIndoWestern />} />
          <Route
            path="/indowestern/smart-casual"
            element={<SmartCasualIndoWestern />}
          />

          <Route path="/shirts" element={<ShirtsCategoryPage />} />
          <Route path="/shirts/wedding" element={<WeddingShirt />} />
          <Route path="/shirts/business" element={<BusinessShirt />} />
          <Route path="/shirts/designer" element={<DesignerShirt />} />
          <Route path="/shirts/travel" element={<TravelShirt />} />
          <Route path="/shirts/smart-casual" element={<SmartCasualShirt />} />

          <Route path="/trousers" element={<TrousersCategoryPage />} />
          <Route path="/trousers/wedding" element={<WeddingTrouser />} />
          <Route path="/trousers/business" element={<BusinessTrouser />} />
          <Route path="/trousers/designer" element={<DesignerTrouser />} />
          <Route path="/trousers/travel" element={<TravelTrouser />} />
          <Route
            path="/trousers/smart-casual"
            element={<SmartCasualTrouser />}
          />

          <Route path="/baby-suits" element={<BabySuitsCategoryPage />} />
          <Route path="/baby-suits/wedding" element={<WeddingBabySuit />} />
          <Route path="/baby-suits/business" element={<BusinessBabySuit />} />
          <Route path="/baby-suits/designer" element={<DesignerBabySuit />} />
          <Route path="/baby-suits/travel" element={<TravelBabySuit />} />
          <Route
            path="/baby-suits/smart-casual"
            element={<SmartCasualBabySuit />}
          />

          <Route path="/services" element={<ServicePage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/about-designer" element={<AboutUsFull />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
