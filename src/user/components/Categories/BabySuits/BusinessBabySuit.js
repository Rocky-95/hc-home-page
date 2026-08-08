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
  { id: "baby-executive-suit", name: "Baby Executive Suit", image: TheRoyalWeddingEdit, description: "Smart and adorable executive-style suit designed for little gentlemen." },
  { id: "baby-navy-blazer-set", name: "Baby Navy Blazer Set", video: TheChurchAffair, description: "Elegant navy blazer set perfect for formal occasions and celebrations." },
  { id: "baby-black-formal-set", name: "Baby Black Formal Set", image: TheDestinationDream, description: "Classic black formal outfit tailored for a charming and stylish look." },
  { id: "baby-beige-smart-set", name: "Baby Beige Smart Set", image: TheRoyalWeddingEdit, description: "Soft beige outfit offering comfort and elegance for special moments." },
  { id: "baby-pinstripe-suit", name: "Baby Pinstripe Suit", video: TheChurchAffair, description: "Trendy pinstripe suit bringing a stylish and playful formal vibe." },
  { id: "baby-light-blue-suit", name: "Baby Light Blue Suit", image: TheSangeetSoiree, description: "Fresh and vibrant light blue suit perfect for cheerful occasions." },
  { id: "baby-brown-casual-set", name: "Baby Brown Casual Set", image: TheRoyalWeddingEdit, description: "Comfortable brown suit designed for a relaxed yet smart appearance." },
  { id: "baby-checkered-suit", name: "Baby Checkered Suit", video: TheChurchAffair, description: "Stylish checkered outfit adding a fun twist to classic formal wear." },
  { id: "baby-grey-slim-fit", name: "Baby Grey Slim Fit Suit", image: TheDestinationDream, description: "Modern slim-fit grey suit crafted for a sharp and adorable look." },
];

const BusinessBabySuit = () => (
  <SubcategoryPage
    slug="babysuits-business"
    heroVideo={weddingVideo}
    heroTitle="Business Baby Suits"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Business Baby Suits"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Business Baby Suits Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Business Baby Suits Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["baby", "business", "formal"]}
    productGridKeyword=""
  />
);

export default BusinessBabySuit;
