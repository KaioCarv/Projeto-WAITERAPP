import { FlatList } from "react-native";

import { products } from "../../mocks/products";
import { Text } from "../Text";

import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { AddToCardButton, Product, ProductDetails, ProductImage, Separator } from './styles';

export function Menu(){
  return (
    <FlatList
    data={products}
    style={{ marginTop: 32 }}
    contentContainerStyle={{paddingHorizontal: 24}}
     keyExtractor={product => product._id}
     ItemSeparatorComponent={Separator}
     renderItem={({item : product }) => (
      <Product>
        <ProductImage
        source={{
          uri: `http://192.168.1.3:3001/uploads/${product.imagePath}`
        }}
        />

        <ProductDetails>
          <Text weight="600">{product.name}</Text>
          <Text size={14} color="#666" style={{marginVertical: 8}}>
            {product.description}
          </Text>
          <Text weight="600" size={14}>{formatCurrency(product.price)}</Text>
        </ProductDetails>

          <AddToCardButton>
          <PlusCircle/>
        </AddToCardButton>
      </Product>
     )}
    />
  )
}


