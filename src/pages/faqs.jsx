const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Orders are typically delivered within 5–7 business days.",
  },
  {
    question: "Can I return a product?",
    answer: "Yes, you can return any item within 7 days of delivery if it's unworn and tagged.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3 className="text-xl font-semibold">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
