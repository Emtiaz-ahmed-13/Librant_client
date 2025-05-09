import { Button } from "antd";

const CustomBtn = ({ ButtonText, onClick }: { ButtonText: string; onClick?: () => void }) => {
  return (
    <Button className="custom-btn" type="text" onClick={onClick}>
      {ButtonText}
    </Button>
  );
};

export default CustomBtn;
