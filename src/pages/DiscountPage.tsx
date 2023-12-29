import { Button } from "antd";
import TableDiscount from "../component/pages/DiscountPage/TableDiscount";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { PlusOutlined } from "@ant-design/icons";

const DiscountPage = () => {
  useDocumentTitle("Khuyến mại");
  return (
    <div className="discount-page content-manager">
      <Button type="primary" icon={<PlusOutlined />}>
        Thêm khuyến mại
      </Button>
      <TableDiscount />
    </div>
  );
};
export default DiscountPage;
