import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const CustomInput = ({
  name,
  label,
  type,
  placeholderTitle,
  className,
  validation = { required: `${label || name} is required` },
}: {
  name: string;
  label?: string;
  type: string;
  placeholderTitle?: string;
  className?: string;
  validation?: Record<string, unknown>;
}) => {
  const {
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message as string;

  return (
    <div className="mb-1">
      <Controller
        name={name}
        rules={validation}
        render={({ field }) => (
          <>
            {label && (
              <label htmlFor={name} className="block mb-1 font-medium">
                {label}
              </label>
            )}
            <Input
              {...field}
              id={name}
              placeholder={`Enter ${label || placeholderTitle}`}
              type={type}
              className={`${className} ${errorMessage ? "border-red-500" : ""}`}
              status={errorMessage ? "error" : ""}
            />
            {errorMessage && (
              <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default CustomInput;
