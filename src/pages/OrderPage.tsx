import { useEffect, useState } from "react";
import TableOrder from "../component/pages/Order/TableOrder";
import useDocumentTitle from "./../hooks/useDocumentTitle";
import store from "../store";
import { getOrder, updateOrder } from "../store/actions/actionOrder";
import { Button, Drawer, Image, Popconfirm, message } from "antd";
import { getAPI, putAPI } from "../api";
import { convertPriceToVND, dateFormat } from "../constants";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
const OrderPage = () => {
  useDocumentTitle("Đơn hàng");
  const [open, setOpen] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [orderInfo, setOrderInfo] = useState<any>({});
  const [keyactive, setKeyactive] = useState("all");
  const taborder = [
    { key: "all", title: "Tất cả" },
    { key: "pending", title: "Chờ duyệt" },
    { key: "waitforpay", title: "Chờ thanh toán" },
    { key: "waitforship", title: "Chờ giao hàng" },
    { key: "success", title: "Hoàn thành" },
    { key: "cancel", title: "Đã hủy" },
    { key: "returnorder", title: "Trả hàng" },
  ];
  const dataUser: any = useSelector<any>((state) => state.userLogin.userInfo);
  const onClose = () => {
    setDataOrder([]);
    setOpen(false);
  };
  const onNotify = (status: string) => {
    if (status === "success") {
      message.success("Duyệt đơn thành công");
    } else {
      message.error("Duyệt đơn thất bại");
    }
  };
  const openEdit = async (record: any) => {
    // console.log(moment().format("yyyy:MM:DD hh:mm:ss"));
    const response = await getAPI(`/order/${record.id}`);
    if (response.status === 200) {
      if (response.data.status === "success") {
        setDataOrder(response.data.data);
        setOrderInfo(record);
        setOpen(true);
      }
    }
  };
  const onFinish = async () => {
    const body = {
      ...orderInfo,
      status: "chờ giao hàng",
      id_staff: dataUser.user.id,
      create_at: dateFormat(orderInfo.create_at),
      update_at: moment().format("yyyy:MM:DD hh:mm:ss"),
    };

    store.dispatch(updateOrder(body, onNotify, onClose));
  };
  useEffect(() => {
    store.dispatch(getOrder());
  }, []);
  return (
    <>
      <div className="order-tab">
        <ul>
          {taborder.map((item: { key: string; title: string }) => {
            return (
              <li
                key={item.key}
                className={keyactive === item.key ? "active" : ""}
                onClick={() => setKeyactive(item.key)}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="order-page">
        <TableOrder openEdit={openEdit} />
        <Drawer
          title={"Chi tiết đơn hàng"}
          width={400}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
        >
          <div className="order-product-detail">
            {dataOrder.map((item: any) => {
              return (
                <div className="order-product-item" key={item.id}>
                  <p>{item.sl}x</p>
                  <Image width={80} src={item.artwork} alt={item.productName} />
                  <div className="order-product-info">
                    <p>{item.productName}</p>
                    <p>{convertPriceToVND.format(item.price)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="order-info-detail">
            <h6>2. Thông tin thanh toán và nhận hàng</h6>
            <div className="order-info-item">
              <p className="order-info-title">Mã đơn hàng:</p>
              <p>{orderInfo.orderCode}</p>
            </div>
            <div className="order-info-item">
              <p className="order-info-title">Tên người nhận:</p>
              <p>{orderInfo.fullname}</p>
            </div>
            <div className="order-info-item">
              <p className="order-info-title">Số điện thoại:</p>
              <p>{orderInfo.phone}</p>
            </div>
            <div className="order-info-item">
              <p className="order-info-title">Địa chỉ:</p>
              <p>{orderInfo.address}</p>
            </div>
            <div className="order-info-item">
              <p className="order-info-title">Tổng cộng:</p>
              <p>{convertPriceToVND.format(orderInfo.totalPrice)}</p>
            </div>
            <div className="order-info-item">
              <p className="order-info-title">Giảm giá:</p>
              <p>{convertPriceToVND.format(orderInfo.discount)}</p>
            </div>
            <div className="order-info-item">
              <p className="order-info-title">Phí vận chuyển:</p>
              <p>{convertPriceToVND.format(orderInfo.shippingFee)}</p>
            </div>
            <div className="order-info-item">
              <p className="order-info-title">Tổng thanh toán:</p>
              <p>{convertPriceToVND.format(orderInfo.totalPay)}</p>
            </div>
            <div className="order-info-item">
              <p className="order-info-title">Trạng thái:</p>
              <p>{orderInfo.status}</p>
            </div>
          </div>
          <div className="order-detail-action">
            {orderInfo.status === "chờ giao hàng" ? null : (
              <Button type="primary" onClick={() => onFinish()}>
                Duyệt đơn
              </Button>
            )}

            <Popconfirm
              title="Hủy đơn hàng"
              description="Bạn chắc chắn muốn hủy đơn này?"
              okText="Có"
              cancelText="Hủy"
              onConfirm={() => console.log("Huỷ đơn")}
            >
              <Button type="primary" danger>
                Hủy đơn
              </Button>
            </Popconfirm>
          </div>
        </Drawer>
      </div>
    </>
  );
};
export default OrderPage;
