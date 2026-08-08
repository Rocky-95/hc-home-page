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
  { id: "indo-royal-wedding-set", name: "Indo Royal Wedding Set", image: TheRoyalWeddingEdit, description: "A luxurious Indo-Western outfit crafted to give a royal and grand wedding appearance." },
  { id: "indo-navy-wedding-style", name: "Indo Navy Wedding Style", video: TheChurchAffair, description: "An elegant navy Indo-Western outfit perfect for wedding ceremonies and formal events." },
  { id: "indo-black-wedding-edition", name: "Indo Black Wedding Edition", image: TheDestinationDream, description: "A bold black Indo-Western ensemble designed for a classy and striking wedding look." },
  { id: "indo-beige-wedding-luxe", name: "Indo Beige Wedding Luxe", image: TheRoyalWeddingEdit, description: "A soft beige Indo-Western outfit offering elegance and sophistication for wedding occasions." },
  { id: "indo-striped-wedding-style", name: "Indo Striped Wedding Style", video: TheChurchAffair, description: "A stylish striped Indo-Western outfit adding a modern twist to wedding fashion." },
  { id: "indo-blue-wedding-look", name: "Indo Blue Wedding Look", image: TheSangeetSoiree, description: "A vibrant blue Indo-Western outfit perfect for festive wedding celebrations." },
  { id: "indo-brown-wedding-premium", name: "Indo Brown Wedding Premium", image: TheRoyalWeddingEdit, description: "A rich brown Indo-Western outfit crafted for a warm and premium wedding style." },
  { id: "indo-check-wedding-style", name: "Indo Check Wedding Style", video: TheChurchAffair, description: "A stylish check-pattern Indo-Western outfit ideal for a unique wedding look." },
  { id: "indo-grey-wedding-signature", name: "Indo Grey Wedding Signature", image: TheDestinationDream, description: "A modern grey Indo-Western outfit combining elegance and charm for wedding occasions." },
];

const WeddingIndoWestern = () => (
  <SubcategoryPage
    slug="indowestern-wedding"
    heroVideo={weddingVideo}
    heroTitle="Wedding Indo Western"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Wedding Indo Western"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Wedding Indo Western Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Wedding Indo Western Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["indowestern", "indo-western", "wedding", "sangeet", "reception", "engagement"]}
    productGridKeyword=""
  />
);

export default WeddingIndoWestern;
