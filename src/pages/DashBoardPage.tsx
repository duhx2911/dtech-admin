import StatisticalChart from "../component/pages/DashboardPage/StatisticalChart";
import Vbox from "../component/pages/DashboardPage/Vbox";
import useDocumentTitle from "../hooks/useDocumentTitle";

const DashBoardPage = () => {
  useDocumentTitle("Trang chủ");
  return (
    <div className="dashboard">
      <Vbox />
      <StatisticalChart />
    </div>
  );
};
export default DashBoardPage;
