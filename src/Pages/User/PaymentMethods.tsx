import {
  CheckCircleOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  LockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Card, Form, Input, message, Modal, Tooltip } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";

// Card animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Mock payment method data type
interface PaymentMethod {
  id: string;
  cardBrand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  holderName: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // State
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      cardBrand: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2024,
      holderName: "John Doe",
      isDefault: true,
    },
    {
      id: "pm_2",
      cardBrand: "mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2025,
      holderName: "John Doe",
      isDefault: false,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [form] = Form.useForm();

  // Card brand icon component
  const CardBrandIcon = ({ brand }: { brand: string }) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return <FaCcVisa className="text-blue-600 text-2xl" />;
      case "mastercard":
        return <FaCcMastercard className="text-red-500 text-2xl" />;
      case "amex":
        return <FaCcAmex className="text-blue-400 text-2xl" />;
      default:
        return <CreditCardOutlined className="text-gray-500 text-2xl" />;
    }
  };

  // Handle add new card
  const handleAddCard = async (values: { cardHolderName: string }) => {
    if (!stripe || !elements) {
      message.error("Stripe has not been initialized");
      return;
    }

    setLoading(true);

    try {
      // In a real app, you would:
      // 1. Create a payment method using stripe.createPaymentMethod
      // 2. Send the payment method ID to your backend
      // 3. Store it securely in your database

      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create mock payment method
      const newPaymentMethod: PaymentMethod = {
        id: `pm_${Math.random().toString(36).substring(2, 10)}`,
        cardBrand: Math.random() > 0.5 ? "visa" : "mastercard",
        last4: Math.floor(1000 + Math.random() * 9000).toString(),
        expMonth: Math.floor(1 + Math.random() * 12),
        expYear: 2024 + Math.floor(Math.random() * 5),
        holderName: values.cardHolderName,
        isDefault: paymentMethods.length === 0, // Make it default if it's the first one
      };

      setPaymentMethods((prev) => [...prev, newPaymentMethod]);
      message.success("Card added successfully!");
      setShowAddCardModal(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to add card");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete card
  const handleDeleteCard = (id: string) => {
    Modal.confirm({
      title: "Delete Payment Method",
      content:
        "Are you sure you want to delete this card? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
        message.success("Card deleted successfully");
      },
    });
  };

  // Set card as default
  const setDefaultCard = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
    message.success("Default payment method updated");
  };

  // Card styles for Stripe CardElement
  const cardElementStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Methods
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your credit and debit cards
          </p>
        </motion.div>

        <div className="mb-6">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setShowAddCardModal(true)}
            className="shadow-sm"
          >
            Add New Card
          </Button>
        </div>

        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {paymentMethods.length === 0 ? (
            <motion.div
              variants={item}
              className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center shadow-sm"
            >
              <div className="text-gray-400 mb-3">
                <CreditCardOutlined style={{ fontSize: 48 }} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                No Payment Methods
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Add a credit or debit card to make purchases easier.
              </p>
              <Button type="primary" onClick={() => setShowAddCardModal(true)}>
                Add Your First Card
              </Button>
            </motion.div>
          ) : (
            paymentMethods.map((method) => (
              <motion.div key={method.id} variants={item}>
                <Card
                  hoverable
                  className="transition-all duration-300 dark:bg-slate-800 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CardBrandIcon brand={method.cardBrand} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-medium text-gray-900 dark:text-white">
                            •••• •••• •••• {method.last4}
                          </span>
                          {method.isDefault && (
                            <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {method.holderName} | Expires {method.expMonth}/
                          {method.expYear % 100}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {!method.isDefault && (
                        <Tooltip title="Set as default">
                          <Button
                            icon={<CheckCircleOutlined />}
                            onClick={() => setDefaultCard(method.id)}
                            size="small"
                          />
                        </Tooltip>
                      )}
                      <Tooltip title="Delete card">
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteCard(method.id)}
                          size="small"
                          disabled={method.isDefault}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <div className="flex justify-center items-center mb-2">
            <LockOutlined className="mr-1" /> Secure Payment Processing
          </div>
          <p>
            Your payment information is encrypted and stored securely with
            Stripe.
          </p>
          <div className="flex justify-center mt-4 space-x-3">
            <FaCcVisa size={32} className="text-blue-600" />
            <FaCcMastercard size={32} className="text-red-500" />
            <FaCcAmex size={32} className="text-blue-400" />
          </div>
        </div>
      </div>

      {/* Add New Card Modal */}
      <Modal
        title="Add New Payment Method"
        open={showAddCardModal}
        onCancel={() => {
          setShowAddCardModal(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddCard}
          name="add-payment-method"
        >
          <Form.Item
            name="cardHolderName"
            label="Cardholder Name"
            rules={[
              { required: true, message: "Please enter cardholder name" },
            ]}
          >
            <Input placeholder="Name as it appears on card" />
          </Form.Item>

          <Form.Item label="Card Information" required>
            <div className="p-3 border rounded-md focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <CardElement options={cardElementStyle} />
            </div>
          </Form.Item>

          <div className="text-xs text-gray-500 mb-4 flex items-center">
            <LockOutlined className="mr-1" />
            Your payment information is processed securely through Stripe.
          </div>

          <div className="flex justify-end space-x-2">
            <Button onClick={() => setShowAddCardModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Card
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentMethods;
