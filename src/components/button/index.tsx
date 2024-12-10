import { Text, TouchableOpacity } from 'react-native';

type Props = {
  children: string;
  onPress: () => void;
  disabled?: boolean;
};

export const Button = ({ children, onPress, disabled }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`px-6 py-4 rounded-full ${disabled ? 'bg-gray-300' : 'bg-red-600'}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="font-general-semibold text-white text-center">
        {children}
      </Text>
    </TouchableOpacity>
  );
};
