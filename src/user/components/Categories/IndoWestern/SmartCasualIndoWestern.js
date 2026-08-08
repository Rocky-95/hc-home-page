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
  { id: "indo-smart-casual-set", name: "Indo Smart Casual Set", image: TheRoyalWeddingEdit, description: "A balanced Indo-Western outfit designed for a smart yet relaxed everyday look." },
  { id: "indo-navy-casual-style", name: "Indo Navy Casual Style", video: TheChurchAffair, description: "A refined navy Indo-Western outfit blending casual comfort with a polished appearance." },
  { id: "indo-black-casual-fit", name: "Indo Black Casual Fit", image: TheDestinationDream, description: "A sleek black Indo-Western outfit perfect for a modern and minimal casual style." },
  { id: "indo-beige-casual-set", name: "Indo Beige Casual Set", image: TheRoyalWeddingEdit, description: "A soft beige Indo-Western outfit offering a relaxed and elegant casual vibe." },
  { id: "indo-striped-casual-style", name: "Indo Striped Casual Style", video: TheChurchAffair, description: "A trendy striped Indo-Western outfit bringing a playful and stylish touch to casual wear." },
  { id: "indo-blue-casual-look", name: "Indo Blue Casual Look", image: TheSangeetSoiree, description: "A fresh blue Indo-Western outfit designed for a bright and comfortable casual appearance." },
  { id: "indo-brown-casual-comfort", name: "Indo Brown Casual Comfort", image: TheRoyalWeddingEdit, description: "A cozy brown Indo-Western outfit perfect for relaxed and everyday styling." },
  { id: "indo-check-casual-style", name: "Indo Check Casual Style", video: TheChurchAffair, description: "A stylish check-pattern Indo-Western outfit ideal for a smart casual look." },
  { id: "indo-grey-casual-fit", name: "Indo Grey Casual Fit", image: TheDestinationDream, description: "A modern grey Indo-Western outfit combining comfort with a clean and smart finish." },
];

const SmartCasualIndoWestern = () => (
  <SubcategoryPage
    slug="indowestern-smart-casual"
    heroVideo={weddingVideo}
    heroTitle="Smart Casual Indo Western"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Smart Casual Indo Western"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Smart Casual Indo Western Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Smart Casual Indo Western Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["indowestern", "indo-western", "smart", "casual"]}
    productGridKeyword=""
  />
);

export default SmartCasualIndoWestern;
