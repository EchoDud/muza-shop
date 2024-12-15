import { CartItem } from "./cart-item.model";

export interface AdminCartItem extends CartItem {
  userId: number; // ID пользователя, видимый только в админской панели
}
