import {
  FlatList,
  ImageBackground,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useOrder } from '../../context/order-context';
import type { Product } from '../../types/product';
import { baseURL } from '../../utils/api';
import { formatCurrency } from '../../utils/format-currency';
import { Button } from '../button';
import { Close } from '../icons/close';

type Props = {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
  isSelectedTable: boolean;
};

export const ProductModal = ({
  visible,
  onClose,
  product,
  isSelectedTable,
}: Props) => {
  const { handleIncrementItem } = useOrder();

  if (!product) {
    return null;
  }

  const onIncrementItem = (product: Product) => {
    handleIncrementItem({
      product,
      quantity: 1,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ImageBackground
        className="h-56 items-end p-2"
        source={{
          uri: `${baseURL}/uploads/${product.imagePath}`,
        }}
      >
        <TouchableOpacity
          className="bg-gray-950 w-8 h-8 items-center justify-center rounded-full"
          onPress={onClose}
        >
          <Close />
        </TouchableOpacity>
      </ImageBackground>

      <View className="p-6 flex-1 bg-gray-50">
        <Text className="font-general-bold text-3xl">{product.name}</Text>
        <Text className="font-general-regular text-base mt-2 text-gray-600/80">
          {product.description}
        </Text>

        {product.ingredients.length > 0 && (
          <>
            <Text className="font-general-semibold text-xl mt-6">
              Ingredientes
            </Text>

            <FlatList
              className="mt-4 flex-1"
              data={product.ingredients}
              keyExtractor={item => item._id}
              ItemSeparatorComponent={() => <View className="h-2" />}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: ingredient }) => {
                return (
                  <View className="flex-row border border-black/50 p-4 rounded-lg gap-3">
                    <Text>{ingredient.icon}</Text>
                    <Text className="font-general-regular">
                      {ingredient.name}
                    </Text>
                  </View>
                );
              }}
            />
          </>
        )}
      </View>

      <View className="min-h-28  p-4">
        <SafeAreaView className="flex-row gap-3 items-center justify-between">
          <View>
            <Text className="text-2xl font-general-regular">Preço</Text>
            <Text className="text-3xl font-general-semibold">
              {formatCurrency(product.price)}
            </Text>
          </View>

          <Button
            disabled={!isSelectedTable}
            onPress={() => onIncrementItem(product)}
          >
            Adicionar ao carrinho
          </Button>
        </SafeAreaView>
      </View>
    </Modal>
  );
};
