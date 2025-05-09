import { LockOutlined } from "@ant-design/icons";
import { Alert, Button, Form } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CustomForm from "../../components/CustomForm/CustomForm";
import CustomInput from "../../components/CustomForm/CustomInput";
import { useUpdatePaswordMutation } from "../../Redux/Features/Auth/authApi";

const UpdatePasswordForm = () => {
  const [updatePassword, { isLoading }] = useUpdatePaswordMutation();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setError(null);
      setSuccess(null);
      const toastId = toast.loading("Updating password...");

      const response = await updatePassword(data).unwrap();

      if (response?.success) {
        setSuccess("Password updated successfully!");
        toast.success("Password updated successfully", { id: toastId });
      } else {
        setError(response?.message || "Failed to update password");
        toast.error(response?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? (error.data as { message: string }).message
          : "Failed to update password";

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-4"
          closable
          onClose={() => setError(null)}
        />
      )}

      {success && (
        <Alert
          message="Success"
          description={success}
          type="success"
          showIcon
          className="mb-4"
          closable
          onClose={() => setSuccess(null)}
        />
      )}

      <CustomForm onSubmit={onSubmit} className="space-y-4">
        <div>
          <Form.Item label="Email" labelCol={{ span: 24 }} className="mb-1">
            <CustomInput
              name="email"
              type="email"
              placeholderTitle="Enter your email"
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              className="w-full"
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            label="Current Password"
            labelCol={{ span: 24 }}
            className="mb-1"
          >
            <CustomInput
              name="oldPassword"
              type="password"
              placeholderTitle="Enter your current password"
              validation={{ required: "Current password is required" }}
              className="w-full"
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            label="New Password"
            labelCol={{ span: 24 }}
            className="mb-1"
          >
            <CustomInput
              name="newPassword"
              type="password"
              placeholderTitle="Enter your new password"
              validation={{
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              className="w-full"
            />
          </Form.Item>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 w-full h-10 mt-4"
          icon={<LockOutlined />}
        >
          Update Password
        </Button>
      </CustomForm>
    </div>
  );
};

export default UpdatePasswordForm;
