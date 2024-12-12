import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useOrder } from '../../context/order-context';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/format-currency';
import { Button } from '../button';
import { MinusCircle } from '../icons/minus-circle';
import { PlusCircle } from '../icons/plus-circle';
import { OrderConfirmedModal } from '../order-confirmed-modal';

export const Cart = () => {
  const {
    itens,
    handleIncrementItem,
    handleDecrementItem,
    clearItens,
    clearTable,
    table,
  } = useOrder();
  const [isOrderModalVisible, setIsOrderModalVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const total = itens.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleConfirmOrder = async () => {
    setIsLoading(true);

    const payload = {
      table,
      products: itens.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
    };

    await api.post('/orders', payload);

    setIsLoading(false);
    setIsOrderModalVisible(true);
  };

  const handleOk = () => {
    setIsOrderModalVisible(false);
    clearItens();
    clearTable();
  };

  return (
    <>
      <View>
        <FlatList
          data={itens}
          className="max-h-32"
          keyExtractor={item => item.product._id}
          ItemSeparatorComponent={() => <View className="h-2" />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: cartItem }) => (
            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-2">
                <Image
                  className="rounded-lg"
                  width={50}
                  height={40}
                  source={{
                    uri: `/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <Text
                  className="font-general-semibold text-gray-600/80"
                  numberOfLines={1}
                >
                  {cartItem.quantity}x
                </Text>

                <View>
                  <Text className="font-general-bold">
                    {cartItem.product.name}
                  </Text>
                  <Text>{formatCurrency(cartItem.product.price)}</Text>
                </View>
              </View>

              <View className="flex-row gap-4">
                <TouchableOpacity onPress={() => handleIncrementItem(cartItem)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDecrementItem(cartItem)}>
                  <MinusCircle />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <View className="mt-4 flex-row justify-between items-center">
          <View>
            {itens.length === 0 && (
              <View>
                <Text className="font-general-regular text-gray-600/50 text-xl">
                  Seu carrinho
                </Text>
                <Text className="font-general-regular text-gray-600/50 text-xl">
                  está vazio
                </Text>
              </View>
            )}

            {itens.length > 0 && (
              <>
                <Text className="font-general-regular text-2xl">Total</Text>
                <Text className="font-general-bold text-3xl">
                  {formatCurrency(total)}
                </Text>
              </>
            )}
          </View>

          <Button
            onPress={handleConfirmOrder}
            disabled={itens.length === 0}
            loading={isLoading}
          >
            Confirmar pedido
          </Button>
        </View>
      </View>

      <OrderConfirmedModal visible={isOrderModalVisible} onOk={handleOk} />
    </>
  );
};
