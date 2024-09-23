import React, { createContext, useState, ReactNode } from 'react';
import item from "../../assets/images/hover_img_4.webp";

// Define Types
export interface MyOrder {
  id: number;
  name: string;
  image: string;
  description: string;
  originalPrice: number;
  discount: string;
  price: number;
  size: string;
  quantity: number;
  isChecked: boolean;
  orderDate: string;
  status: string;
  orderId: number;
}

export interface CancelledOrder extends MyOrder {
  cancellationDate: string;
}

// Define Context State
 export interface OrderContextType {
  recentOrders: MyOrder[];
  cancelledOrders: CancelledOrder[];
  handleCancelOrder: (orderId: number) => void;
}

// Create Context
export const OrderContext = createContext<OrderContextType | undefined>(undefined);

// OrderProvider Component
export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Hardcoded recent orders
  const [recentOrders, setRecentOrders] = useState<MyOrder[]>([
    { id: 1, name: 'Camel Streach Pants', image: item, description: 'White Accordion Pleated A-Line Formal Pant', price: 2650, size: '36',originalPrice: 2899,
        discount: "50% OFF", isChecked: false, orderDate: "20 Aug 2024", quantity: 1, status: 'Dispatched', orderId: 101 },
    { id: 2, name: 'Camel Streach Pants', image: item, description: 'White Accordion Pleated A-Line Formal Pant', price: 2650, size: '36',  originalPrice: 2899,
        discount: "50% OFF", isChecked: false, orderDate: "20 Aug 2024",quantity: 2, status: 'Dispatched', orderId: 102 },
        { id: 3, name: 'Camel Streach Pants', image: item, description: 'White Accordion Pleated A-Line Formal Pant', price: 2650, size: '36',  originalPrice: 2899,
            discount: "50% OFF", isChecked: false, orderDate: "20 Aug 2024",quantity: 2, status: 'Delivered', orderId: 102 }
  ]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // Using 'en-GB' locale for "20 Aug 2024" format
  };

  // Hardcoded cancelled orders
  const [cancelledOrders, setCancelledOrders] = useState<CancelledOrder[]>([]);

  const handleCancelOrder = (orderId: number) => {
    setRecentOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: "Cancelled" };
        }
        return order;
      }).filter((order) => order.status !== "Cancelled");

      // Find the cancelled order to move it
      const cancelledOrder = prevOrders.find((order) => order.id === orderId);

      if (cancelledOrder) {
        setCancelledOrders((prevCancelledOrders) => [
          ...prevCancelledOrders,
          { ...cancelledOrder, cancellationDate:  formatDate(new Date().toISOString()), },
        ]);
      }

      return updatedOrders;
    });
  };

  return (
    <OrderContext.Provider value={{ recentOrders, cancelledOrders, handleCancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
