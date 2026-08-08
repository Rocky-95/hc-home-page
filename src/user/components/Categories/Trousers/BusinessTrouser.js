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
  { id: "charcoal-business-trouser", name: "Charcoal Business Trouser", image: TheRoyalWeddingEdit, description: "A classic charcoal trouser tailored for a sharp and professional business look." },
  { id: "navy-formal-trouser", name: "Navy Formal Trouser", video: TheChurchAffair, description: "A refined navy trouser designed for modern office wear and corporate meetings." },
  { id: "black-executive-trouser", name: "Black Executive Trouser", image: TheDestinationDream, description: "A sleek black trouser crafted for a bold and confident professional appearance." },
  { id: "beige-office-trouser", name: "Beige Office Trouser", image: TheRoyalWeddingEdit, description: "A soft beige trouser offering comfort and elegance for everyday office wear." },
  { id: "pinstripe-business-trouser", name: "Pinstripe Business Trouser", video: TheChurchAffair, description: "A stylish pinstripe trouser adding a modern edge to classic business attire." },
  { id: "light-blue-formal-trouser", name: "Light Blue Formal Trouser", image: TheSangeetSoiree, description: "A fresh light blue trouser designed for a smart and approachable office look." },
  { id: "brown-corporate-trouser", name: "Brown Corporate Trouser", image: TheRoyalWeddingEdit, description: "A rich brown trouser crafted for a warm and sophisticated business style." },
  { id: "checkered-office-trouser", name: "Checkered Office Trouser", video: TheChurchAffair, description: "A check-pattern trouser combining comfort with a stylish corporate vibe." },
  { id: "grey-slim-fit-trouser", name: "Grey Slim Fit Trouser", image: TheDestinationDream, description: "A modern grey slim-fit trouser tailored for a sharp and professional finish." },
];

const BusinessTrouser = () => (
  <SubcategoryPage
    slug="trousers-business"
    heroVideo={weddingVideo}
    heroTitle="Business Trousers"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Business Trousers"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Business Trousers Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Business Trousers Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["trouser", "business", "office", "corporate"]}
    productGridKeyword=""
  />
);

export default BusinessTrouser;
