export default function HomeHeroSkeleton() {
  return (
    <section className="relative min-h-[80vh] w-full animate-pulse">
      <div className="absolute inset-0 bg-gray-200" />

      {/* Overlay text and button placeholder */}
      <div className="absolute inset-0 z-10 flex text-center sm:text-start items-center justify-start px-12 sm:px-12 lg:px-24 text-white">
        <div className="max-w-7xl">
          <div className="h-12 sm:h-16 md:h-20 lg:h-24 w-3/4 bg-gray-300 rounded mb-6" />
          <div className="h-4 sm:h-5 w-2/3 bg-gray-300 rounded mb-8 opacity-80" />
          <div className="h-10 w-40 bg-gray-300 rounded" />
        </div>
      </div>
    </section>
  );
}
