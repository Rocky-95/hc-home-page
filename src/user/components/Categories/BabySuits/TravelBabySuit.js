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
  { id: "baby-travel-comfort-set", name: "Baby Travel Comfort Set", image: TheRoyalWeddingEdit, description: "A soft and breathable outfit designed to keep your baby comfortable during long journeys." },
  { id: "baby-navy-travel-style", name: "Baby Navy Travel Style", video: TheChurchAffair, description: "A relaxed navy outfit perfect for travel days with a mix of style and ease." },
  { id: "baby-black-travel-fit", name: "Baby Black Travel Fit", image: TheDestinationDream, description: "A sleek black travel outfit designed for a clean and fuss-free look on the go." },
  { id: "baby-beige-travel-wear", name: "Baby Beige Travel Wear", image: TheRoyalWeddingEdit, description: "A light beige outfit offering comfort and flexibility for travel and outdoor trips." },
  { id: "baby-striped-travel-set", name: "Baby Striped Travel Set", video: TheChurchAffair, description: "A playful striped outfit that keeps your baby stylish and comfortable while traveling." },
  { id: "baby-blue-travel-look", name: "Baby Blue Travel Look", image: TheSangeetSoiree, description: "A fresh blue outfit designed for active and cheerful travel moments." },
  { id: "baby-brown-travel-comfort", name: "Baby Brown Travel Comfort", image: TheRoyalWeddingEdit, description: "A cozy brown outfit perfect for relaxed travel and long journeys." },
  { id: "baby-check-travel-style", name: "Baby Check Travel Style", video: TheChurchAffair, description: "A stylish check-pattern outfit that adds charm to your baby's travel wardrobe." },
  { id: "baby-grey-travel-fit", name: "Baby Grey Travel Fit", image: TheDestinationDream, description: "A modern grey outfit designed for comfort, mobility, and smart travel style." },
];

const TravelBabySuit = () => (
  <SubcategoryPage
    slug="babysuits-travel"
    heroVideo={weddingVideo}
    heroTitle="Travel Baby Suits"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Travel Baby Suits"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Travel Baby Suits Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Travel Baby Suits Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["baby", "travel"]}
    productGridKeyword=""
  />
);

export default TravelBabySuit;
