import { Card, Col, Row } from "antd";
import EChart from "../../charts/EChart";
import PieChart from "../../charts/PieChart";
import LineChart from "../../charts/LineChart";

const StatisticalChart = () => {
  return (
    <div className="statistical-chart">
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <h4 style={{ textAlign: "center", marginBottom: 10 }}>
              Thống kê lượt bán
            </h4>
            <LineChart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <h4 style={{ textAlign: "center", marginBottom: 10 }}>
              Thống kê lượt bán
            </h4>
            <EChart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <h4 style={{ textAlign: "center", marginBottom: 10 }}>
              Thống kê doanh thu
            </h4>
            <PieChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default StatisticalChart;
