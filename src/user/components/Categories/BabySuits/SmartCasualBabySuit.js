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
  { id: "baby-smart-beige-set", name: "Baby Smart Beige Set", image: TheRoyalWeddingEdit, description: "A soft beige smart casual outfit designed for comfort and everyday elegance." },
  { id: "baby-navy-casual-style", name: "Baby Navy Casual Style", video: TheChurchAffair, description: "A relaxed navy outfit combining smart looks with playful comfort." },
  { id: "baby-black-casual-fit", name: "Baby Black Casual Fit", image: TheDestinationDream, description: "A sleek black casual outfit perfect for a neat and modern baby look." },
  { id: "baby-beige-everyday-style", name: "Baby Beige Everyday Style", image: TheRoyalWeddingEdit, description: "Comfortable beige outfit crafted for everyday wear with a stylish touch." },
  { id: "baby-striped-casual-set", name: "Baby Striped Casual Set", video: TheChurchAffair, description: "A playful striped outfit designed for a trendy and cheerful look." },
  { id: "baby-blue-smart-look", name: "Baby Blue Smart Look", image: TheSangeetSoiree, description: "Bright blue casual wear offering a fresh and charming baby style." },
  { id: "baby-brown-comfort-set", name: "Baby Brown Comfort Set", image: TheRoyalWeddingEdit, description: "A cozy brown outfit designed for relaxed and comfortable daily wear." },
  { id: "baby-check-casual-style", name: "Baby Check Casual Style", video: TheChurchAffair, description: "A stylish check-pattern outfit adding fun and charm to casual dressing." },
  { id: "baby-grey-smart-fit", name: "Baby Grey Smart Fit", image: TheDestinationDream, description: "A modern grey casual outfit combining comfort with a smart appearance." },
];

const SmartCasualBabySuit = () => (
  <SubcategoryPage
    slug="babysuits-smart-casual"
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
    productKeywords={["baby", "smart", "casual"]}
    productGridKeyword=""
  />
);

export default SmartCasualBabySuit;
