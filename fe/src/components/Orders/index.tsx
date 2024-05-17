import { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdearsBoard";
import { Container } from "./styles";

const orders: Order[] = [
  {
		"_id": "6646a3e00e22157eb49f3fc1",
		"table": "123",
		"status": "DONE",
		"products": [
			{
				"product": {
					"name": "Pizza quatro queijos",
					"imagePath": "1715900081629-quatro-queijos.png",
					"price": 40,
				},
				"quantity": 3,
				"_id": "6646a3e00e22157eb49f3fc2"
			},
			{
				"product": {
					"name": "Coca Cola",
					"imagePath": "1715903543902-coca-cola.png",
					"price": 7,
				},
				"quantity": 2,
				"_id": "6646a3e00e22157eb49f3fc3"
			}
		],
	}
];

export function Orders (){
return (
  <Container>
    <OrdersBoard
    icon="🕛"
    title="Fila de espera"
    orders={orders}
    />
    <OrdersBoard
     icon="👨🏽‍🍳"
     title="Em preparação"
     orders={[]}
    />
    <OrdersBoard
     icon="✅"
     title="Pronto!"
     orders={[]}
    />
  </Container>
 )
}
