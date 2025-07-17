import Head from 'next/head';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Last Man on Earth</title>
        <meta name="description" content="Get in touch with us for support, queries or feedback." />
      </Head>

      <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-4 text-red-500 uppercase">Contact Us</h1>
        <p className="text-gray-600 mb-8">We'd love to hear from you. Please fill out the form below or reach out directly.</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">📧 Email</h2>
              <p className="text-gray-600">lme.india@gmail.com</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700">📞 Phone</h2>
              <p className="text-gray-600">+91-XXXXX - XXXXX</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700">📍 Address</h2>
              <p className="text-gray-600">Kerala,India</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                className="w-full mt-1 border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                className="w-full mt-1 border border-gray-300 rounded-sm px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Your message here..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white font-semibold px-6 py-2 rounded-sm hover:bg-red-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
