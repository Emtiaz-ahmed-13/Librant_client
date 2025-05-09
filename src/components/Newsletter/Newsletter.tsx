import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const Newsletter = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { email: string }) => {
    console.log("Subscribed with email:", values.email);
    form.resetFields();
    // Here you would typically call an API to save the email
  };

  return (
    <div className="py-12 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Join our Newsletter</h2>
        <p className="text-lg mb-8 text-indigo-100">
          Stay updated with the latest releases, book recommendations, and
          exclusive offers.
        </p>

        <Form
          form={form}
          onFinish={handleSubmit}
          className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4"
        >
          <Form.Item
            name="email"
            className="flex-grow mb-0"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Your email address"
              size="large"
              className="w-full"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full sm:w-auto bg-white text-indigo-600 border-white hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-100"
            >
              Subscribe
            </Button>
          </Form.Item>
        </Form>

        <p className="mt-4 text-sm text-indigo-200">
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates from Librant.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
