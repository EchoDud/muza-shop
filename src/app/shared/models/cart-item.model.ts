export interface CartItem {
  id: number;         // ID записи в таблице Orders
  productId: number;  // ID товара
  name: string;       // Название товара (заполняется из данных продукта)
  price: number;      // Цена за единицу товара
  quantity: number;   // Количество товара
  status: string;     // Статус заказа (Pending, Paid, Received, Cancelled)
  createdDate?: Date; // Дата создания заказа (добавляется только для истории)
}
