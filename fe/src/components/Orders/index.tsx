import { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import { OrdersBoard } from "../OrdearsBoard";
import { Container } from "./styles";

import socketIo from 'socket.io-client';

export function Orders (){
  const [orders, SetOrders] = useState<Order[]>([]);

  useEffect(() =>{
  const socket = socketIo('http://localhost:3001', {
  transports: ['websocket'],

  });

  socket.on('orders@new', (order) =>{
    SetOrders(prevState => prevState.concat(order));
  });
  },[]);

  useEffect(() => {
   api.get('/orders')
    .then(({data}) => {
      SetOrders(data);
    })
  })

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

function handleCancelOrder(orderId: string) {
  SetOrders((prevState) => prevState.filter(order => order._id !== orderId))
}

function handleOrderStatusChange(orderId: string, status: Order['status']){
  SetOrders((prevState) => prevState.map((order) => (
    order._id === orderId
    ? {...order, status }
    : order

  )));
}

return (
  <Container>
    <OrdersBoard
    icon="🕛"
    title="Fila de espera"
    orders={waiting}
    onCancelOrder={handleCancelOrder}
    onChangeOrderStatus={handleOrderStatusChange}
    />
    <OrdersBoard
     icon="👨🏽‍🍳"
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
 )
}
