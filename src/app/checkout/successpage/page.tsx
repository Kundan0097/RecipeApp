

 import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md text-center space-y-6">
        <HiCheckCircle className="text-green-500 mx-auto w-16 h-16" />
        <h1 className="text-3xl font-bold text-gray-800">Payment Successful! 🎉</h1>
        <p className="text-gray-600">
          Thank you for your purchase. We’ve sent you a receipt and will process your order shortly.
        </p>
        <Link
          href="/recipies"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Go to Recipies
        </Link>
      </div>
    </div>
  );
}
