import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';


// apiVersion: '2023-10-16',

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});


export async function POST(req: NextRequest) {
  const { paymentMethodId, email, fullName ,planType } = await req.json();

  const priceIdMap: Record<string, string> = {
    monthly: process.env.MONTHLY_PRICE!, 
    yearly: process.env.YEARLY_PRICE!,   
  };
  const selectedPriceId = priceIdMap[planType];
  
  if (!selectedPriceId) {
    return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
  }

  try {


    // 1. Create a new customer
    const customer = await stripe.customers.create({
      email,
      name: fullName,
      payment_method: paymentMethodId,
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    console.log('Customer created:', customer);

    // 2. Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: selectedPriceId }], 
      expand: ['latest_invoice'],
    });

    console.log('Subscription created:', subscription);

    return NextResponse.json({ subscription });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 400 });
  }
}