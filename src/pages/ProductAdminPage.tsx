import { Tabs, TabsProps } from "antd";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ProductComponent from "../component/pages/Product/ProductComponent";
import ProductDetail from "../component/pages/Product/ProductDetail";
import ImageProductPage from "../component/pages/Product/ImageProduct";
const ProductAdminPage = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Sản phẩm",
      children: <ProductComponent />,
    },
    {
      key: "2",
      label: "Chi tiết sản phẩm",
      children: <ProductDetail />,
    },
    {
      key: "3",
      label: "Ảnh sản phẩm",
      children: <ImageProductPage />,
    },
  ];
  useDocumentTitle("Quản lý sản phẩm");
  return (
    <div className="product-page">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
export default ProductAdminPage;
