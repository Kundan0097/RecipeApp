// components/CheckoutForm.tsx
'use client';

import { useAuth } from '@/app/firebase/AuthContext';
import { db } from '@/app/firebase/firebase';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { collection, getDocs, query, setDoc, where } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutForm() {
   const stripe = useStripe();
   const elements = useElements();
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState('');
   const { user } = useAuth();
   const [plan, setPlan] = useState('monthly');
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return;
      setLoading(true);
      setMessage('');

      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card: cardElement!,
      });

      if (error) {
         setMessage(error.message ?? 'Something went wrong');
         setLoading(false);
         return;
      }

      const res = await fetch('/api/payment', {
         method: 'POST',
         body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            email: user?.email,
            fullName: user?.displayName,
            planType: plan,
         }),
         headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (data.error) {
         setMessage(data.error);
      } else {
         setMessage('Subscription successful!');
      }

      if (res.status === 200) {
         try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
               querySnapshot.forEach(async (doc) => {
                  const userData = doc.data();
                  const userRef = doc.ref;

                  console.log("User info from Firestore:", userData);

                  await setDoc(userRef, {
                     customerId: data?.subscription?.id,
                     customer: data?.subscription?.customer,
                     subscriptionStatus: data?.subscription?.status,
                     planType: plan,
                  }, { merge: true });
               });
               router.push('/checkout/successpage');
            } else {
               console.log("No user found with this UID");
               setMessage("No user found with this UID");
               router.push('/checkout/cancelpage');
            }
         } catch (error) {
            console.error("Error updating Firestore user:", error);
            router.push('/checkout/cancelpage');
         }
         setLoading(false);
      };

   }


   


   return user ? (

      <div className='flex flex-col items-center justify-center h-screen'>
         <h1 className="text-3xl font-bold mb-4">Subscribe to our Plan</h1>
         <form onSubmit={handleSubmit} className="max-w-lg p-4 space-y-4  rounded min-h-96 flex flex-col justify-around bg-white shadow-lg">
            <div className="space-y-1">
               <label className="font-medium block text-black">Choose a Plan</label>
               <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-black"
               >
                  <option value="monthly">Monthly - $10</option>
                  <option value="yearly">Yearly - $100</option>
               </select>
            </div>

            <div className='flex flex-col gap-4 text-black'>
            <div className='p-4 border rounded bg-white shadow'>
               <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
               <CardElement options={{ hidePostalCode: true }} />
            </div>
            <button
               type="submit"
               disabled={!stripe || loading}
               className="bg-blue-600 text-white px-4 w-md py-2 rounded"
            >
               {loading ? 'Processing...' : 'Subscribe'}
            </button>
            {message && <p className="text-red-500">{message}</p>}
            </div>
         </form>

      </div> 

   ) : (  <div className='min-h-screen flex flex-col items-center justify-center gap-3 bg-background text-foreground'>
           <h1>Please Login to Continue</h1>
           <Link href="/login"><button className='bg-black text-white border rounded px-3 py-1'>Login</button></Link>
   </div>)
}
