import Head from "next/head";

export default function SupportPage() {
  return (
    <>
    <Head>
      <title> Support | Last Man On Earth </title>
      <meta name="description" content="Premium streetwear. Oversized fits, bold designs." />
    </Head>
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 uppercase">Customer Support</h1>
      <p className="mb-4 text-gray-600">Need help with an order, refund, or issue? Please submit your support request below.</p>

      <form className="space-y-4">
        <input type="text" placeholder="Order ID (if any)" className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
        <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-1 focus:ring-red-500" required />
        <select className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-1 focus:ring-red-500">
          <option value="">Select Issue</option>
          <option value="order">Order Issue</option>
          <option value="return">Return / Refund</option>
          <option value="technical">Technical Problem</option>
        </select>
        <textarea placeholder="Describe your issue" rows={5} className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-1 focus:ring-red-500" required></textarea>
        <button type="submit" className="bg-red-500 text-white px-6 py-3 rounded-sm hover:bg-black">Submit Request</button>
      </form>
    </div>
    </>
  );
}
