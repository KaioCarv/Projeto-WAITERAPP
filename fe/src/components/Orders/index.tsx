import { useEffect, useState } from "react";
import socket from 'socket.io-client';
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import { OrdersBoard } from "../OrdearsBoard";
import { Container } from "./styles";

export function Orders() {
  const [orders, setOrders] = useState<Order[] | []>([]);

  useEffect(() => {
    api.get('orders').then(({ data }) => setOrders(data));
  });

  useEffect(() => {
    const io = socket('http://localhost:5000/', {
      transports: ['websocket']
    });
    io.on('order@new', (order) => setOrders(prev => prev.concat(order)))
  }, []);

  const waiting = orders.filter(({ status }) => status === 'WAITING');
  const inProduction = orders.filter(({ status }) => status === 'IN_PRODUCTION');
  const done = orders.filter(({ status }) => status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prev) => prev.filter(({_id}) => _id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prev) => prev.map((order) => {
      if (order._id !== orderId) return {
        ...order,
        status
      };

      return order;
    }));
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}
