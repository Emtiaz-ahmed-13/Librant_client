import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Button } from "antd";
import { motion } from "framer-motion";
import { JwtPayload } from "jwt-decode";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomForm from "../../components/CustomForm/CustomForm";
import CustomInput from "../../components/CustomForm/CustomInput";
import { useLoginMutation } from "../../Redux/Features/Auth/authApi";
import { setUser } from "../../Redux/Features/Auth/authSlice";
import { verifyToken } from "../../Utils/verifyToken";

interface LoginError {
  data?: {
    message?: string;
  };
  status?: number;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const toastId = toast.loading("Logging in...");
      const result = await login(data).unwrap();
      console.log("Login response:", result);

      if (result?.success) {
        const accessToken = result.data.accessToken;

        try {
          const user = verifyToken(accessToken) as JwtPayload & {
            id: string;
            role: string;
            email: string;
          };

          console.log("Decoded token:", user);

          dispatch(setUser({ user, token: accessToken }));
          toast.success("Successfully logged in", { id: toastId });
          navigate(from, { replace: true });
        } catch (tokenError) {
          console.error("Token decode error:", tokenError);
          toast.error("Login failed: Invalid token", { id: toastId });
        }
      } else {
        toast.error(result?.message || "Login failed", { id: toastId });
      }
    } catch (error: unknown) {
      const err = error as FetchBaseQueryError | SerializedError | LoginError;
      console.error("Login error details:", err);

      const errorMsg =
        "data" in err &&
        err.data &&
        typeof err.data === "object" &&
        "message" in err.data
          ? err.data.message
          : "Login failed. Please check your credentials.";

      toast.error(errorMsg as string);
      console.error("Login error:", error);
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
              <LockOutlined className="text-2xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to your Librant account
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
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <CustomInput
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholderTitle="Enter your password"
                  className="block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300 shadow-sm"
                  validation={{
                    required: "Password is required",
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-4"
            >
              <Button
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 border-0 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </motion.div>
          </CustomForm>

          {/* Forgot Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 text-center"
          >
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition-colors duration-300"
            >
              Forgot your password?
            </Link>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">
                  Don't have an account?
                </span>
              </div>
            </div>
            <Link
              to="/register"
              className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-semibold transition-colors duration-300"
            >
              Create one here
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
