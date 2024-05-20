import { useState } from 'react'
import { Button } from '../components/Button'
import { Cart } from '../components/Cart'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'
import { products } from '../mocks/products'
import { CartItem } from '../types/CartItem'
import {
  CategoriesContainer,
  Container,
  Footer,
  FooterConatiner,
  MenuContainer
} from "./styles"

export function Main(){
 const [isTableModalVisible, setIsTableModalVisible] = useState(false);
 const [selectedTable, setSelectedTable] = useState('');
 const [cartItems, setCartItems] = useState<CartItem[]>([
  {
    quantity: 1,
    product: products[0],
  },
  {
    quantity: 2,
    product: products[1],
  }
 ]);

 function handleSaveTable(table: string){
  setSelectedTable(table);
  setIsTableModalVisible(false);
 }

function handleCancelOrder(){
  setSelectedTable('');
}

  return (
    <>
    <Container>
      <Header
      selectedTable={selectedTable}
      onCancelOrder={handleCancelOrder}
      />

      <CategoriesContainer>
          <Categories/>
      </CategoriesContainer>

      <MenuContainer>
        <Menu/>
      </MenuContainer>

    </Container>

      <Footer>
        <FooterConatiner>
         {!selectedTable && (
             <Button onPress={() => setIsTableModalVisible(true)}>
             Novo Pedido
             </Button>
         )}

         {selectedTable && (
          <Cart cartItems={cartItems}/>
         )}
        </FooterConatiner>
      </Footer>

      <TableModal
      visible={isTableModalVisible}
      onClose={() => {setIsTableModalVisible(false)}}
      onSave={handleSaveTable}
      />

    </>
  )
}
