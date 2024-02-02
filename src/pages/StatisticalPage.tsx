import { Button, DatePicker, Form, Select, message } from "antd";
import TableProfit from "../component/pages/StatisticalPage/TableProfit";
import { useState } from "react";
import axios from "axios";
import { ENV_BE } from "../constants";
import useDocumentTitle from "../hooks/useDocumentTitle";
const { Option } = Select;

const StatisticalPage = () => {
  useDocumentTitle("Thống kê");
  const [dataStatistic, setDataStatistic] = useState([]);
  const onFinish = async (value: any) => {
    if (value.statisticOption === "profit") {
      const body = {
        fromdate: value.fromdate.format("YYYY-MM-DD"),
        todate: value.todate.format("YYYY-MM-DD"),
      };
      const response = await axios.post(`${ENV_BE}/profit`, body);
      if (response.status === 200) {
        if (response.data.status === "success") {
          setDataStatistic(response.data.data);
        } else {
          message.error("Vui lòng thử lại.");
        }
      }
    }
  };

  return (
    <>
      <div className="statistical-setting">
        <Form onFinish={onFinish}>
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              name="fromdate"
              label="Từ ngày"
              style={{ display: "inline-block", width: "calc(25% - 12px)" }}
            >
              <DatePicker placeholder="Chọn ngày" />
            </Form.Item>
            <Form.Item
              name="todate"
              label="Đến ngày"
              style={{ display: "inline-block", width: "calc(25% - 12px)" }}
            >
              <DatePicker placeholder="Chọn ngày" />
            </Form.Item>

            <Form.Item
              name="statisticOption"
              label="Thống kê"
              style={{ display: "inline-block", width: "calc(25% - 12px)" }}
            >
              <Select placeholder="Vui lòng chọn">
                <Option value="revenue">Doanh thu</Option>
                <Option value="profit">Lợi nhuận</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(25% - 12px)",
                textAlign: "center",
              }}
            >
              <Button type="primary" htmlType="submit">
                Thống kê
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
      {dataStatistic && dataStatistic.length ? (
        <div className="statistical-page content-manager">
          <div className="table-statistical">
            <h4 style={{ textAlign: "center", marginBottom: 20 }}>
              Bảng thống kê
            </h4>
            <TableProfit data={dataStatistic} />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default StatisticalPage;
