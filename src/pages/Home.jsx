import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedDrop from '../components/home/FeaturedDrop';
import BestSellers from '../components/home/BestSellers';
import EditorialLookbook from '../components/home/EditorialLookbook';
import BrandPhilosophy from '../components/home/BrandPhilosophy';
import CountdownRelease from '../components/home/CountdownRelease';
import EmailAccess from '../components/home/EmailAccess';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDrop />
      <BestSellers />
      <EditorialLookbook />
      <BrandPhilosophy />
      <CountdownRelease />
      <EmailAccess />
    </>
  );
}