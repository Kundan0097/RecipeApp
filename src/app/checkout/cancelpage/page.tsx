
 import Link from 'next/link';
import { HiXCircle } from 'react-icons/hi';

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-white px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md text-center space-y-6">
        <HiXCircle className="text-red-500 mx-auto w-16 h-16" />
        <h1 className="text-3xl font-bold text-gray-800">Payment Canceled! ❌</h1>
        <p className="text-gray-600">
          Your payment was not completed. Please try again or contact support if you continue to experience issues.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/checkout"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full transition duration-300"
          >
            Retry Payment
          </Link>
          {/* <Link
            href="/support"
            className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-full transition duration-300"
          >
            Contact Support
          </Link> */}
        </div>
      </div>
    </div>
  );
}
