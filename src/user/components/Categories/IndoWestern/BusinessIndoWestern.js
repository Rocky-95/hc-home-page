import React from "react";
import SubcategoryPage from "../../SubcategoryPage";
import weddingVideo from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4";
import leftImg from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import centerVideo from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4";
import rightImg from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg";
import sliderImg1 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import sliderImg2 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg";
import sliderImg3 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import LabelVideo from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4";
import LabelImage from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import TheChurchAffair from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4";
import TheRoyalWeddingEdit from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg";
import TheDestinationDream from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import TheSangeetSoiree from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg";

const fallbackCategories = [
  { id: "indo-executive-fusion-set", name: "Indo Executive Fusion Set", image: TheRoyalWeddingEdit, description: "A refined Indo-Western outfit blending traditional elegance with modern business style." },
  { id: "indo-navy-office-style", name: "Indo Navy Office Style", video: TheChurchAffair, description: "A sharp navy Indo-Western outfit perfect for professional and corporate settings." },
  { id: "indo-black-formal-edit", name: "Indo Black Formal Edit", image: TheDestinationDream, description: "A sleek black Indo-Western ensemble crafted for a bold and confident office look." },
  { id: "indo-beige-smart-set", name: "Indo Beige Smart Set", image: TheRoyalWeddingEdit, description: "A soft beige Indo-Western outfit offering a clean and polished business appearance." },
  { id: "indo-striped-office-style", name: "Indo Striped Office Style", video: TheChurchAffair, description: "A stylish striped Indo-Western outfit bringing a modern twist to business wear." },
  { id: "indo-blue-professional-look", name: "Indo Blue Professional Look", image: TheSangeetSoiree, description: "A fresh blue Indo-Western outfit designed for confident and professional settings." },
  { id: "indo-brown-corporate-set", name: "Indo Brown Corporate Set", image: TheRoyalWeddingEdit, description: "A rich brown Indo-Western outfit crafted for a warm and sophisticated business look." },
  { id: "indo-check-formal-style", name: "Indo Check Formal Style", video: TheChurchAffair, description: "A stylish check-pattern Indo-Western outfit ideal for modern corporate fashion." },
  { id: "indo-grey-executive-fit", name: "Indo Grey Executive Fit", image: TheDestinationDream, description: "A modern grey Indo-Western outfit combining elegance with a sharp executive style." },
];

const BusinessIndoWestern = () => (
  <SubcategoryPage
    slug="indowestern-business"
    heroVideo={weddingVideo}
    heroTitle="Business Indo Western"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Business Indo Western"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Business Indo Western Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Business Indo Western Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["indowestern", "indo-western", "business", "office", "corporate", "executive"]}
    productGridKeyword=""
  />
);

export default BusinessIndoWestern;
