import React from "react";
import Header from "../components/Header";
import VideoImageSlider from "../components/VideoImageSlider";
import RunningBar from "../components/RunningBar"; // Assuming you have a RunningBar component
import OfferBar from "../components/OfferBar";
import FullWidthVideo from "../components/FullWidthVideo"; // Assuming you have a FullWidthVideo component
import HomeFaqs from "../components/HomeFaqs";
import HomeFooter from "../components/HomeFooter";
import CIconModal from "../components/CIconModal";
import Spotlight from "../components/Spotlight";
import StylyByHC from "../components/StyleByHC";
const Home = () => {
  return (
    <>
      <RunningBar/>
      <Header />
      <VideoImageSlider />
      <OfferBar />
      <FullWidthVideo />
      
      <Spotlight />
      <StylyByHC/>
      <HomeFaqs /> 
      <HomeFooter />
       <CIconModal /> 
    </>
  );
};

export default Home;
