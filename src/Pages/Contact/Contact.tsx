import {
  ClockCircleOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Spin, message } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

const Contact = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success("Your message has been sent successfully!");
      form.resetFields();
    } catch {
      message.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
            <MailOutlined className="mr-2" />
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <motion.div
            className="md:col-span-5 lg:col-span-4"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm h-full">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
                <CompassOutlined className="mr-3 text-teal-500 dark:text-teal-400" />
                <span>How to Reach Us</span>
              </h2>
              <div className="space-y-8">
                <div className="flex">
                  <div className="bg-gradient-to-br from-teal-400 to-emerald-400 dark:from-teal-600 dark:to-emerald-600 p-3 rounded-lg mr-5 flex-shrink-0 shadow-md">
                    <EnvironmentOutlined className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
                      Visit Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      123 Book Street, Literary District
                      <br />
                      Bookville, BK 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-gradient-to-br from-teal-400 to-emerald-400 dark:from-teal-600 dark:to-emerald-600 p-3 rounded-lg mr-5 flex-shrink-0 shadow-md">
                    <PhoneOutlined className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
                      Call Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      <a
                        href="tel:+12345678900"
                        className="text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        +1 (234) 567-8900
                      </a>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Monday-Friday, 9am-5pm EST
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-gradient-to-br from-teal-400 to-emerald-400 dark:from-teal-600 dark:to-emerald-600 p-3 rounded-lg mr-5 flex-shrink-0 shadow-md">
                    <MailOutlined className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
                      Email Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      <a
                        href="mailto:contact@librant.com"
                        className="text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        contact@librant.com
                      </a>
                      <br />
                      <a
                        href="mailto:support@librant.com"
                        className="text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        support@librant.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="border-t border-gray-100 dark:border-gray-700 pt-8">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-4 flex items-center">
                    <ClockCircleOutlined className="mr-2 text-teal-500 dark:text-teal-400" />
                    Store Hours
                  </h3>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Monday - Friday</span>
                      <span className="bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded text-teal-700 dark:text-teal-300 text-sm">
                        9:00 AM - 8:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Saturday</span>
                      <span className="bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded text-teal-700 dark:text-teal-300 text-sm">
                        10:00 AM - 7:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sunday</span>
                      <span className="bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded text-teal-700 dark:text-teal-300 text-sm">
                        11:00 AM - 6:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {["facebook", "twitter", "instagram", "linkedin"].map(
                    (platform) => (
                      <a
                        key={platform}
                        href={`https://${platform}.com/librant`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-teal-100 dark:hover:bg-teal-800"
                      >
                        <span className="capitalize text-gray-600 dark:text-gray-300">
                          {platform.charAt(0).toUpperCase()}
                        </span>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-7 lg:col-span-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
                <SendOutlined className="mr-3 text-teal-500 dark:text-teal-400" />
                <span>Send Us a Message</span>
              </h2>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input
                      placeholder="John Doe"
                      className="py-2 px-4 rounded-lg dark:bg-slate-700 dark:text-white dark:border-gray-600"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input
                      placeholder="john@example.com"
                      className="py-2 px-4 rounded-lg dark:bg-slate-700 dark:text-white dark:border-gray-600"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[
                    { required: true, message: "Please select a subject" },
                  ]}
                >
                  <Select
                    placeholder="Select a subject"
                    className="rounded-lg dark:bg-slate-700 dark:text-white"
                    dropdownStyle={{ backgroundColor: "var(--bg-color)" }}
                  >
                    <Option value="general">General Inquiry</Option>
                    <Option value="support">Customer Support</Option>
                    <Option value="orders">Order Issues</Option>
                    <Option value="feedback">Feedback</Option>
                    <Option value="partnership">Partnership</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[
                    { required: true, message: "Please enter your message" },
                  ]}
                >
                  <TextArea
                    placeholder="Your message here..."
                    rows={6}
                    className="rounded-lg dark:bg-slate-700 dark:text-white dark:border-gray-600"
                  />
                </Form.Item>

                <Form.Item className="mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    icon={
                      isSubmitting ? <Spin size="small" /> : <SendOutlined />
                    }
                    disabled={isSubmitting}
                    className="px-8 py-6 h-auto flex items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-500 border-0 hover:from-teal-600 hover:to-emerald-600"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <motion.div
              className="mt-8 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-gray-800 dark:text-white text-xl mb-4">
                Our Location
              </h3>
              <div className="bg-gray-200 dark:bg-gray-700 h-80 rounded-lg overflow-hidden">
                {/* This would be replaced with an actual Google Map in production */}
                <div className="h-full w-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 relative">
                  <EnvironmentOutlined className="text-5xl text-teal-500 dark:text-teal-400 absolute animate-bounce" />
                  <p className="text-gray-500 dark:text-gray-400 mt-16">
                    Interactive map would be displayed here
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                {
                  q: "What are your shipping rates?",
                  a: "We offer free shipping on all orders over $35. Orders under $35 have a flat rate of $5.99.",
                },
                {
                  q: "How can I track my order?",
                  a: "Once your order ships, you'll receive an email with tracking information that allows you to follow your package's journey.",
                },
                {
                  q: "What is your return policy?",
                  a: "We accept returns within 30 days of purchase for items in their original condition. Read our full policy online.",
                },
                {
                  q: "Do you ship internationally?",
                  a: "Yes, we ship to over 60 countries worldwide. International shipping rates are calculated at checkout.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
