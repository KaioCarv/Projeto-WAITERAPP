import { Button } from '../components/Button'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import {
  CategoriesContainer,
  Container,
  Footer,
  FooterConatiner,
  MenuContainer
} from "./styles"

export function Main(){
  return (
    <>
    <Container>
      <Header/>

      <CategoriesContainer>
          <Categories/>
      </CategoriesContainer>

      <MenuContainer>
        <Menu/>
      </MenuContainer>

    </Container>

      <Footer>
        <FooterConatiner>
          <Button onPress={() => alert('Novo Pedido')}>
            Novo Pedido
          </Button>
        </FooterConatiner>
      </Footer>
    </>
  )
}
