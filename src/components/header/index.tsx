import { Text, View } from 'react-native';

export const Header = () => {
  return (
    <View className="mt-6 mx-6">
      <Text className="font-general-regular text-sm text-gray-600/80">
        Bem-vindo(a) ao
      </Text>
      <Text className="text-2xl font-general-bold text-gray-700">
        WAITER
        <Text className="font-general-regular">APP</Text>
      </Text>
    </View>
  );
};
