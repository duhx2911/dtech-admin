import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashBoardPage from "../pages/DashBoardPage";
import ProductAdminPage from "../pages/ProductAdminPage";
import CategoryAdminPage from "../pages/CategoryAdminPage";
import AccountAdminPage from "../pages/AccountAdminPage";
import ProtectedRoutes from "./ProtectRoutes";
import OrderPage from "../pages/OrderPage";
import DiscountPage from "../pages/DiscountPage";
import StatisticalPage from "../pages/StatisticalPage";
import CustomerPage from "../pages/CustomerPage";
const BrowerRouter = () => {
  return (
    <Routes>
      {/* Admin */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route index element={<DashBoardPage />} />
        <Route path="product" element={<ProductAdminPage />} />
        <Route path="category" element={<CategoryAdminPage />} />
        <Route path="user" element={<AccountAdminPage />} />
        <Route path="customer" element={<CustomerPage />} />
        <Route path="don-hang" element={<OrderPage />} />
        <Route path="khuyen-mai" element={<DiscountPage />} />
        <Route path="thong-ke" element={<StatisticalPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default BrowerRouter;
