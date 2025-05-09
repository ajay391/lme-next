import AnimatedButton from "@/components/AnimatedButton";

export default function HomeHero() {
  return (
    <section
      className="flex items-end justify-start bg-cover bg-center py-24 px-10 min-h-[80vh]"
      style={{ backgroundImage: "url('/images/home/hero-1.jpg')" }} // Make sure you have this image
    >
      <div className="max-w-7xl w-full text-start text-white">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight">
          Elevate Your Everyday Look
        </h1>

        <p className="text-base sm:text-base mb-8 max-w-xl text-white opacity-60">
          Discover our latest collection of oversized fits and minimal designs that speak your style.
        </p>


        <AnimatedButton text="Shop Now" color = "#ef4444" spanBg="#ffffff" url="/shop" />
        


      </div>
    </section>
  );
}
