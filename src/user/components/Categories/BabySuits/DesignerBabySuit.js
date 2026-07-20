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
  { id: "designer-baby-royal-set", name: "Designer Baby Royal Set", image: TheRoyalWeddingEdit, description: "Luxurious designer outfit crafted for a royal and elegant baby look." },
  { id: "designer-baby-navy-style", name: "Designer Baby Navy Style", video: TheChurchAffair, description: "A premium navy designer suit blending modern style with comfort." },
  { id: "designer-baby-black-edition", name: "Designer Baby Black Edition", image: TheDestinationDream, description: "A sleek black designer outfit made for a bold and stylish appearance." },
  { id: "designer-baby-beige-luxe", name: "Designer Baby Beige Luxe", image: TheRoyalWeddingEdit, description: "Elegant beige designer wear offering soft tones and premium comfort." },
  { id: "designer-baby-striped-style", name: "Designer Baby Striped Style", video: TheChurchAffair, description: "Trendy striped designer suit adding a playful and stylish touch." },
  { id: "designer-baby-blue-luxe", name: "Designer Baby Blue Luxe", image: TheSangeetSoiree, description: "Bright and modern blue designer outfit perfect for special moments." },
  { id: "designer-baby-brown-premium", name: "Designer Baby Brown Premium", image: TheRoyalWeddingEdit, description: "Rich brown designer suit crafted for a warm and sophisticated look." },
  { id: "designer-baby-check-style", name: "Designer Baby Check Style", video: TheChurchAffair, description: "Stylish check-pattern designer wear for a fashionable baby look." },
  { id: "designer-baby-grey-signature", name: "Designer Baby Grey Signature", image: TheDestinationDream, description: "Signature grey designer suit combining elegance with modern tailoring." },
];

const DesignerBabySuit = () => (
  <SubcategoryPage
    slug="babysuits-designer"
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
    productKeywords={["baby", "designer"]}
    productGridKeyword=""
  />
);

export default DesignerBabySuit;
