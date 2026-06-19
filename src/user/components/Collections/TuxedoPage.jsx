import React from "react";
import CollectionPage from "./CollectionPage";
import bannerImage from "../../../shared/assets/images/WeddingSuitProductImages/Sangeet/SangeetCream.jpg";

const TuxedoPage = () => (
  <CollectionPage
    category="tuxedo"
    title="Tuxedo"
    eyebrow="Evening refinement"
    description="Precision tailoring and expressive details for black-tie evenings, receptions, and landmark celebrations."
    bannerImage={bannerImage}
  />
);

export default TuxedoPage;
