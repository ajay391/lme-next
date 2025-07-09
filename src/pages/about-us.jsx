import Head from 'next/head';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | Last Man on Earth</title>
        <meta name="description" content="Learn more about YourBrand – our vision, values, and story." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-4xl font-bold text-red-500 mb-6 uppercase">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to <strong className=''>Last Man on Earth</strong>, where style meets comfort and creativity. We’re not just a clothing brand —
          we’re a movement to redefine fashion for the bold and expressive.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-700">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to deliver premium quality apparel that lets you express who you are. Whether it’s oversized T-shirts,
              bold graphic hoodies, or minimal streetwear, we make pieces that empower confidence.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-8">Why Choose Us</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Made with premium materials</li>
              <li>Designed for all-day comfort</li>
              <li>Exclusive, limited-edition drops</li>
              <li>Eco-conscious packaging</li>
            </ul>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative">
            <Image
              src="/images/about-banner.jpg"
              alt="About us"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-md"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Join the Movement</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We believe fashion is more than just clothes — it’s culture, expression, and community. Be part of our story and
            let’s build a bold future together.
          </p>
        </div>
      </div>
    </>
  );
}
