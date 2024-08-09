import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

// components
import Banner from '../../../components/landingpage/banner/Banner';
import Features from '../../../components/landingpage/features/Features';
import Footer from '../../../components/landingpage/footer/Footer';
import LpHeader from '../../../components/landingpage/header/Header';
import Testimonial from '../../../components/landingpage/testimonial/Testimonial';

const Landingpage = () => {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <LpHeader />
      <Banner />
      {/* <DemoSlider /> */}
      {/* <Frameworks /> */}
      <Testimonial />
      <Features />
      {/* <C2a />
      <C2a2 /> */}
      <Footer />
    </PageContainer>
  );
};

export default Landingpage;
