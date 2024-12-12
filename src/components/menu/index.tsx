import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useOrder } from '../../context/order-context';
import type { Product } from '../../types/product';
import { baseURL } from '../../utils/api';
import { formatCurrency } from '../../utils/format-currency';
import { PlusCircle } from '../icons/plus-circle';
import { ProductModal } from '../product-modal';

type Props = {
  isSelectedTable: boolean;
  products: Product[];
};

export const Menu = ({ isSelectedTable, products }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { handleIncrementItem } = useOrder();

  const handleOpenModal = (product: Product) => {
    setIsModalVisible(true);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View className="h-px bg-gray-600/50 my-4" />
        )}
        keyExtractor={item => item._id}
        renderItem={({ item: product }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row gap-3 items-center"
              onPress={() => handleOpenModal(product)}
            >
              <Image
                className="rounded-xl"
                width={120}
                height={96}
                source={{
                  uri: `${baseURL}/uploads/${product.imagePath}`,
                }}
              />

              <View className="flex-1">
                <Text className="font-bold text-xl">{product.name}</Text>
                <Text
                  className="font-general-regular text-base mt-2 text-gray-600/80"
                  numberOfLines={2}
                >
                  {product.description}
                </Text>
                <Text className="font-general-semibold text-base mt-2">
                  {formatCurrency(product.price)}
                </Text>
              </View>

              <TouchableOpacity
                className="absolute bottom-1 right-1"
                disabled={!isSelectedTable}
                onPress={() =>
                  handleIncrementItem({
                    product,
                    quantity: 1,
                  })
                }
              >
                <PlusCircle />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />

      <ProductModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        product={selectedProduct}
        isSelectedTable={isSelectedTable}
      />
    </>
  );
};
