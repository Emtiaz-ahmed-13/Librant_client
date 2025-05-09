import { Button } from "antd";
import { motion } from "framer-motion";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CustomForm from "../../components/CustomForm/CustomForm";
import CustomInput from "../../components/CustomForm/CustomInput";
import CustomSelect from "../../components/CustomForm/CustomSelect";
import { CategoryOptions } from "../../Constants/constants";
import { usePublishBookMutation } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
const AddBookToStore = () => {
  const [publishBook] = usePublishBookMutation(undefined);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    try {
      const { data: response } = await publishBook(data);
      const toastId = toast.loading("Publishing your book");
      console.log(response);
      if (response?.success) {
        toast.success("Book Published", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center items-center   p-6"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Publish Your Book 📚
        </h2>
        <CustomForm onSubmit={onSubmit} className="space-y-6">
          <CustomInput name="title" placeholderTitle="Title" type="text" />
          <CustomInput
            name="description"
            placeholderTitle="Description"
            type="text"
          />
          <CustomInput name="price" placeholderTitle="Price" type="number" />
          <CustomInput
            name="quantity"
            placeholderTitle="Quantity"
            type="number"
          />
          <CustomInput name="author" placeholderTitle="Author" type="text" />
          <CustomSelect
            name="category"
            label="Category"
            options={CategoryOptions}
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              htmlType="submit"
              className="custom-btn"
              style={{ width: "100%" }}
            >
              Publish Book
            </Button>
          </motion.div>
        </CustomForm>
      </motion.div>
    </motion.div>
  );
};

export default AddBookToStore;
