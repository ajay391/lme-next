import axios from 'axios';

const PayNowButton = ({ amount }) => {
  const handlePayment = async () => {
    const res = await axios.post('/payments/create-order/', { amount });
    const order = res.data;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Your Brand Name",
      description: "Purchase Items",
      order_id: order.id,
      handler: async function (response) {
        // Send response to backend for verification
        const verifyRes = await axios.post('/payments/verify-payment/', response);
        if (verifyRes.data.success) {
          alert("Payment Successful");
        } else {
          alert("Payment Failed");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "email@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <button onClick={handlePayment} className="bg-red-500 px-6 py-2 text-white rounded">
      Pay ₹{amount}
    </button>
  );
};

export default PayNowButton;
