import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, Col, Divider, Form, Input, Row, Select, message } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart, getCart } from "../../Redux/Features/Orders/cartSlice";
import { useCreateOrderMutation } from "../../Redux/Features/Orders/Order.api";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";

interface CheckoutFormValues {
  fullName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
}

// Mock coupon codes
const VALID_COUPONS = {
  WELCOME10: { discount: 0.1, description: "10% off your order" },
  BOOKS20: { discount: 0.2, description: "20% off your order" },
  FREESHIP: { discount: 0.05, description: "Free shipping (5% off)" },
  SUMMER30: { discount: 0.3, description: "30% off summer special" },
};

const StripeCheckout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useAppSelector(getCart);
  const [isLoading, setIsLoading] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [createOrder] = useCreateOrderMutation();

  const [form] = Form.useForm();

  // Card element styles
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handleCouponApply = () => {
    if (!couponCode.trim()) {
      message.warning("Please enter a coupon code");
      return;
    }

    setApplyingCoupon(true);

    // Simulate server validation delay
    setTimeout(() => {
      const couponKey = Object.keys(VALID_COUPONS).find(
        (key) => key.toLowerCase() === couponCode.trim().toUpperCase()
      );

      if (couponKey) {
        // Coupon-specific logic
        if (couponKey === "SUMMER30") {
          // Only allow if cart contains only 'Teaches Chess'
          const eligibleTitle = "Teaches Chess";
          if (
            items.length === 1 &&
            items[0].title &&
            items[0].title.trim().toLowerCase() === eligibleTitle.toLowerCase()
          ) {
            const couponData =
              VALID_COUPONS[couponKey as keyof typeof VALID_COUPONS];
            setAppliedCoupon(couponKey);
            setDiscount(totalAmount * couponData.discount);
            message.success(`Coupon applied: ${couponData.description}`);
          } else {
            setAppliedCoupon(null);
            setDiscount(0);
            message.error(
              `This coupon is only valid for '${eligibleTitle}'. Please add only that book to your cart to use this coupon.`
            );
          }
        } else {
          // Other coupons (if any)
          const couponData =
            VALID_COUPONS[couponKey as keyof typeof VALID_COUPONS];
          setAppliedCoupon(couponKey);
          setDiscount(totalAmount * couponData.discount);
          message.success(`Coupon applied: ${couponData.description}`);
        }
      } else {
        setAppliedCoupon(null);
        setDiscount(0);
        message.error("Invalid coupon code");
      }
      setApplyingCoupon(false);
    }, 800);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setDiscount(0);
    message.info("Coupon removed");
  };

  const handleSubmit = async (values: CheckoutFormValues) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded
      return;
    }

    setCardError(null);
    setIsLoading(true);

    try {
      // Prepare order payload
      const orderPayload = {
        items: items.map((item) => ({
          productId: item.bookId || item.productId,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: values.fullName,
          email: values.email,
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2 || "",
          city: values.city,
          state: values.state,
          country: values.country,
          postalCode: values.postalCode,
          phoneNumber: values.phoneNumber,
        },
        appliedCoupon,
        discount,
      };

      // Call backend to create order
      await createOrder(orderPayload).unwrap();

      // Clear cart
      dispatch(clearCart());

      // Show success message
      message.success("Order placed successfully!");

      // Navigate to confirmation
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error creating order:", error);
      setCardError("An error occurred while processing your order.");
      message.error("Failed to process order.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate final totals
  const subtotal = totalAmount;
  const shipping = 0;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + tax - discount;

  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-green-900 dark:via-slate-900 dark:to-green-950">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <span>🇧🇩</span> Secure Checkout
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Complete your purchase securely with Stripe
        </p>
      </motion.div>
      <div className="mb-6 flex justify-start">
        <Button
          type="default"
          href="/cart"
          className="rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-0 shadow hover:bg-green-200 dark:hover:bg-green-800"
        >
          ← Back to Cart
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="md:col-span-2"
          variants={containerAnimation}
          initial="hidden"
          animate="show"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <motion.h2
              className="text-xl font-semibold text-gray-800 dark:text-white mb-6"
              variants={itemAnimation}
            >
              Billing & Shipping Information
            </motion.h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              name="checkout"
              requiredMark={false}
              initialValues={{
                country: "BD",
                city: "Dhaka",
                postalCode: "1207",
                phoneNumber: "+8801",
              }}
            >
              <motion.div variants={itemAnimation}>
                <Form.Item
                  name="fullName"
                  label={
                    <span>
                      <span className="mr-2">👤</span>Full Name
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter your full name" },
                  ]}
                >
                  <Input
                    placeholder="e.g. এমতিয়াজ আহমেদ"
                    className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                  />
                </Form.Item>
              </motion.div>
              <motion.div variants={itemAnimation}>
                <Form.Item
                  name="email"
                  label={
                    <span>
                      <span className="mr-2">✉️</span>Email
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    placeholder="e.g. example@email.com"
                    className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                  />
                </Form.Item>
              </motion.div>
              <Row gutter={16}>
                <Col span={24}>
                  <motion.div variants={itemAnimation}>
                    <Form.Item
                      name="addressLine1"
                      label={
                        <span>
                          <span className="mr-2">🏠</span>Address Line 1
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter your address",
                        },
                      ]}
                    >
                      <Input
                        placeholder="e.g. BRAC University, 66 Mohakhali, Dhaka"
                        className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                      />
                    </Form.Item>
                  </motion.div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <motion.div variants={itemAnimation}>
                    <Form.Item
                      name="addressLine2"
                      label={
                        <span>
                          <span className="mr-2">🏢</span>Address Line 2
                        </span>
                      }
                    >
                      <Input
                        placeholder="e.g. Flat 4B, 2nd Floor"
                        className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                      />
                    </Form.Item>
                  </motion.div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <motion.div variants={itemAnimation}>
                    <Form.Item
                      name="city"
                      label={
                        <span>
                          <span className="mr-2">🏙️</span>City
                        </span>
                      }
                      rules={[
                        { required: true, message: "Please enter your city" },
                      ]}
                    >
                      <Input
                        placeholder="e.g. ঢাকা (Dhaka)"
                        className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                      />
                    </Form.Item>
                  </motion.div>
                </Col>
                <Col span={12}>
                  <motion.div variants={itemAnimation}>
                    <Form.Item
                      name="state"
                      label={
                        <span>
                          <span className="mr-2">🌐</span>State/Division
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter your division",
                        },
                      ]}
                    >
                      <Input
                        placeholder="e.g. Dhaka"
                        className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                      />
                    </Form.Item>
                  </motion.div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <motion.div variants={itemAnimation}>
                    <Form.Item
                      name="country"
                      label={
                        <span>
                          <span className="mr-2">🌏</span>Country
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please select your country",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select country"
                        options={[
                          { value: "BD", label: "Bangladesh 🇧🇩" },
                          { value: "IN", label: "India 🇮🇳" },
                          { value: "US", label: "United States" },
                          { value: "CA", label: "Canada" },
                          { value: "UK", label: "United Kingdom" },
                          { value: "AU", label: "Australia" },
                        ]}
                        className="dark:bg-slate-700 dark:text-white"
                      />
                    </Form.Item>
                  </motion.div>
                </Col>
                <Col span={12}>
                  <motion.div variants={itemAnimation}>
                    <Form.Item
                      name="postalCode"
                      label={
                        <span>
                          <span className="mr-2">🏷️</span>Postal Code
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter your postal code",
                        },
                      ]}
                    >
                      <Input
                        placeholder="e.g. 1207"
                        className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                      />
                    </Form.Item>
                  </motion.div>
                </Col>
              </Row>
              <motion.div variants={itemAnimation}>
                <Form.Item
                  name="phoneNumber"
                  label={
                    <span>
                      <span className="mr-2">📞</span>Phone Number
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input
                    placeholder="e.g. +8801XXXXXXXXX"
                    className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                  />
                </Form.Item>
              </motion.div>
              <Divider className="dark:border-slate-600" />
              <motion.h2
                className="text-xl font-semibold text-gray-800 dark:text-white mb-6"
                variants={itemAnimation}
              >
                Payment Information
              </motion.h2>
              <motion.div variants={itemAnimation}>
                <Form.Item
                  label={
                    <span>
                      <span className="mr-2">💳</span>Card Number
                    </span>
                  }
                  required
                >
                  <div className="border rounded-md p-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 dark:border-slate-600">
                    <CardNumberElement options={cardElementOptions} />
                  </div>
                </Form.Item>
              </motion.div>
              <Row gutter={16}>
                <Col span={12}>
                  <motion.div variants={itemAnimation}>
                    <Form.Item
                      label={
                        <span>
                          <span className="mr-2">📅</span>Expiration Date
                        </span>
                      }
                      required
                    >
                      <div className="border rounded-md p-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 dark:border-slate-600">
                        <CardExpiryElement options={cardElementOptions} />
                      </div>
                    </Form.Item>
                  </motion.div>
                </Col>
                <Col span={12}>
                  <motion.div variants={itemAnimation}>
                    <Form.Item
                      label={
                        <span>
                          <span className="mr-2">🔒</span>CVC
                        </span>
                      }
                      required
                    >
                      <div className="border rounded-md p-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 dark:border-slate-600">
                        <CardCvcElement options={cardElementOptions} />
                      </div>
                    </Form.Item>
                  </motion.div>
                </Col>
              </Row>
              {cardError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 mb-4"
                >
                  {cardError}
                </motion.div>
              )}
              <motion.div variants={itemAnimation} className="mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  className="h-12 bg-gradient-to-r from-green-600 to-green-500 border-0 font-bold text-lg shadow-lg hover:from-green-700 hover:to-green-600"
                  loading={isLoading}
                >
                  {`Pay ৳${finalTotal.toFixed(2)}`}
                </Button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                  Your payment information is securely processed by Stripe
                </p>
              </motion.div>
            </Form>
          </div>
        </motion.div>
        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-3 border-b dark:border-gray-700"
                >
                  <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {item.title}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Qty: {item.quantity}</span>
                      <span>৳{item.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Coupon Code Section */}
            <div className="mb-4 pb-4 border-b dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Apply Coupon
              </p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={!!appliedCoupon}
                  className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                />
                {appliedCoupon ? (
                  <Button danger onClick={handleRemoveCoupon}>
                    Remove
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={handleCouponApply}
                    loading={applyingCoupon}
                    className="bg-gradient-to-r from-green-600 to-green-500 border-0 font-bold"
                  >
                    Apply
                  </Button>
                )}
              </div>
              {appliedCoupon && (
                <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                  {
                    VALID_COUPONS[appliedCoupon as keyof typeof VALID_COUPONS]
                      .description
                  }{" "}
                  applied!
                </div>
              )}
            </div>
            <div className="border-t dark:border-gray-700 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">
                  Subtotal
                </span>
                <span className="text-gray-800 dark:text-white">
                  ৳{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">
                  Shipping
                </span>
                <span className="text-gray-800 dark:text-white">
                  ৳{shipping.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">Tax</span>
                <span className="text-gray-800 dark:text-white">
                  ৳{tax.toFixed(2)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between mb-2 text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-৳{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t dark:border-gray-700 pt-2 mt-2">
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  Total
                </span>
                <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                  ৳{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="font-medium text-green-700 dark:text-green-400 mb-2">
              Secure Checkout
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Your personal data is protected with 256-bit SSL encryption.
            </p>
            <div className="flex gap-2 mt-3">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-xs text-green-700 dark:text-green-300">
                We never store your card details
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <style>
        {`
          .dark input,
          .dark textarea,
          .dark select,
          .dark .ant-input,
          .dark .ant-select-selector,
          .dark .ant-input::placeholder,
          .dark .ant-select-selection-placeholder {
            color: #fff !important;
            background-color: #1e293b !important;
            border-color: #334155 !important;
          }
          .dark .ant-input::placeholder,
          .dark .ant-select-selection-placeholder {
            color: #fff !important;
            opacity: 0.7;
          }
          .dark .StripeElement,
          .dark .StripeElement--empty {
            color: #fff !important;
          }
        `}
      </style>
    </div>
  );
};

export default StripeCheckout;
