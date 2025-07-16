import dynamic from "next/dynamic";
import Head from "next/head";

const NewProducts = dynamic(() => import("../components/NewProducts"));
const StyleBanner = dynamic(() => import("../components/StyleBanner"));
const BrandStatement = dynamic(() => import("../components/BrandStatement"));
const WeeklyDrop = dynamic(() => import("../components/WeeklyDrop"));
const Carousel = dynamic(() => import('../components/ReelsShowcase'), { ssr: false }); // fixed ✅
const WhyUs = dynamic(() => import("../components/WhyUs"));
const Newsletter = dynamic(() => import("../components/Newsletter"));
import HomeHeroSkeleton from "../components/skeletons/HomeHeroSkeleton";


const HomeHero = dynamic(() => import("../components/HomeHero"), {
  ssr: true,
  loading: () => <HomeHeroSkeleton />,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Last Man On Earth | Clothing</title>
        <meta name="description" content="Premium streetwear. Oversized fits, bold designs." />
      </Head>

      <HomeHero />
      <NewProducts />
      <StyleBanner />
      <BrandStatement />
      <WeeklyDrop />
      <Carousel />
      <WhyUs />
      <Newsletter />
    </>
  );
}
