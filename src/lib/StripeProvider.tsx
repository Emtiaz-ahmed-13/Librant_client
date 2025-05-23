import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

// Replace with your Stripe publishable key from your Stripe dashboard
const stripePromise = loadStripe("pk_test_YOUR_PUBLISHABLE_KEY");

export const StripeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
