import dynamic from "next/dynamic";
import Head from "next/head";
import HomeHeroSkeleton from "../components/skeletons/HomeHeroSkeleton";

const HomeHero = dynamic(() => import("../components/HomeHero"), {
  ssr: true,
  loading: () => <HomeHeroSkeleton />,
});
const NewProducts = dynamic(() => import("../components/NewProducts"), { ssr: false });
const StyleBanner = dynamic(() => import("../components/StyleBanner"), { ssr: false });
const BrandStatement = dynamic(() => import("../components/BrandStatement"), { ssr: false });
const WeeklyDrop = dynamic(() => import("../components/WeeklyDrop"), { ssr: false });
const DropCalendar = dynamic(() => import("../components/DropCalendar"), { ssr: false });
const ScrollSequence = dynamic(() => import("../components/ScrollSequence"), { ssr: false });
const WhyUs = dynamic(() => import("../components/WhyUs"), { ssr: false });
const Newsletter = dynamic(() => import("../components/Newsletter"), { ssr: false });

export default function Home() {
  return (
    <main className="bg-white min-h-screen text-black selection:bg-red-600 selection:text-white">
      <Head>
        <title>Last Man On Earth | Post-Apocalyptic Streetwear</title>
        <meta
          name="description"
          content="Premium post-apocalyptic streetwear. Oversized fits, heavyweight cotton, and motorsport-inspired graphics."
        />
      </Head>

      <HomeHero />
      <NewProducts />
      <StyleBanner />
      <BrandStatement />
      <WeeklyDrop />
      <DropCalendar />
      <ScrollSequence />
      <WhyUs />
      <Newsletter />
    </main>
  );
}
