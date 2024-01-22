export interface Products {
  id: number;
  product_code: string;
  category_id: number;
  productName: string;
  capacity: number;
  color: string;
  artwork: string;
  listed_price: number;
  price: number;
  quantity: number;
  slug: string;
}
export interface ImageProduct {
  id: number;
  productId: number;
  imgUrl: string;
  color: string;
}
export interface Categories {
  id: number;
  categoryName: string;
  slug: string;
}
export interface Staff {
  id: number;
  fullname: string;
  email: string;
  username: string;
  avatar: string;
  password: string;
  role: number;
  phone: string;
  gender: string;
  birthday: string;
  address: string;
}

export interface Order {
  id: number;
  orderCode: string;
  id_staff: number;
  fullname: string;
  address: string;
  email: string;
  paymentMethod: string;
  phone: string;
  voucher: string;
  discount: number;
  shippingFee: number;
  totalPrice: number;
  totalPay: number;
  status: string;
}

export interface ProductDetails {
  id: number;
  id_product: number;
  color: string;
  quantity: number;
}
export const ENV_BE = "http://localhost:8000";
export const ACCESS_TOKEN = "access-token";
export const REFRESH_TOKEN = "refresh-token";
export const USER_INFO = "user-info";

export const convertPriceToVND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
export const dateFormat = (datetime: any) => {
  var date = new Date(datetime);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear().toString();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var formattedDay = day < 10 ? "0" + day : day;
  var formattedMonth = month < 10 ? "0" + month : month;
  var formattedHours = hours < 10 ? "0" + hours : hours;
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  const formattedTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return formattedTime;
};
export const dmyFormat = (datetime: any) => {
  var date = new Date(datetime);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear().toString();

  var formattedDay = day < 10 ? "0" + day : day;
  var formattedMonth = month < 10 ? "0" + month : month;

  const formattedTime = `${year}-${formattedMonth}-${formattedDay}`;
  return formattedTime;
};
export const getDate = (datetime: any) => {
  var date = new Date(datetime);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear().toString();

  var formattedDay = day < 10 ? "0" + day : day;
  var formattedMonth = month < 10 ? "0" + month : month;

  const formattedTime = `${formattedMonth}/${formattedDay}`;
  return formattedTime;
};
