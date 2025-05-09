import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Button } from "antd";
import { JwtPayload } from "jwt-decode";
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
    <div className="min-h-[calc(100vh-30vh)] flex justify-center items-center bg-white">
      <div className="w-full max-w-[741px] bg-[#f7f7f7] p-8 rounded-lg shadow-lg animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>
        <CustomForm onSubmit={handleSubmit} className="space-y-6">
          <CustomInput
            name="email"
            type="email"
            placeholderTitle="your Email"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <CustomInput
            name="password"
            type="password"
            placeholderTitle="your Password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="flex justify-center">
            <Button
              htmlType="submit"
              className="custom-btn w-20 h-10"
              style={{ fontSize: "16px", fontWeight: "600" }}
              loading={isLoading}
              disabled={isLoading}
            >
              Login
            </Button>
          </div>
          <hr />
          <div className="flex justify-between">
            <span>Forgot Your Password?</span>
            <Link className="text-[#e12503] font-semibold" to="/register">
              Create Account
            </Link>
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

export default Login;
