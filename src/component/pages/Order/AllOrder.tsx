import { Button, Drawer, Image, Popconfirm, message } from "antd";
import TableOrder from "./TableOrder";
import { convertPriceToVND, dateFormat } from "../../../constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAPI } from "../../../api";
import moment from "moment";
import store from "../../../store";
import { getOrder, updateOrder } from "../../../store/actions/actionOrder";

const AllOrder = () => {
  const [open, setOpen] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [orderInfo, setOrderInfo] = useState<any>({});
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
                <Image width={80} src={item.artwork} alt={item.product_name} />
                <div className="order-product-info">
                  <p>
                    {item.product_name} {item.color ? `- ${item.color}` : null}
                  </p>
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
            <p>{orderInfo.order_code}</p>
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
            <p>{convertPriceToVND.format(orderInfo.total_price)}</p>
          </div>
          <div className="order-info-item">
            <p className="order-info-title">Giảm giá:</p>
            <p>{convertPriceToVND.format(orderInfo.discount)}</p>
          </div>
          <div className="order-info-item">
            <p className="order-info-title">Phí vận chuyển:</p>
            <p>{convertPriceToVND.format(orderInfo.shipping_fee)}</p>
          </div>
          <div className="order-info-item">
            <p className="order-info-title">Tổng thanh toán:</p>
            <p>{convertPriceToVND.format(orderInfo.total_pay)}</p>
          </div>
          <div className="order-info-item">
            <p className="order-info-title">Trạng thái:</p>
            <p>{orderInfo.status}</p>
          </div>
        </div>
        <div className="order-detail-action">
          {orderInfo.status !== "chờ duyệt" ? null : (
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
            {orderInfo.status !== "chờ duyệt" ? null : (
              <Button
                type="primary"
                danger
                disabled={orderInfo.status === "chờ duyệt" ? false : true}
              >
                Hủy đơn
              </Button>
            )}
          </Popconfirm>
        </div>
      </Drawer>
    </>
  );
};
export default AllOrder;
