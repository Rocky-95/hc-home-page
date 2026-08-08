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
  { id: "royal-wedding-formal-trouser", name: "The Royal Wedding Edit", image: TheRoyalWeddingEdit, description: "Luxurious black velvet tuxedo with golden embroidery." },
  { id: "navy-wedding-elegance-trouser", name: "The Church Affair", video: TheChurchAffair, description: "Elegant wedding suit perfect for church events." },
  { id: "black-wedding-signature-trouser", name: "The Destination Dream", image: TheDestinationDream, description: "Perfect suit for destination weddings." },
  { id: "beige-wedding-luxe-trouser", name: "The Reception Night", image: TheRoyalWeddingEdit, description: "Perfect for evening receptions." },
  { id: "striped-wedding-style-trouser", name: "The Engagement Chapter", video: TheChurchAffair, description: "Stand out at engagement ceremonies." },
  { id: "blue-wedding-festive-trouser", name: "The Sangeet Soiree", image: TheSangeetSoiree, description: "Bright and festive for sangeet nights." },
  { id: "brown-wedding-premium-trouser", name: "The Mehendi & Haldi Mood", image: TheRoyalWeddingEdit, description: "Vibrant suits for mehendi & haldi events." },
  { id: "check-wedding-designer-trouser", name: "The Intimate Wedding Edit", video: TheChurchAffair, description: "Perfect for small and intimate weddings." },
  { id: "grey-wedding-modern-trouser", name: "The Modern Minimalist", image: TheDestinationDream, description: "Minimalist style for modern weddings." },
];

const WeddingTrouser = () => (
  <SubcategoryPage
    slug="trousers-wedding"
    heroVideo={weddingVideo}
    heroTitle="Wedding Trousers"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Wedding Trousers"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Wedding Trousers Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Wedding Trousers Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["trouser", "wedding"]}
    productGridKeyword=""
  />
);

export default WeddingTrouser;
