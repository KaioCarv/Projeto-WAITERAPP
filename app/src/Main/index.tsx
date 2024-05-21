import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Button } from '../components/Button'
import { Cart } from '../components/Cart'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Empty } from '../components/Icons/Empty'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'
import { Text } from '../components/Text'
import { products as mockProducts } from '../mocks/products'
import { CartItem } from '../types/CartItem'
import { Product } from '../types/Product'
import {
  CategoriesContainer,
  CenteredContainer,
  Container,
  Footer,
  FooterConatiner,
  MenuContainer,
} from "./styles"

export function Main(){
 const [isTableModalVisible, setIsTableModalVisible] = useState(false);
 const [selectedTable, setSelectedTable] = useState('');
 const [cartItems, setCartItems] = useState<CartItem[]>([]);
 const [isLoading] = useState(false);
 const [products] = useState<Product[]>(mockProducts);

 function handleSaveTable(table: string){
  setSelectedTable(table);
  setIsTableModalVisible(false);
 }

function handleResetOrder(){
  setSelectedTable('');
  setCartItems([]);
}


function handleAddTocart(product: Product){
  if(!selectedTable){
    setIsTableModalVisible(true)
  }
    setCartItems((prevState) => {
       const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
       );

if(itemIndex < 0){
  return prevState.concat({
    quantity: 1,
    product,
    });
   }

   const newCartItems = [...prevState];
   const item = newCartItems[itemIndex]
   newCartItems[itemIndex] ={
    ...item,
    quantity: item.quantity + 1,
  };
  return newCartItems;
 });
}

function handleDecrementCartItem(product: Product){
  setCartItems((prevState) => {
    const itemIndex = prevState.findIndex(
     cartItem => cartItem.product._id === product._id
    );
const item = prevState[itemIndex];
const newCartItems= [...prevState];

if(item.quantity === 1){
  newCartItems.splice(itemIndex, 1);

  return newCartItems;
}
   newCartItems[itemIndex] = {
    ...item,
    quantity: item.quantity - 1,
  };
  return newCartItems;

});
}

  return (
    <>
    <Container>
      <Header
      selectedTable={selectedTable}
      onCancelOrder={handleResetOrder}
      />
      {isLoading && (
        <CenteredContainer>
         <ActivityIndicator color="#D73035" size="large" />
        </CenteredContainer>
      )}

     {!isLoading && (
      <>

      <CategoriesContainer>
          <Categories/>
      </CategoriesContainer>

       {products.length > 0 ?(
         <MenuContainer>
          <Menu
          onAddToCart={handleAddTocart}
          products={products}
          />
       </MenuContainer>
       ) : (
        <CenteredContainer>
          <Empty />

          <Text color="#666" style={{marginTop: 24}}>
            Nenhum produto foi encontardo
          </Text>
        </CenteredContainer>
       )}
      </>
     )}

    </Container>

      <Footer>
        <FooterConatiner>
         {!selectedTable && (
             <Button
             onPress={() => setIsTableModalVisible(true)}
             disabled={isLoading}
             >
             Novo Pedido
             </Button>
         )}

         {selectedTable && (
          <Cart
          cartItems={cartItems}
          onAdd={handleAddTocart}
          onDecrement={handleDecrementCartItem}
          onConfirmOrder={handleResetOrder}
          />
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
