import { Outlet } from "react-router-dom";

import ContentAdmin from "./ContentAdmin";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <ContentAdmin>
        <Outlet />
      </ContentAdmin>
    </div>
  );
};
export default AdminLayout;
