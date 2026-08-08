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
  { id: "baby-royal-wedding-set", name: "Baby Royal Wedding Set", image: TheRoyalWeddingEdit, description: "A luxurious royal outfit designed to make your baby shine at wedding ceremonies." },
  { id: "baby-navy-wedding-style", name: "Baby Navy Wedding Style", video: TheChurchAffair, description: "An elegant navy suit perfect for wedding functions and formal gatherings." },
  { id: "baby-black-wedding-edition", name: "Baby Black Wedding Edition", image: TheDestinationDream, description: "A stylish black outfit crafted for a bold and classy wedding look." },
  { id: "baby-beige-wedding-luxe", name: "Baby Beige Wedding Luxe", image: TheRoyalWeddingEdit, description: "A soft beige wedding outfit offering elegance and comfort for special moments." },
  { id: "baby-striped-wedding-style", name: "Baby Striped Wedding Style", video: TheChurchAffair, description: "A trendy striped outfit adding a playful touch to wedding celebrations." },
  { id: "baby-blue-wedding-look", name: "Baby Blue Wedding Look", image: TheSangeetSoiree, description: "A bright blue outfit designed for cheerful and stylish wedding appearances." },
  { id: "baby-brown-wedding-premium", name: "Baby Brown Wedding Premium", image: TheRoyalWeddingEdit, description: "A rich brown outfit perfect for a warm and elegant wedding vibe." },
  { id: "baby-check-wedding-style", name: "Baby Check Wedding Style", video: TheChurchAffair, description: "A stylish check-pattern outfit that enhances your baby's wedding look." },
  { id: "baby-grey-wedding-signature", name: "Baby Grey Wedding Signature", image: TheDestinationDream, description: "A modern grey outfit combining elegance and charm for wedding occasions." },
];

const WeddingBabySuit = () => (
  <SubcategoryPage
    slug="babysuits-wedding"
    heroVideo={weddingVideo}
    heroTitle="Wedding & Ring Bearer Suits"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Wedding & Ring Bearer Suits"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Wedding & Ring Bearer Suits Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Wedding & Ring Bearer Suits Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["baby", "wedding"]}
    productGridKeyword=""
  />
);

export default WeddingBabySuit;
