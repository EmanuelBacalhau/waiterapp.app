import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  selectedTable: string;
  onCancelOrder: () => void;
};

export const Header = ({ selectedTable, onCancelOrder }: Props) => {
  return (
    <View className="mt-6 mx-6">
      {!selectedTable && (
        <>
          <Text className="font-general-regular text-sm text-gray-600/80">
            Bem-vindo(a) ao
          </Text>
          <Text className="text-2xl font-general-bold text-gray-700">
            WAITER
            <Text className="font-general-regular">APP</Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <>
          <View className="flex-row justify-between items-center">
            <Text className="font-general-bold text-3xl">Pedido</Text>

            <TouchableOpacity activeOpacity={0.5} onPress={onCancelOrder}>
              <Text className="text-red-600 text-lg font-general-semibold">
                cancelar pedido
              </Text>
            </TouchableOpacity>
          </View>

          <View className="border border-black/30 rounded-lg p-4 mt-6 font-general-regular bg-white">
            <Text className="text-lg">Mesa {selectedTable}</Text>
          </View>
        </>
      )}
    </View>
  );
};
