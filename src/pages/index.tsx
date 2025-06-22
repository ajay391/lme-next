import Head from "next/head";
import { useState, useEffect } from 'react';
import HomeHero from "@/components/HomeHero";
import { StyleBanner } from "@/components/StyleBanner";
import { NewProducts } from "@/components/NewProducts";
import { BrandStatement } from "@/components/BrandStatement";
import { Testimonials } from "@/components/Testimonials";
import { WhyUs } from "@/components/WhyUs";

import  Carousel  from "@/components/ReelsShowcase"
import WeeklyDrop from "@/components/WeeklyDrop";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>LME | Shop Oversized Tees & Hoodies</title>
      </Head>
      <HomeHero />
      <NewProducts />
      <StyleBanner />
      <BrandStatement />
      <Carousel />
      <WeeklyDrop/>
      {/* <Testimonials /> */}
      <WhyUs />
      <Newsletter/>
    </>
  );
}
