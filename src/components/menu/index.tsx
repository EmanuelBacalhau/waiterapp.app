import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/format-currency';
import { PlusCircle } from '../icons/plus-circle';

export const Menu = () => {
  return (
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
          >
            <Image
              className="rounded-xl"
              width={120}
              height={96}
              source={{
                uri: `http://192.168.3.20:3001/uploads/${product.imagePath}`,
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

            <TouchableOpacity className="absolute bottom-1 right-1">
              <PlusCircle />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }}
    />
  );
};
