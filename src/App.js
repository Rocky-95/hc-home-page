import { BrowserRouter, Routes, Route } from "react-router-dom";

// USER
import Home from "./user/pages/Home";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";

// ADMIN
import AdminDashboard from "./admin/pages/AdminDashboard";
//productPage
import ProductPage from "./user/components/Categories/Suits/ProductPage";
//suits category
import SuitsCategoryPage from "./user/components/Categories/Suits/SuitsCategoryPage";
import Wedding from "./user/components/Categories/Suits/Wedding";
import Business from "./user/components/Categories/Suits/Business";
import Designer from "./user/components/Categories/Suits/Designer";
import Travel from "./user/components/Categories/Suits/Travel";
import SmartCasual from "./user/components/Categories/Suits/SmartCasual";
// IndoWestern category
import IndoWesternCategoryPage from "./user/components/Categories/IndoWestern/IndoWesternCategoryPage";
import WeddingIndoWestern from "./user/components/Categories/IndoWestern/WeddingIndoWestern";
import BusinessIndoWestern from "./user/components/Categories/IndoWestern/BusinessIndoWestern";
import DesignerIndoWestern from "./user/components/Categories/IndoWestern/DesignerIndoWestern";
import TravelIndoWestern from "./user/components/Categories/IndoWestern/TravelIndoWestern";
import SmartCasualIndoWestern from "./user/components/Categories/IndoWestern/SmartCasualIndoWestern";
// Shirts category
import ShirtsCategoryPage from "./user/components/Categories/Shirts/ShirtsCategoryPage";
import WeddingShirt from "./user/components/Categories/Shirts/WeddingShirt";
import BusinessShirt from "./user/components/Categories/Shirts/BusinessShirt";
import DesignerShirt from "./user/components/Categories/Shirts/DesignerShirt";
import TravelShirt from "./user/components/Categories/Shirts/TravelShirt";
import SmartCasualShirt from "./user/components/Categories/Shirts/SmartCasualShirt";

// Trousers category
import TrousersCategoryPage from "./user/components/Categories/Trousers/TrousersCategoryPage";
import WeddingTrouser from "./user/components/Categories/Trousers/WeddingTrouser";
import BusinessTrouser from "./user/components/Categories/Trousers/BusinessTrouser";
import DesignerTrouser from "./user/components/Categories/Trousers/DesignerTrouser";
import TravelTrouser from "./user/components/Categories/Trousers/TravelTrouser";
import SmartCasualTrouser from "./user/components/Categories/Trousers/SmartCasualTrouser";
// Baby Suits category
import BabySuitsCategoryPage from "./user/components/Categories/BabySuits/BabySuitsCategoryPage";
import WeddingBabySuit from "./user/components/Categories/BabySuits/WeddingBabySuit";
import BusinessBabySuit from "./user/components/Categories/BabySuits/BusinessBabySuit";
import DesignerBabySuit from "./user/components/Categories/BabySuits/DesignerBabySuit";
import TravelBabySuit from "./user/components/Categories/BabySuits/TravelBabySuit";
import SmartCasualBabySuit from "./user/components/Categories/BabySuits/SmartCasualBabySuit";

//Service page 
import ServicePage from "./user/components/Services/ServicePages.jsx";
// Footer 
import AboutUs from "./user/pages/AboutUs";
import AboutUsFull from "./user/pages/AboutUsFull";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* product page */}
        <Route path="/product/:id" element={<ProductPage />} />
        {/* SUITS CATEGORY ROUTE */}
<Route path="/suits" element={<SuitsCategoryPage />} />
<Route path="/wedding" element={<Wedding />} />
<Route path="/business" element={<Business />} />
<Route path="/designer" element={<Designer />} />
<Route path="/travel" element={<Travel />} />
<Route path="/smart-casual" element={<SmartCasual />} />
{/* IndoWestern */}
<Route path="/indo-western" element={<IndoWesternCategoryPage />} />
<Route path="/indowestern/wedding" element={<WeddingIndoWestern />} />
<Route path="/indowestern/business" element={<BusinessIndoWestern />} />
<Route path="/indowestern/designer" element={<DesignerIndoWestern />} />
<Route path="/indowestern/travel" element={<TravelIndoWestern />} />
<Route path="/indowestern/smart-casual" element={<SmartCasualIndoWestern />} /> 
{/* SHIRTS */}
<Route path="/shirts" element={<ShirtsCategoryPage />} />
<Route path="/shirts/wedding" element={<WeddingShirt />} />
<Route path="/shirts/business" element={<BusinessShirt />} />
<Route path="/shirts/designer" element={<DesignerShirt />} />
<Route path="/shirts/travel" element={<TravelShirt />} />
<Route path="/shirts/smart-casual" element={<SmartCasualShirt />} />

{/* TROUSERS */}
<Route path="/trousers" element={<TrousersCategoryPage />} />
<Route path="/trousers/wedding" element={<WeddingTrouser />} />
<Route path="/trousers/business" element={<BusinessTrouser />} />
<Route path="/trousers/designer" element={<DesignerTrouser />} />
<Route path="/trousers/travel" element={<TravelTrouser />} />
<Route path="/trousers/smart-casual" element={<SmartCasualTrouser />} />

{/* BABY SUITS */}
<Route path="/baby-suits" element={<BabySuitsCategoryPage />} />
<Route path="/baby-suits/wedding" element={<WeddingBabySuit />} />
<Route path="/baby-suits/business" element={<BusinessBabySuit />} />
<Route path="/baby-suits/designer" element={<DesignerBabySuit />} />
<Route path="/baby-suits/travel" element={<TravelBabySuit />} />
<Route path="/baby-suits/smart-casual" element={<SmartCasualBabySuit />} />
{/* SERVICES */}
<Route path="/services" element={<ServicePage />} />  
{/* ABOUT US */}
<Route path="/aboutUs" element={<AboutUs />} />
<Route path="/about-designer" element={<AboutUsFull />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;