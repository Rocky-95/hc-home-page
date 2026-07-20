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
  { id: "luxury-embroidered-designer-trouser", name: "Luxury Embroidered Designer Trouser", image: TheRoyalWeddingEdit, description: "A premium designer trouser featuring intricate detailing for a bold and luxurious statement." },
  { id: "navy-designer-premium-trouser", name: "Navy Designer Premium Trouser", video: TheChurchAffair, description: "A refined navy designer trouser crafted with premium fabric and modern tailoring." },
  { id: "black-designer-signature-trouser", name: "Black Designer Signature Trouser", image: TheDestinationDream, description: "A sleek black designer trouser built for a bold and signature fashion statement." },
  { id: "beige-designer-elegance-trouser", name: "Beige Designer Elegance Trouser", image: TheRoyalWeddingEdit, description: "A soft beige designer trouser offering elegance with a minimal luxury touch." },
  { id: "striped-designer-style-trouser", name: "Striped Designer Style Trouser", video: TheChurchAffair, description: "A stylish striped designer trouser that blends trend with high-end fashion." },
  { id: "blue-designer-modern-trouser", name: "Blue Designer Modern Trouser", image: TheSangeetSoiree, description: "A vibrant blue designer trouser crafted for a fresh and modern designer look." },
  { id: "brown-designer-premium-trouser", name: "Brown Designer Premium Trouser", image: TheRoyalWeddingEdit, description: "A rich brown designer trouser designed for a warm and premium appearance." },
  { id: "check-designer-fashion-trouser", name: "Check Designer Fashion Trouser", video: TheChurchAffair, description: "A check-pattern designer trouser that adds a fashionable and trendy edge." },
  { id: "grey-designer-slim-trouser", name: "Grey Designer Slim Trouser", image: TheDestinationDream, description: "A sleek grey designer trouser with a slim fit for a sharp and modern silhouette." },
];

const DesignerTrouser = () => (
  <SubcategoryPage
    slug="trousers-designer"
    heroVideo={weddingVideo}
    heroTitle="Velvet Royal Series"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Pick your Handcrafted elegance for unforgettable moments."]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="Regal Black & Gold Hand-Embroidered Tuxedo"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Wedding Suit Collection – Luxury Hand Embroidered"
    fallbackCategories={fallbackCategories}
    productKeywords={["trouser", "designer"]}
    productGridKeyword=""
  />
);

export default DesignerTrouser;
