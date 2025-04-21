// app/subscribe/page.tsx
"use client";
import StripeProvider from '@/components/stripe/StripeProvider';
import CheckoutForm from '@/components/stripe/CheckoutForm';
import { useAuth } from '../firebase/AuthContext';

export default function SubscribePage() {
  const {isSubscribed} = useAuth()

  if(isSubscribed) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl font-bold">You are already subscribed</p>
    </div>
  )
  return (
    <StripeProvider>
      <CheckoutForm />
    </StripeProvider>
  );
}
