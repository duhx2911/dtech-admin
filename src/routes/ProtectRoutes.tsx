import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";

import AdminLayout from "../component/layout";
import { useSelector } from "react-redux";

// const useAuth = () => {
//   const { isLogin } = useContext(AuthContext);
//   return isLogin;
// };

const ProtectedRoutes = () => {
  const location = useLocation();
  const userLogin: any = useSelector<any>((state) => state.userLogin);
  const { userInfo } = userLogin;
  return userInfo && userInfo.accessToken ? (
    <AdminLayout />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
