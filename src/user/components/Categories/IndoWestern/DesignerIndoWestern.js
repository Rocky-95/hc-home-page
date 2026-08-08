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
  { id: "indo-royal-designer-set", name: "Indo Royal Designer Set", image: TheRoyalWeddingEdit, description: "A luxurious designer Indo-Western outfit crafted for a royal and statement look." },
  { id: "indo-navy-designer-style", name: "Indo Navy Designer Style", video: TheChurchAffair, description: "A premium navy designer Indo-Western outfit blending elegance with modern flair." },
  { id: "indo-black-designer-edition", name: "Indo Black Designer Edition", image: TheDestinationDream, description: "A bold black designer Indo-Western ensemble made for a standout appearance." },
  { id: "indo-beige-designer-luxe", name: "Indo Beige Designer Luxe", image: TheRoyalWeddingEdit, description: "A soft beige designer outfit offering refined elegance with a modern touch." },
  { id: "indo-striped-designer-style", name: "Indo Striped Designer Style", video: TheChurchAffair, description: "A stylish striped designer Indo-Western outfit adding a trendy contemporary vibe." },
  { id: "indo-blue-designer-look", name: "Indo Blue Designer Look", image: TheSangeetSoiree, description: "A vibrant blue designer outfit crafted for a fresh and fashionable appearance." },
  { id: "indo-brown-designer-premium", name: "Indo Brown Designer Premium", image: TheRoyalWeddingEdit, description: "A rich brown designer Indo-Western outfit designed for a warm and premium look." },
  { id: "indo-check-designer-style", name: "Indo Check Designer Style", video: TheChurchAffair, description: "A modern check-pattern designer outfit perfect for a stylish and unique look." },
  { id: "indo-grey-designer-signature", name: "Indo Grey Designer Signature", image: TheDestinationDream, description: "A signature grey designer Indo-Western outfit combining elegance with modern tailoring." },
];

const DesignerIndoWestern = () => (
  <SubcategoryPage
    slug="indowestern-designer"
    heroVideo={weddingVideo}
    heroTitle="Designer IW"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Designer IW"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Designer IW Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Designer IW Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["indowestern", "indo-western", "designer"]}
    productGridKeyword=""
  />
);

export default DesignerIndoWestern;
