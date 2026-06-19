import React from "react";
import CollectionPage from "./CollectionPage";
import bannerImage from "../../../shared/assets/images/88BannerNew.jpeg";

const CigarettePage = () => (
  <CollectionPage
    category="cigarette"
    title="88 Cigarettes"
    eyebrow="The signature line"
    description="A sharp, directional collection built around sleek lines, confident color, and unmistakable evening presence."
    bannerImage={bannerImage}
  />
);

export default CigarettePage;
