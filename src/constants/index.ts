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
export const ENV_BE = "http://localhost:8000";
export const ACCESS_TOKEN = "access-token";
export const REFRESH_TOKEN = "refresh-token";
export const USER_INFO = "user-info";
