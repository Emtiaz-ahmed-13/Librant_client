import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Button } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomForm from "../../components/CustomForm/CustomForm";
import CustomInput from "../../components/CustomForm/CustomInput";
import { useRegisterMutation } from "../../Redux/Features/Auth/authApi";

interface RegisterError {
  data?: {
    message?: string;
  };
  status?: number;
}

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Password strength validation
    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const toastId = toast.loading("Creating your account...");

    try {
      // Remove confirmPassword from data before sending to API
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registrationData } = data;

      const result = await register(registrationData).unwrap();

      if (result?.success) {
        toast.success("Account created successfully! Please login.", {
          id: toastId,
          duration: 4000,
        });
        navigate("/login");
      } else {
        toast.error(result?.message || "Registration failed", { id: toastId });
      }
    } catch (error: unknown) {
      const err = error as
        | FetchBaseQueryError
        | SerializedError
        | RegisterError;
      const errorMsg =
        "data" in err &&
        err.data &&
        typeof err.data === "object" &&
        "message" in err.data
          ? err.data.message
          : "Registration failed. Please try again.";

      toast.error(errorMsg as string, { id: toastId });
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-700">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
              <UserOutlined className="text-2xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Join thousands of book lovers today
            </p>
          </motion.div>

          {/* Form */}
          <CustomForm onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <CustomInput
                name="name"
                type="text"
                placeholderTitle="Enter your full name"
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300 shadow-sm"
                validation={{
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <CustomInput
                name="phone"
                type="tel"
                placeholderTitle="Enter your phone number"
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300 shadow-sm"
                validation={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[1-9][\d]{0,15}$/,
                    message: "Please enter a valid phone number",
                  },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <CustomInput
                name="email"
                type="email"
                placeholderTitle="Enter your email address"
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300 shadow-sm"
                validation={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <CustomInput
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholderTitle="Create a strong password"
                  className="block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300 shadow-sm"
                  validation={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {passwordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <CustomInput
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholderTitle="Confirm your password"
                  className="block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300 shadow-sm"
                  validation={{
                    required: "Please confirm your password",
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {confirmPasswordVisible ? (
                    <EyeTwoTone />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="pt-4"
            >
              <Button
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 border-0 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </motion.div>
          </CustomForm>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>
            <Link
              to="/login"
              className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-semibold transition-colors duration-300"
            >
              Sign in here
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
